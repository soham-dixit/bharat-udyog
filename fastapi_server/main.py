from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import PyPDF2
from typing import List, Dict, Tuple
from dotenv import load_dotenv
import os

from typing import Dict, Optional
from pydantic import BaseModel, Field
import json
import textwrap

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