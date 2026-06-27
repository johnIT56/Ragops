from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import File

from sqlalchemy.orm import Session

from core.dependencies import get_db

from services.document_service import (
    DocumentService
)

router = APIRouter(
    prefix="/documents",
    tags=["documents"]
)

@router.post("/upload")
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    service = DocumentService()

    document = service.ingest_pdf(
        db,
        file
    )

    return {
        "document_id": str(document.id),
        "filename": document.filename
    }

