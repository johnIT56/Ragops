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
        db.refresh(run)

        return run

    def find_by_experiment(
        self,
        db: Session,
        experiment_id,
    ) -> list[ExperimentRun]:

        return (
            db.query(ExperimentRun)
            .filter(
                ExperimentRun.experiment_id == experiment_id
            )
            .order_by(
                ExperimentRun.created_at.desc()
            )
            .all()
        )
    
    def get_by_id(
        self,
        db: Session,
        run_id,
    ):

        return (
            db.query(ExperimentRun)
            .filter(
                ExperimentRun.id == run_id
            )
            .first()
        )