from sqlalchemy.orm import Session

from models.experiment import Experiment


class ExperimentRepository:

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