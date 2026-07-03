from uuid import UUID

from pydantic import BaseModel


class RunMetrics(BaseModel):
    id: UUID
    avg_latency: float
    avg_answer_relevancy: float
    avg_faithfulness: float
    avg_context_precision: float
    avg_context_recall: float


class MetricDifference(BaseModel):
    latency: float
    answer_relevancy: float
    faithfulness: float
    context_precision: float
    context_recall: float


class RunComparisonResponse(BaseModel):
    run1: RunMetrics
    run2: RunMetrics
    difference: MetricDifference