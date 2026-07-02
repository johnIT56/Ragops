from sqlalchemy.orm import Session

from models.experiment_run import ExperimentRun


class ExperimentRunRepository:

    def create(
        self,
        db: Session,
        run: ExperimentRun,
    ) -> ExperimentRun:

        db.add(run)
        db.flush()

        return run