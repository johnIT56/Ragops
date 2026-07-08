from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import File

from sqlalchemy.orm import Session

from core.dependencies import get_db

from services.document_service import (
    DocumentService
)

from schemas.documents import DocumentResponse

from uuid import UUID

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

@router.get(
    "/",
    response_model=list[DocumentResponse],
)
def list_documents(
    db: Session = Depends(get_db),
):

    return service.list(db)

@router.delete("/{document_id}")
def delete_document(
    document_id: UUID,
    db: Session = Depends(get_db),
):

    service.delete(
        db=db,
        document_id=document_id,
    )

    return {
        "message": "Document deleted successfully."
    }

