from enum import Enum

from pydantic import BaseModel, Field


class EmbeddingModel(str, Enum):
    TEXT_EMBEDDING_3_SMALL = "text-embedding-3-small"
    TEXT_EMBEDDING_3_LARGE = "text-embedding-3-large"


class LLMModel(str, Enum):
    GPT41_MINI = "gpt-4.1-mini"
    GPT41 = "gpt-4.1"
    GPT4O_MINI = "gpt-4o-mini"


class ExperimentConfig(BaseModel):

    embedding_model: EmbeddingModel = (
        EmbeddingModel.TEXT_EMBEDDING_3_SMALL
    )

    llm_model: LLMModel = (
        LLMModel.GPT41_MINI
    )

    chunk_size: int = Field(
        default=500,
        ge=100,
        le=2000,
    )

    chunk_overlap: int = Field(
        default=100,
        ge=0,
        le=500,
    )

    top_k: int = Field(
        default=5,
        ge=1,
        le=20,
    )