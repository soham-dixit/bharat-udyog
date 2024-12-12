from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import PyPDF2
from typing import List, Dict
from dotenv import load_dotenv
import os
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
import asyncio
import httpx

# Load environment variables from .env file
load_dotenv()
app = FastAPI()

class ForecastRequest(BaseModel):
    target_month: int
    seller_id: str

def forecast_inventory(data_path: str, target_month: int, buffer_percentage: float = 0.2) -> Dict[str, int]:
    """
    Forecast inventory needs using machine learning
    """
    # Load and preprocess data
    sales_data = pd.read_csv("./675876ada06c3d098e4a4aa0.csv")

    sales_data.rename(
        {
            'year': 'Year',
            'month': 'Month',
            'productName': 'Product Name',
            'YEAR': 'Year',
            'MONTH': 'Month',
            'ITEM TYPE': 'Product Name'
        }, inplace=True, axis=1
    )
    
    # Validate input month
    if target_month < 1 or target_month > 12:
        raise ValueError("Target month must be between 1 and 12")
    
    # Aggregate sales by Year, Month, and Product Name
    monthly_sales = sales_data.groupby(['Year', 'Month', 'Product Name']).size().reset_index(name='Sales')
    
    recommendations = {}
    
    # Forecast for each product
    for product in monthly_sales['Product Name'].unique():
        # Filter data for the specific product
        product_data = monthly_sales[monthly_sales['Product Name'] == product].sort_values(['Year', 'Month'])
        
        # Create time series of sales
        sales_series = product_data['Sales'].values
        
        # Normalize the data
        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_sales = scaler.fit_transform(sales_series.reshape(-1, 1))
        
        # Prepare sequences for LSTM
        def create_sequences(data, seq_length=3):
            X, y = [], []
            for i in range(len(data) - seq_length):
                X.append(data[i:(i + seq_length)])
                y.append(data[i + seq_length])
            return np.array(X), np.array(y)
        
        # Create sequences
        X, y = create_sequences(scaled_sales, seq_length=2)
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Build LSTM model
        model = Sequential([
            LSTM(50, activation='relu', input_shape=(X_train.shape[1], 1), return_sequences=True),
            Dropout(0.2),
            LSTM(50, activation='relu'),
            Dropout(0.2),
            Dense(25, activation='relu'),
            Dense(1)
        ])
        
        # Compile the model
        model.compile(optimizer=Adam(learning_rate=0.001), loss='mean_squared_error')
        
        # Train the model
        model.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.2, verbose=0)
        
        # Prepare input sequence for prediction
        recent_sales = product_data['Sales'].values[-3:]
        scaled_recent_sales = scaler.transform(recent_sales.reshape(-1, 1))
        input_seq = scaled_recent_sales.reshape((1, 3, 1))
        
        # Predict next month's sales
        predicted_scaled = model.predict(input_seq)
        predicted_sales = scaler.inverse_transform(predicted_scaled)[0][0]
        
        # Add buffer and round up
        recommended_stock = max(1, int(np.ceil(predicted_sales * (1 + buffer_percentage))))
        
        recommendations[product] = recommended_stock
    
    return recommendations

@app.post("/forecast")
async def demand_forecast(request: ForecastRequest):
    """
    Endpoint for demand forecasting based on seller ID and target month
    """
    # Validate target month
    if request.target_month < 1 or request.target_month > 12:
        raise HTTPException(status_code=400, detail="Target month must be between 1 and 12")

    # Check if CSV exists
    input_file = f"{request.seller_id}.csv"
    if not os.path.exists(input_file):
        raise HTTPException(status_code=404, detail=f"No sales data found for seller {request.seller_id}")

    try:
        # Forecast inventory
        recommendations = forecast_inventory(
            data_path=input_file, 
            target_month=request.target_month
        )
        
        # Asynchronously fetch upcoming festivals
        async with httpx.AsyncClient() as client:
            try:
                festivals_response = await client.get("http://localhost:8000/api/v4/utils/getUpcomingFestivals")
                festivals_data = festivals_response.json()
                
                # You can modify the recommendations here if needed based on festivals
                # For example, you might want to add festival information to the response
                recommendations['upcoming_festivals'] = festivals_data

                # hit all products api in nodejs
                products_response = await client.get("http://localhost:8000/api/v4/details/getAllProducts")


                        
            except httpx.RequestError as e:
                # Log the error but don't block the main forecast response
                print(f"Error fetching festivals: {e}")
                recommendations['upcoming_festivals'] = []
        
        return recommendations
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class ProductExportValidator:
    def __init__(self, api_key: str, pdf_paths: List[str]):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")
        
        self.guidelines = self._extract_multiple_pdfs_text(pdf_paths)

    def _extract_pdf_text(self, pdf_path: str) -> str:
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                full_text = []
                for page in pdf_reader.pages:
                    full_text.append(page.extract_text())
                return " ".join(full_text)
        except Exception as e:
            raise ValueError(f"Error reading PDF '{pdf_path}': {str(e)}")

    def _extract_multiple_pdfs_text(self, pdf_paths: List[str]) -> str:
        combined_text = []
        for pdf_path in pdf_paths:
            combined_text.append(self._extract_pdf_text(pdf_path))
        return " ".join(combined_text)

    def validate_product(self, product_details: Dict[str, str]) -> (bool, str):
        prompt = f"""
        Carefully analyze these export/import guidelines:
        {self.guidelines}

        Evaluate this product for export eligibility:
        {product_details}

        Provide a clear yes/no response about whether this product can be exported.
        Include specific reasons from the guidelines supporting your decision.
        If not exportable, explain exactly which guideline prevents export.
        """
        
        # save prompt to a text file
        with open('prompt.txt', 'w') as file:
            file.write(prompt)
        try:
            response = self.model.generate_content(prompt)
            validation_text = response.text.lower()
            
            if 'yes' in validation_text:
                return True, validation_text
            else:
                return False, validation_text
        except Exception as e:
            return False, f"Validation error: {str(e)}"

# FastAPI app initialization


class Product(BaseModel):
    name: str
    category: str
    description: str

class ValidationResponse(BaseModel):
    is_exportable: bool
    explanation: str

@app.post("/validate-product", response_model=ValidationResponse)
async def validate_product(product: Product):
    API_KEY = os.getenv("GEMINI_API_KEY")
    PDF_PATHS = [
        './PDFs/Definitions_of_9_Classes_of_Dangerous_Goods.pdf',
        './PDFs/General_Information.pdf',
        './PDFs/List_of_Harmonized_System_Codes.pdf',
        './PDFs/List_of_Narcotic_Drugs.pdf',
        './PDFs/List_of_Psychotropic_Substances.pdf',
    ]
    print("Product: ", product)
    try:
        validator = ProductExportValidator(API_KEY, PDF_PATHS)
        product_details = product.dict()  # Convert Product object to dictionary
        
        is_exportable, explanation = validator.validate_product(product_details)
        
        return ValidationResponse(is_exportable=is_exportable, explanation=explanation)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in product validation: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Bharat Udyog FastAPI server"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 7000)))