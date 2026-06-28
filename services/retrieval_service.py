from typing import List

from openai import OpenAI
from sqlalchemy.orm import Session

from langchain_openai import OpenAIEmbeddings

from core.config import settings
from models.chunk import Chunk


class RetrievalService:
    def __init__(self):
        self.embedding_model = OpenAIEmbeddings(
            model="text-embedding-3-small",
            api_key=settings.OPENAI_API_KEY,
        )

        self.client = OpenAI(
            api_key=settings.OPENAI_API_KEY,
        )

    def embed_question(self, question: str) -> List[float]:
        return self.embedding_model.embed_query(question)

    def retrieve_chunks(
        self,
        db: Session,
        question: str,
        top_k: int = 5,
    ) -> List[str]:
        """
        Retrieve the top-k most similar chunks using pgvector.
        """

        embedding = self.embed_question(question)

        chunks = (
            db.query(Chunk)
            .order_by(Chunk.embedding.cosine_distance(embedding))
            .limit(top_k)
            .all()
        )

        return [chunk.content for chunk in chunks]

    def generate_answer(
        self,
        question: str,
        context_chunks: List[str],
    ) -> str:

        context = "\n\n".join(context_chunks)

        prompt = f"""
You are a helpful AI assistant.

Answer ONLY using the provided context.

If the answer cannot be found in the context,
say "I don't know."

Context:
{context}

Question:
{question}
"""

        response = self.client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        return response.choices[0].message.content

    def answer_question(
        self,
        db: Session,
        question: str,
        top_k: int = 5,
    ):

        chunks = self.retrieve_chunks(
            db=db,
            question=question,
            top_k=top_k,
        )

        answer = self.generate_answer(
            question=question,
            context_chunks=chunks,
        )

        return answer, chunks