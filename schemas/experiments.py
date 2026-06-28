from pydantic import BaseModel


class ExperimentCreate(BaseModel):

    name: str

    embedding_model: str = "text-embedding-3-small"

    chunk_size: int = 500

    chunk_overlap: int = 100

    top_k: int = 5

    llm_model: str = "gpt-4.1-mini"