from sqlalchemy.orm import Session

from models.experiment import Experiment


class ExperimentRepository:

    def create(
        self,
        db: Session,
        experiment: Experiment,
    ) -> Experiment:

        db.add(experiment)
        db.flush()
        db.refresh(experiment)

        return experiment

    def list(
        self,
        db: Session,
    ) -> list[Experiment]:

        return (
            db.query(Experiment)
            .order_by(Experiment.created_at.desc())
            .all()
        )

    def get_by_id(
        self,
        db: Session,
        experiment_id,
    ) -> Experiment | None:

        return (
            db.query(Experiment)
            .filter(Experiment.id == experiment_id)
            .first()
        )