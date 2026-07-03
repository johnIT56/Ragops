from sqlalchemy.orm import Session

from models.experiment import Experiment

from repositories.experiment_repository import ExperimentRepository
from repositories.experiment_run_repository import (
    ExperimentRunRepository,
)

from schemas.experiments import ExperimentCreate


class ExperimentService:

    def __init__(self):
        self.experiment_repo = ExperimentRepository()
        self.experiment_run_repo = ExperimentRunRepository()

    def create(
        self,
        db: Session,
        payload: ExperimentCreate,
    ) -> Experiment:

        config = payload.model_dump()
        name = config.pop("name")

        experiment = Experiment(
            name=name,
            config=config,
        )

        experiment = self.experiment_repo.create(
            db=db,
            experiment=experiment,
        )

        db.commit()
        db.refresh(experiment)

        return experiment

    def list(
        self,
        db: Session,
    ) -> list[Experiment]:

        return self.experiment_repo.list(db)

    def get(
        self,
        db: Session,
        experiment_id,
    ) -> Experiment:

        experiment = self.experiment_repo.get_by_id(
            db=db,
            experiment_id=experiment_id,
        )

        if experiment is None:
            raise ValueError("Experiment not found.")

        return experiment

    def get_runs(
        self,
        db: Session,
        experiment_id,
    ):
        # Ensure the experiment exists
        self.get(
            db=db,
            experiment_id=experiment_id,
        )

        return self.experiment_run_repo.find_by_experiment(
            db=db,
            experiment_id=experiment_id,
        )