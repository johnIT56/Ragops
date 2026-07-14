from abc import ABC
from abc import abstractmethod

from schemas.evaluation import EvaluationInput


class EvaluationProvider(ABC):

    @abstractmethod
    def evaluate(
        self,
        payload: EvaluationInput,
    ) -> dict:
        ...