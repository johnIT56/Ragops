from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class ExperimentRunResponse(BaseModel):

    id: UUID

    experiment_id: UUID

    avg_latency: float

    avg_answer_relevancy: float

    avg_faithfulness: float

    avg_context_precision: float

    avg_context_recall: float

    created_at: datetime

    model_config = {
        "from_attributes": True
    }