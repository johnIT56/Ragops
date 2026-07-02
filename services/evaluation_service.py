class EvaluationService:

    def evaluate(
        self,
        question: str,
        answer: str,
        ground_truth: str,
        contexts: list[str],
        latency: float,
    ):

        return {
            "latency": latency,
            "faithfulness": 1.0,
            "answer_relevancy": 1.0,
            "context_precision": 1.0,
            "context_recall": 1.0,
        }