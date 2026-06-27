from langchain_openai import OpenAIEmbeddings

from core.config import settings


class EmbeddingService:

    def __init__(self):

        self.embeddings = OpenAIEmbeddings(
            model="text-embedding-3-small",
            api_key=settings.OPENAI_API_KEY
        )

    def embed(self, texts: list[str]):

        return self.embeddings.embed_documents(texts)