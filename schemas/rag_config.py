from pydantic import BaseModel


class RagConfig(BaseModel):

    embedding_model: str = "text-embedding-3-small"

    llm_model: str = "gpt-4.1-mini"

    chunk_size: int = 500

    chunk_overlap: int = 100

    top_k: int = 5