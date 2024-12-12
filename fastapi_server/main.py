from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import PyPDF2
from typing import List, Dict, Tuple, Any
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
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import logging

from typing import Dict, Optional
from pydantic import BaseModel, Field
import json
import textwrap
from fastapi.middleware.cors import CORSMiddleware
origins = ["*"]

load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
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
                # recommendations['upcoming_festivals'] = festivals_data

                # hit all products api in nodejs
                products_response = await client.get("http://localhost:8000/api/v4/details/getAllProducts")
                products_data = products_response.json()
                
                upcoming_festivals = festivals_data["data"]
                all_products = products_data["data"]
                
                mapped_products = []
                upcoming_festivals = festivals_data.get("data", {})

                for product in products_data.get("data", []):
                    product_festivals = product.get("festivals", [])
                    mapped_festivals = []

                    for product_festival in product_festivals:
                        for month, festivals in upcoming_festivals.items():
                            for festival in festivals:
                                if product_festival.lower() == festival.get("name", "").lower():
                                    mapped_festivals.append({
                                        "festival_name": festival.get("name"),
                                        "month": month,
                                        "date": festival.get("date"),
                                        "day": festival.get("day")
                                    })

                    mapped_products.append({
                        "product_name": product.get("productName"),
                        "available_qty": product.get("availableQty"),
                        "mapped_festivals": mapped_festivals
                    })
                    
                return {
                        "success": True,
                        "message": "Forecast generated successfully",
                        "recommendations": recommendations,
                        "mapped_products": mapped_products
                }

                        
            except httpx.RequestError as e:
                # Log the error but don't block the main forecast response
                print(f"Error fetching festivals: {e}")
                recommendations['upcoming_festivals'] = []
        
        return recommendations
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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

    def validate_product(self, product_details: Dict[str, str]) -> Tuple[bool, str]:
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

