from repositories.experiment_repository import ExperimentRepository
from sqlalchemy.orm import Session

class ExperimentService:

    def __init__(self):
        self.experiment_repo = ExperimentRepository()

    def get(
        self,
        db: Session,
        experiment_id,
    ):
        experiment = self.experiment_repo.get_by_id(
            db,
            experiment_id,
        )

        if experiment is None:
            raise ValueError("Experiment not found.")

        return experiment