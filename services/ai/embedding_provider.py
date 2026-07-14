from langchain_openai import OpenAIEmbeddings

from core.config import settings


class EmbeddingProvider:

    def __init__(
        self,
        model: str | None = None,
    ):

        self.embedding = OpenAIEmbeddings(
            api_key=settings.OPENAI_API_KEY,
            model=model or settings.OPENAI_EMBEDDING_MODEL,
        )

    def get(self) -> OpenAIEmbeddings:

        return self.embedding