class MongoRecommendationSystem:
    def __init__(self, mongo_uri: str, database_name: str):
        """
        Initialize MongoDB connection and recommendation system.
        """
        try:
            self.client = AsyncIOMotorClient(mongo_uri)
            self.db = self.client[database_name]
            
            # Collections
            self.orders_collection = self.db['orders']
            self.products_collection = self.db['products']
            
            # Recommendation system components
            self.recommendation_system = None
            
            logger.info(f"Connected to MongoDB database: {database_name}")
        except Exception as e:
            logger.error(f"MongoDB Connection Error: {e}")
            raise
    
    async def create_recommendation_system(self) -> Dict[str, Any]:
        """
        Asynchronously create a comprehensive hybrid recommendation system.
        """
        try:
            # Fetch products and orders asynchronously
            products_cursor = self.products_collection.find({})
            products = await products_cursor.to_list(length=None)
            logger.info(f"Fetched {len(products)} products")
            
            orders_cursor = self.orders_collection.find({})
            orders = await orders_cursor.to_list(length=None)
            logger.info(f"Fetched {len(orders)} orders")
            
            # Debugging: Print first few items
            logger.info("First product: %s", products[0] if products else "No products")
            logger.info("First order: %s", orders[0] if orders else "No orders")
            
            # Convert to pandas DataFrames
            products_df = pd.DataFrame(products)
            orders_df = pd.DataFrame(orders)

            # Print column names for debugging
            print("Products columns:", list(products_df.columns))
            print("Orders columns:", list(orders_df.columns))
            
            # Rename columns explicitly
            products_df['productId'] = products_df['_id'].astype(str)
            orders_df['productId'] = orders_df['productId'].astype(str)
            
            # Validate required columns
            required_product_columns = ['productId', 'description', 'rating']
            required_order_columns = ['email', 'productId', 'qty']
            
            for col in required_product_columns:
                if col not in products_df.columns:
                    logger.error(f"Missing column in products: {col}")
                    raise ValueError(f"Missing column in products: {col}")
            
            for col in required_order_columns:
                if col not in orders_df.columns:
                    logger.error(f"Missing column in orders: {col}")
                    raise ValueError(f"Missing column in orders: {col}")
            
            # Rename columns to match existing code
            # orders_df = orders_df.rename(columns={"email": "userId", "qty": "qty", "productId": "productId"})
            # products_df = products_df.rename(columns={"_id": "productId"})
            # Rename columns for matrix creation
            orders_df = orders_df.rename(columns={"email": "userId"})
            
            # Content-based filtering using TF-IDF on product descriptions
            tfidf = TfidfVectorizer(stop_words="english")
            products_df["description"] = products_df["description"].fillna("")
            tfidf_matrix = tfidf.fit_transform(products_df["description"])
            content_similarity = cosine_similarity(tfidf_matrix)
            
            # Collaborative filtering: User-Product Interaction Matrix
            user_product_matrix = orders_df.pivot_table(
                index='userId', 
                columns='productId', 
                values='qty', 
                fill_value=0
            )
            
            # Normalize user-product matrix by user purchase volume
            user_purchase_volume = user_product_matrix.sum(axis=1)
            normalized_matrix = user_product_matrix.div(user_purchase_volume, axis=0).fillna(0)
            
            # Collaborative similarity based on purchase patterns
            collaborative_similarity = cosine_similarity(normalized_matrix.T)
            
            # Product rating-based similarity
            rating_similarity = np.zeros((len(products_df), len(products_df)))
            
            for i in range(len(products_df)):
                for j in range(len(products_df)):
                    # Calculate rating similarity using absolute difference
                    rating_diff = 1 - abs(products_df.iloc[i]['rating'] - products_df.iloc[j]['rating']) / 5
                    rating_similarity[i, j] = rating_diff
            
            n_products = len(products_df)
    
            # Pad or truncate similarity matrices if needed
            if content_similarity.shape[0] != n_products:
                logger.warning(f"Adjusting content similarity matrix from {content_similarity.shape[0]} to {n_products}")
                content_similarity = np.pad(
                    content_similarity, 
                    ((0, max(0, n_products - content_similarity.shape[0])), 
                    (0, max(0, n_products - content_similarity.shape[1]))), 
                    mode='constant'
                )[:n_products, :n_products]
            
            # Do the same for other similarity matrices
            if collaborative_similarity.shape[0] != n_products:
                logger.warning(f"Adjusting collaborative similarity matrix from {collaborative_similarity.shape[0]} to {n_products}")
                collaborative_similarity = np.pad(
                    collaborative_similarity, 
                    ((0, max(0, n_products - collaborative_similarity.shape[0])), 
                    (0, max(0, n_products - collaborative_similarity.shape[1]))), 
                    mode='constant'
                )[:n_products, :n_products]
            
            if rating_similarity.shape[0] != n_products:
                logger.warning(f"Adjusting rating similarity matrix from {rating_similarity.shape[0]} to {n_products}")
                rating_similarity = np.pad(
                    rating_similarity, 
                    ((0, max(0, n_products - rating_similarity.shape[0])), 
                    (0, max(0, n_products - rating_similarity.shape[1]))), 
                    mode='constant'
                )[:n_products, :n_products]
            
            # Store recommendation system components
            self.recommendation_system = {
                "content_similarity": content_similarity,
                "collaborative_similarity": collaborative_similarity,
                "rating_similarity": rating_similarity,
                "normalized_matrix": normalized_matrix,
                "products": products_df,
                "user_product_matrix": user_product_matrix
            }
            
            return self.recommendation_system
        
        except Exception as e:
            logger.error(f"Error creating recommendation system: {e}")
            raise

    async def get_recommendations(
        self, 
        user_email: str, 
        top_n: int = 5,
        content_weight: float = 0.4,
        collaborative_weight: float = 0.3,
        rating_weight: float = 0.3
    ) -> pd.DataFrame:
        """
        Generate hybrid recommendations for a user.
        """
        try:
            # Ensure recommendation system is created
            if self.recommendation_system is None:
                await self.create_recommendation_system()
            
            products = self.recommendation_system["products"]
            user_product_matrix = self.recommendation_system["user_product_matrix"]
            
            # Check if user exists
            if user_email not in user_product_matrix.index:
                logger.warning(f"No purchase history found for user {user_email}")
                return pd.DataFrame()  # Return empty DataFrame instead of raising error
            
            # Get user's purchased products
            purchased_products = user_product_matrix.loc[user_email]
            purchased_product_ids = purchased_products[purchased_products > 0].index.tolist()
            
            # Retrieve similarity matrices
            content_similarity = self.recommendation_system["content_similarity"]
            collaborative_similarity = self.recommendation_system["collaborative_similarity"]
            rating_similarity = self.recommendation_system["rating_similarity"]
            
            # Debug print to verify matrix sizes
            print("Products shape:", len(products))
            print("Content similarity shape:", content_similarity.shape)
            print("Collaborative similarity shape:", collaborative_similarity.shape)
            print("Rating similarity shape:", rating_similarity.shape)
            
            # Initialize scores for all products
            scores = np.zeros(len(products))
            
            # Compute hybrid recommendation scores
            for i, product_row in products.iterrows():
                product = product_row['productId']
                
                if product in purchased_product_ids:
                    # Skip already purchased products by setting to negative infinity
                    scores[i] = float('-inf')
                    continue
                
                # Compute similarity scores safely
                content_scores = []
                collaborative_scores = []
                rating_scores = []
                
                for p in purchased_product_ids:
                    # Find index of the purchased product
                    purchased_index = products.index[products['productId'] == p].tolist()
                    
                    if purchased_index:
                        purchased_idx = purchased_index[0]
                        
                        # Safe similarity calculations
                        if purchased_idx < content_similarity.shape[0]:
                            content_scores.append(content_similarity[i, purchased_idx])
                        
                        if purchased_idx < collaborative_similarity.shape[0]:
                            collaborative_scores.append(collaborative_similarity[i, purchased_idx])
                        
                        if purchased_idx < rating_similarity.shape[0]:
                            rating_scores.append(rating_similarity[i, purchased_idx])
                
                # Average scores, handling empty lists
                content_score = np.mean(content_scores) if content_scores else 0
                collaborative_score = np.mean(collaborative_scores) if collaborative_scores else 0
                rating_score = np.mean(rating_scores) if rating_scores else 0
                
                # Compute weighted hybrid score
                scores[i] = (
                    content_weight * content_score + 
                    collaborative_weight * collaborative_score + 
                    rating_weight * rating_score
                )
            
            # Get top N recommendations
            top_indices = np.argsort(scores)[::-1][:top_n]
            
            # Return recommended products
            recommendations = products.iloc[top_indices].copy()
            recommendations['recommendation_score'] = scores[top_indices]
            
            return recommendations[['productId', 'productName', 'recommendation_score']]
        
        except Exception as e:
            logger.error(f"Error generating recommendations: {e}")
            import traceback
            traceback.print_exc()
            return pd.DataFrame()

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

