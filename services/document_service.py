import tempfile

from sqlalchemy.orm import Session

from models.document import Document
from models.chunk import Chunk

from services.chunk_service import ChunkService
from services.embedding_service import EmbeddingService

from utils.pdf_loader import load_pdf


class DocumentService:

    def __init__(self):
        self.embedding_service = EmbeddingService()

    def ingest_pdf(self, db: Session, file):

        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp_file:
            temp_file.write(file.file.read())
            temp_path = temp_file.name

        # Extract text
        text = load_pdf(temp_path)

        # Save document metadata
        document = Document(
            filename=file.filename,
            file_type="pdf"
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        # Split into chunks
        chunks = ChunkService.split(text)

        # Generate embeddings
        vectors = self.embedding_service.embed(chunks)

        # Save chunks
        for idx, (chunk_text, vector) in enumerate(zip(chunks, vectors)):
            chunk = Chunk(
                document_id=document.id,
                chunk_index=idx,
                content=chunk_text,
                embedding=vector
            )
            db.add(chunk)

        db.commit()

        return document