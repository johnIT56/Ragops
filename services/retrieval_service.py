from sqlalchemy.orm import Session

from repositories.chunk_repository import ChunkRepository
from services.embedding_service import EmbeddingService


class RetrievalService:

    def __init__(
        self,
        embedding_service: EmbeddingService,
        chunk_repository: ChunkRepository | None = None,
    ):
        self.embedding_service = embedding_service
        self.chunk_repository = chunk_repository or ChunkRepository()

    def retrieve(
        self,
        db: Session,
        question: str,
        top_k: int = 5,
    ) -> list[str]:
        """
        Retrieve the top-k most relevant chunks for a question.
        """

        embedding = self.embedding_service.embed_query(question)

        chunks = self.chunk_repository.find_similar(
            db=db,
            embedding=embedding,
            top_k=top_k,
        )

        return [chunk.content for chunk in chunks]