@app.get("/getRecommendation/{user_email}")
async def get_recommendations(
    user_email: str, 
    top_n: int = 5, 
    content_weight: float = 0.4, 
    collaborative_weight: float = 0.3, 
    rating_weight: float = 0.3
):
    """
    Get personalized product recommendations for a user.
    
    Args:
        user_email (str): Email of the user to get recommendations for
        top_n (int, optional): Number of recommendations to return. Defaults to 5.
        content_weight (float, optional): Weight for content-based similarity. Defaults to 0.4.
        collaborative_weight (float, optional): Weight for collaborative filtering. Defaults to 0.3.
        rating_weight (float, optional): Weight for rating-based similarity. Defaults to 0.3.
    
    Returns:
        List of recommended product IDs
    """
    try:
        # MongoDB URI from environment variables
        MONGO_URI = "mongodb+srv://Au9GtSMe7YgXCQ5MQxnC297ViiIwAaGV1cdoFrUC4:qwertyuiop@cluster0.utqihw1.mongodb.net"
        DATABASE_NAME = "bharatudyog"
        
        # Initialize recommendation system
        recommendation_system = MongoRecommendationSystem(
            mongo_uri=MONGO_URI, 
            database_name=DATABASE_NAME
        )
        
        # Get recommendations
        recommendations = await recommendation_system.get_recommendations(
            user_email=user_email,
            top_n=top_n,
            content_weight=content_weight,
            collaborative_weight=collaborative_weight,
            rating_weight=rating_weight
        )
        
        # Filter out -inf scores and extract only product IDs
        if not recommendations.empty:
            # Filter out rows with -inf recommendation_score
            valid_recommendations = recommendations[recommendations['recommendation_score'] != float('-inf')]
            
            # Return only product IDs if there are valid recommendations
            if not valid_recommendations.empty:
                return valid_recommendations['productId'].tolist()
            else:
                raise HTTPException(
                    status_code=404, 
                    detail=f"No valid recommendations found for user {user_email}"
                )
        else:
            raise HTTPException(
                status_code=404, 
                detail=f"No recommendations found for user {user_email}"
            )
    
    except Exception as e:
        logger.error(f"Recommendation error for {user_email}: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Error generating recommendations: {str(e)}"
        )

@app.get("/")
async def root():
    return {"message": "Bharat Udyog FastAPI server"}

class ProductDetails(BaseModel):
    name: str = Field(..., description="Name of the product")
    manufacturer: str = Field(..., description="Manufacturer of the product")
    value: float = Field(..., description="Value of the product")
    quantity: int = Field(..., description="Quantity of the product")

