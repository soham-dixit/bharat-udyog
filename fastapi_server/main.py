from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import PyPDF2
from typing import List, Dict
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

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

@app.get("/")
async def root():
    return {"message": "Bharat Udyog FastAPI server"}