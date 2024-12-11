from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import PyPDF2
from typing import List, Dict, Any
from dotenv import load_dotenv
import os
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import logging

# Load environment variables from .env file
load_dotenv()

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
app = FastAPI()

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

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 7000)))