from pydantic import BaseModel


class EvaluationInput(BaseModel):

    question: str

    answer: str

    ground_truth: str

    contexts: list[str]

    latency: float