from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class EvaluationQuestionCreate(BaseModel):

    experiment_id: UUID

    question: str

    ground_truth: str


class EvaluationQuestionUpdate(BaseModel):

    question: str

    ground_truth: str


class EvaluationQuestionResponse(BaseModel):

    id: UUID

    experiment_id: UUID

    question: str

    ground_truth: str

    created_at: datetime

    class Config:
        from_attributes = True