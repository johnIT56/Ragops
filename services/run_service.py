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