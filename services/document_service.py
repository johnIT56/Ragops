import os
import tempfile

from sqlalchemy.orm import Session

from repositories.document_repository import DocumentRepository
from repositories.chunk_repository import ChunkRepository

from services.chunk_service import ChunkService
from services.embedding_service import EmbeddingService

from utils.pdf_loader import load_pdf


class DocumentService:

    def __init__(
        self,
        document_repo: DocumentRepository | None = None,
        chunk_repo: ChunkRepository | None = None,
        embedding_service: EmbeddingService | None = None,
    ):
        self.document_repo = document_repo or DocumentRepository()
        self.chunk_repo = chunk_repo or ChunkRepository()
        self.embedding_service = embedding_service or EmbeddingService()

    def ingest_pdf(self, db: Session, file):

        temp_path = self._save_temp_file(file)

        try:
            text = load_pdf(temp_path)

            chunks = ChunkService.split(text)

            embeddings = self.embedding_service.embed(chunks)

            document = self.document_repo.create(
                db=db,
                filename=file.filename,
                file_type="pdf",
            )

            self.chunk_repo.create_many(
                db=db,
                document_id=document.id,
                chunks=chunks,
                embeddings=embeddings,
            )

            return document

        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)

    @staticmethod
    def _save_temp_file(file) -> str:
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf",
        ) as temp_file:
            temp_file.write(file.file.read())
            return temp_file.name