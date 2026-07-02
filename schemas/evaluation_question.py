from pydantic import BaseModel
from uuid import UUID


class EvaluationQuestionCreate(BaseModel):
    experiment_id: UUID
    question: str
    ground_truth: str

class EvaluationQuestionResponse(BaseModel):
    id: UUID
    experiment_id: UUID
    question: str
    ground_truth: str

    class Config:
        from_attributes = True