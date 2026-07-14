from schemas.evaluation import EvaluationInput

from services.evaluation.provider import (
    EvaluationProvider,
)

from services.evaluation.ragas_provider import (
    RagasProvider,
)


class EvaluationService:

    def __init__(self):

        self.provider: EvaluationProvider = (
            RagasProvider()
        )

    def evaluate(
        self,
        payload: EvaluationInput,
    ):

        return self.provider.evaluate(payload)