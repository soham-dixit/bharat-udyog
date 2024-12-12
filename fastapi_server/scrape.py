from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup

app = FastAPI()

mongo_client = MongoClient("mongodb://localhost:27017/")
db = mongo_client["bharatudyog"]
docs_collection = db["docs"]

class ExporterLocationRequest(BaseModel):
    exporter_location: str

@app.post("/process-documents/")
async def process_documents(data: ExporterLocationRequest):
    exporter_location = data.exporter_location

    docs = list(docs_collection.find())

    if not docs:
        raise HTTPException(status_code=404, detail="No documents found in the collection")

    for doc in docs:
        for document in doc.get("documents", []):
            document_name = document.get("documentName")
            if not document_name:
                continue

            search_query = f"{document_name} {exporter_location}"
            search_url = f"https://www.google.com/search?q={search_query.replace(' ', '+')}"
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
            }
            response = requests.get(search_url, headers=headers)

            if response.status_code != 200:
                continue

            soup = BeautifulSoup(response.text, "html.parser")

            address, contact = None, None
            snippets = soup.find_all("span", class_="BNeawe tAd8D AP7Wnd")
            for snippet in snippets:
                text = snippet.get_text()
                if not address and ("Street" in text or "Road" in text or any(keyword in text for keyword in ["City", "Avenue", "Lane"])):
                    address = text
                elif not contact and ("+" in text or text.isdigit()):
                    contact = text

            docs_collection.update_one(
                {"_id": doc["_id"], "documents.documentName": document_name},
                {"$set": {
                    "documents.$.address": address,
                    "documents.$.contact": contact
                }}
            )

    return {"status": "success", "message": "Documents processed and updated successfully."}
