from langchain_openai import OpenAIEmbeddings

from core.config import settings


class EmbeddingService:

    def __init__(
        self,
        model: str = "text-embedding-3-small",
    ):

        self.embeddings = OpenAIEmbeddings(
            model=model,
            api_key=settings.OPENAI_API_KEY,
        )

    def embed_documents(
        self,
        texts: list[str],
    ):
        return self.embeddings.embed_documents(texts)

    def embed_query(
        self,
        question: str,
    ):
        return self.embeddings.embed_query(question)