from uuid import UUID

from pydantic import BaseModel


class QuestionResultResponse(BaseModel):

    id: UUID

    run_id: UUID

    question: str

    answer: str

    contexts: str

    latency: float

    faithfulness: float

    answer_relevancy: float

    context_precision: float

    context_recall: float

    model_config = {
        "from_attributes": True
    }