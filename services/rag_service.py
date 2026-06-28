from sqlalchemy.orm import Session

from services.embedding_service import EmbeddingService
from services.generation_service import GenerationService
from services.retrieval_service import RetrievalService


class RagService:

    def __init__(self):

        embedding = EmbeddingService()

        self.retriever = RetrievalService(embedding)

        self.generator = GenerationService()

    def ask(
        self,
        db: Session,
        question: str,
        top_k: int = 5,
    ):

        chunks = self.retriever.retrieve_chunks(
            db=db,
            question=question,
            top_k=top_k,
        )

        context = "\n\n".join(chunks)

        answer = self.generator.generate(
            question,
            context,
        )

        return answer, chunks