class ExportDocumentAssistant:
    def __init__(self, gemini_api_key: str):
        genai.configure(api_key=gemini_api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.document_cache = {}
        
    def _extract_pdf_context(self, pdf_file=None, file_path=None) -> str:
        """
        Extract text from the PDF file or a file path and summarize it.
        """
        try:
            if file_path:
                with open(file_path, "rb") as f:
                    pdf_file = f
            
            if not pdf_file:
                raise ValueError("No PDF file or path provided.")
            
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            full_text = ""
            for page in pdf_reader.pages:
                full_text += page.extract_text() + "\n\n"
            
            return self._summarize_pdf_context(full_text)
        
        except Exception as e:
            print(f"Error extracting PDF: {e}")
            return ""


    def _summarize_pdf_context(self, full_text: str) -> str:
        if len(full_text) > 50000:  # Adjust based on model's context window
            summary_prompt = f"""
            Provide a concise, comprehensive summary of the following export guidelines PDF:
            
            {full_text[:50000]}  # Use first 50k chars to avoid overwhelming the model
            
            Focus on:
            1. Key export documentation principles
            2. General regulatory guidelines
            3. Common requirements across different product categories
            """
            
            try:
                summary_response = self.model.generate_content(summary_prompt)
                return summary_response.text
            except Exception as e:
                print(f"Error summarizing PDF: {e}")
                return full_text[:50000]  
        
        return full_text

    def validate_export_eligibility(self, product_category: str) -> Dict:
        eligibility_prompt = f"""
        Assess export eligibility for:
        Category: {product_category}
        
        Evaluate:
        1. Export restrictions
        2. Compliance requirements
        3. Potential challenges
        4. Recommended action steps
        
        Provide a comprehensive eligibility assessment.
        """
        
        try:
            response = self.model.generate_content(eligibility_prompt)
            return {
                "eligibility": True,
                "details": response.text
            }
        except Exception as e:
            return {
                "eligibility": False,
                "error": str(e)
            }
    
    def get_export_documents(self, product_category: str, pdf_context: str = "") -> Dict[str, any]:
        if product_category in self.document_cache:
            return self.document_cache[product_category]

        prompt = f"""
        Using the general export guidelines and the specific product category, provide detailed export documentation:

        General Export Guidelines Context:
        {pdf_context[:5000]}  # Limit context to avoid overwhelming the model

        Specific Product Category: {product_category}
        
        Detailed Requirements:
        1. Most critical export documentation for this category
        2. Specific government websites for document procurement
        3. Regulatory bodies responsible for export documentation
        4. Special permits or certificates needed
        5. Typical processing time for documentation
        6. Cross-reference with the general export guidelines
        
        Format the response as a structured JSON object with clear, actionable information.
        """

        try:
            response = self.model.generate_content(prompt)
            
            try:
                document_info = json.loads(response.text)
            except json.JSONDecodeError:
                document_info = self._parse_semi_structured_response(response.text)
            
            document_info = self._ensure_valid_json_structure(document_info)
            
            self.document_cache[product_category] = document_info
            
            return document_info

        except Exception as e:
            return {
                "error": f"Document retrieval failed: {str(e)}",
                "category": product_category
            }

    def _ensure_valid_json_structure(self, document_info: Dict[str, any]) -> Dict[str, any]:
        default_structure = {
            "documents": [],
            "regulatory_bodies": [],
            "special_requirements": [],
            "processing_time": "",
            "cross_reference_general_guidelines": ""
        }

        for key in default_structure:
            if key not in document_info or not isinstance(document_info[key], (list, str)):
                document_info[key] = default_structure[key]

        return document_info

    def _parse_semi_structured_response(self, text: str) -> Dict[str, any]:
        parsed_info = {
            "documents": [],
            "regulatory_bodies": [],
            "special_requirements": [],
            "processing_time": "",
            "cross_reference_general_guidelines": ""
        }
        
        lines = text.split('\n')
        current_section = None

        for line in lines:
            line = line.strip()
            if "Document" in line:
                current_section = "documents"
            elif "Regulatory" in line:
                current_section = "regulatory_bodies"
            elif "Special" in line:
                current_section = "special_requirements"
            elif "Processing Time" in line:
                current_section = "processing_time"
            elif "Cross Reference" in line:
                current_section = "cross_reference_general_guidelines"
            
            if current_section and line:
                if current_section in ["documents", "regulatory_bodies", "special_requirements"]:
                    parsed_info[current_section].append(line)
                else:
                    parsed_info[current_section] += line + " "

        return parsed_info

# Global assistant instance (you'll replace with your actual Gemini API key)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
export_assistant = ExportDocumentAssistant(GEMINI_API_KEY)

class CategoryRequest(BaseModel):
    product_category: str
    
@app.post("/generate")
async def check_export_eligibility(request: CategoryRequest):
    try:
        product_category = request.product_category

        # Process PDF context if uploaded or using hard-coded path
        pdf_context = export_assistant._extract_pdf_context(file_path='/home/abhinav/Downloads/HTE.pdf')

        # Validate export eligibility
        eligibility = export_assistant.validate_export_eligibility(
            product_category
        )

        # Get export documents
        export_docs = export_assistant.get_export_documents(
            product_category,
            pdf_context
        )

        return {
            "eligibility": eligibility,
            "export_documents": export_docs
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 7000)))