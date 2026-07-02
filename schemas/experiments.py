from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class ExperimentCreate(BaseModel):

    name: str

    embedding_model: str = "text-embedding-3-small"

    chunk_size: int = 500

    chunk_overlap: int = 100

    top_k: int = 5

    llm_model: str = "gpt-4.1-mini"

class ExperimentResponse(BaseModel):
    id: UUID
    name: str
    config: dict
    created_at: datetime

    class Config:
        from_attributes = True