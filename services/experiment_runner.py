import time

from sqlalchemy.orm import Session

from models.experiment_run import ExperimentRun
from models.question_result import QuestionResult

from repositories.experiment_run_repository import ExperimentRunRepository
from repositories.question_repository import QuestionRepository
from repositories.question_result_repository import QuestionResultRepository

from services.embedding_service import EmbeddingService
from services.evaluation_service import EvaluationService
from services.generation_service import GenerationService
from services.retrieval_service import RetrievalService

from fastapi import HTTPException

class ExperimentRunner:

    def __init__(self):

        self.evaluation_service = EvaluationService()

        self.question_repo = QuestionRepository()
        self.question_result_repo = QuestionResultRepository()
        self.experiment_run_repo = ExperimentRunRepository()

    def run(
        self,
        db: Session,
        experiment,
    ) -> ExperimentRun:

        embedding_service = EmbeddingService(
            model=experiment.config.get(
                "embedding_model",
            ),
        )

        retrieval_service = RetrievalService(
            embedding_service=embedding_service,
        )

        generation_service = GenerationService(
            model=experiment.config.get(
                "llm_model",
            ),
        )

        top_k = experiment.config.get(
            "top_k",
            5,
        )

        questions = self.question_repo.find_by_experiment(
            db=db,
            experiment_id=experiment.id,
        )

        if not questions:
            raise HTTPException(
                status_code=400,
                detail=
                "No evaluation questions found for this experiment."
                "Please add evaluation questions before running."

            )

        run = ExperimentRun(
            experiment_id=experiment.id,
            avg_latency=0.0,
            avg_answer_relevancy=0.0,
            avg_faithfulness=0.0,
            avg_context_precision=0.0,
            avg_context_recall=0.0,
        )

        self.experiment_run_repo.create(
            db=db,
            run=run,
        )

        metrics_list = []

        for question in questions:

            start = time.perf_counter()

            contexts = retrieval_service.retrieve(
                db=db,
                question=question.question,
                top_k=top_k,
            )

            answer = generation_service.generate(
                question=question.question,
                contexts=contexts,
            )

            latency = time.perf_counter() - start

            metrics = self.evaluation_service.evaluate(
                question=question.question,
                answer=answer,
                ground_truth=question.ground_truth,
                contexts=contexts,
                latency=latency,
            )

            result = QuestionResult(
                run_id=run.id,
                question=question.question,
                answer=answer,
                contexts="\n\n".join(contexts),
                latency=metrics["latency"],
                faithfulness=metrics["faithfulness"],
                answer_relevancy=metrics["answer_relevancy"],
                context_precision=metrics["context_precision"],
                context_recall=metrics["context_recall"],
            )

            self.question_result_repo.create(
                db=db,
                result=result,
            )

            metrics_list.append(metrics)

        run.avg_latency = self._average(
            metrics_list,
            "latency",
        )
        run.avg_faithfulness = self._average(
            metrics_list,
            "faithfulness",
        )
        run.avg_answer_relevancy = self._average(
            metrics_list,
            "answer_relevancy",
        )
        run.avg_context_precision = self._average(
            metrics_list,
            "context_precision",
        )
        run.avg_context_recall = self._average(
            metrics_list,
            "context_recall",
        )

        db.commit()
        db.refresh(run)

        return run

    @staticmethod
    def _average(
        metrics: list[dict],
        key: str,
    ) -> float:

        if not metrics:
            return 0.0

        return sum(
            metric[key]
            for metric in metrics
        ) / len(metrics)