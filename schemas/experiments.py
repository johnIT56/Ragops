from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

from schemas.experiment_config import ExperimentConfig

class ExperimentCreate(BaseModel):

    name: str

    config: ExperimentConfig

class ExperimentResponse(BaseModel):
    id: UUID
    name: str
    config: dict
    created_at: datetime

    class Config:
        from_attributes = True