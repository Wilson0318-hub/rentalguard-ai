from fastapi import APIRouter, UploadFile, File, Form
from app.services.gemini_ocr_service import extract_text_from_file
from app.services.clause_service import split_clauses
from app.services.gemini_analysis_service import analyze_contract_clauses

router = APIRouter()

@router.post("/analyze")
async def analyze_contract(
    file: UploadFile = File(...),
    language: str = Form("zh-TW")
):
    file_bytes = await file.read()

    ocr_text = extract_text_from_file(file_bytes, file.filename)

    clauses = split_clauses(ocr_text)

    results = analyze_contract_clauses(clauses, language)

    return {
        "ocr_text": ocr_text,
        "clauses": clauses,
        "results": results
    }