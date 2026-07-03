from langchain_openai import OpenAIEmbeddings

from core.config import settings


class EmbeddingService:

    def __init__(
        self,
        model: str | None = None,
    ):

        self.embeddings = OpenAIEmbeddings(
            model=model or settings.OPENAI_EMBEDDING_MODEL,
            api_key=settings.OPENAI_API_KEY,
        )

    def embed_documents(
        self,
        texts: list[str],
    ) -> list[list[float]]:
        return self.embeddings.embed_documents(texts)

    def embed_query(
        self,
        question: str,
    ) -> list[float]:
        return self.embeddings.embed_query(question)