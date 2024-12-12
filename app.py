import google.generativeai as genai
import requests
import json
from typing import List, Dict, Optional
import textwrap
import PyPDF2

class ExportDocumentAssistant:
    def __init__(self, gemini_api_key: str, pdf_path: str = None):
        genai.configure(api_key=gemini_api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.document_cache = {}
        
        self.pdf_context = self._extract_pdf_context(pdf_path) if pdf_path else ""

    def _extract_pdf_context(self, pdf_path: str) -> str:
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                
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

    def validate_export_eligibility(self, product_category: str, product_details: Dict) -> Dict:
        eligibility_prompt = f"""
        Assess export eligibility for:
        Category: {product_category}
        Product Details: {json.dumps(product_details)}
        
        Evaluate:
        1. Export restrictions
        2. Compliance requirements
        3. Potential challenges
        4. Recommended action steps
        
        Provide a comprehensive eligibility assessment.
        """
        
        try:
            response = self.model.generate_content(eligibility_prompt)
            print("Response 2: ", response.text)
            return {
                "eligibility": True,
                "details": response.text
            }
        except Exception as e:
            return {
                "eligibility": False,
                "error": str(e)
            }
    
    def format_export_documents(export_docs):
        formatted_docs = "Export Documents Information\n"
        formatted_docs += "=" * 30 + "\n\n"

        if isinstance(export_docs, dict):
            for key, value in export_docs.items():
                if key == 'error':
                    formatted_docs += f"Error: {value}\n"
                    continue

                formatted_docs += f"{key.replace('_', ' ').title()}:\n"
                
                if isinstance(value, list):
                    for item in value:
                        if isinstance(item, dict):
                            formatted_docs += textwrap.indent(json.dumps(item, indent=2), '  ') + "\n"
                        else:
                            formatted_docs += f"  - {item}\n"
                
                elif isinstance(value, str):
                    formatted_docs += textwrap.indent(value, '  ') + "\n"
                
                else:
                    formatted_docs += f"  {value}\n"

        return formatted_docs
    
    def format_export_eligibility(eligibility):
        formatted_eligibility = "Export Eligibility Assessment\n"
        formatted_eligibility += "=" * 30 + "\n\n"

        if isinstance(eligibility, dict):
            for key, value in eligibility.items():
                formatted_eligibility += f"{key.replace('_', ' ').title()}:\n"
                
                if isinstance(value, str):
                    formatted_eligibility += textwrap.indent(value, '  ') + "\n"
                else:
                    formatted_eligibility += f"  {value}\n"

        return formatted_eligibility

    def save_formatted_documents(self, export_docs, eligibility):
        formatted_docs = ExportDocumentAssistant.format_export_documents(export_docs)
        formatted_eligibility = ExportDocumentAssistant.format_export_eligibility(eligibility)

        with open('export_documents.txt', 'w', encoding='utf-8') as file:
            file.write(formatted_docs)

        with open('export_eligibility.txt', 'w', encoding='utf-8') as file:
            file.write(formatted_eligibility)

        print("Documents saved successfully:")
        print("1. export_documents.txt")
        print("2. export_eligibility.txt")
        
    def _parse_semi_structured_response(self, text: str) -> Dict[str, any]:
        parsed_info = {
            "documents": [],
            "regulatory_bodies": [],
            "special_requirements": []
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
            
            if current_section and line:
                parsed_info[current_section].append(line)
        
        return parsed_info

    def get_export_documents(self, product_category: str) -> Dict[str, any]:
        if product_category in self.document_cache:
            return self.document_cache[product_category]

        prompt = f"""
        Using the general export guidelines and the specific product category, provide detailed export documentation:

        General Export Guidelines Context:
        {self.pdf_context[:5000]}  # Limit context to avoid overwhelming the model

        Specific Product Category: {product_category}
        
        Detailed Requirements:
        1. Most critical export documentation for this category
        2. Specific government websites for document procurement
        3. Regulatory bodies responsible for export documentation
        4. Special permits or certificates needed
        5. Typical processing time for documentation
        6. Cross-reference with the general export guidelines
        
        Format the response as a structured JSON with clear, actionable information.
        """

        try:
            response = self.model.generate_content(prompt)
            print("Export Documents Response:", response.text)
            
            try:
                document_info = json.loads(response.text)
            except json.JSONDecodeError:
                document_info = self._parse_semi_structured_response(response.text)
            
            self.document_cache[product_category] = document_info
            
            return document_info

        except Exception as e:
            return {
                "error": f"Document retrieval failed: {str(e)}",
                "category": product_category
            }

def main():
    pdf_path = "/home/abhinav/Downloads/HTE.pdf"
    
    assistant = ExportDocumentAssistant(
        gemini_api_key="", 
        pdf_path=pdf_path
    )
    
    category = "Food Products"
    
    product_details = {
            "name": "Mango Pickle",
            "manufacturer": "Manoj manufactures",
            "value": 5000,
            "quantity": 100
    }
        
    export_docs = assistant.get_export_documents(category)
    eligibility = assistant.validate_export_eligibility(category, product_details)
        
    assistant.save_formatted_documents(export_docs, eligibility)

if __name__ == "__main__":
    main()