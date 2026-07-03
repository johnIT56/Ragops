from sqlalchemy.orm import Session

from repositories.experiment_run_repository import (
    ExperimentRunRepository,
)
from repositories.question_result_repository import (
    QuestionResultRepository,
)


class RunService:

    def __init__(self):
        self.run_repo = ExperimentRunRepository()
        self.result_repo = QuestionResultRepository()

    def get_results(
        self,
        db: Session,
        run_id,
    ):

        run = self.run_repo.get_by_id(
            db=db,
            run_id=run_id,
        )

        if run is None:
            raise ValueError("Run not found.")

        return self.result_repo.find_by_run(
            db=db,
            run_id=run_id,
        )
    def get(
        self,
        db: Session,
        run_id,
    ):

        run = self.run_repo.get_by_id(
            db=db,
            run_id=run_id,
        )

        if run is None:
            raise ValueError("Run not found.")

        return run
    
    def compare(
        self,
        db: Session,
        run1_id,
        run2_id,
   ):
        run1 = self.get(
           db=db,
           run_id=run1_id,
        )

        run2 = self.get(
            db=db,
            run_id=run2_id,
        )

        if run1.experiment_id != run2.experiment_id:
            raise ValueError(
                "Runs belong to different experiments."
            )

        return {
            "run1": run1,
            "run2": run2,
            "difference": {
                "latency":
                    run2.avg_latency - run1.avg_latency,

                "answer_relevancy":
                     run2.avg_answer_relevancy
                     - run1.avg_answer_relevancy,

                "faithfulness":
                     run2.avg_faithfulness
                    - run1.avg_faithfulness,

                "context_precision":
                     run2.avg_context_precision
                     - run1.avg_context_precision,

                 "context_recall":
                      run2.avg_context_recall
                     - run1.avg_context_recall,
             },
        }