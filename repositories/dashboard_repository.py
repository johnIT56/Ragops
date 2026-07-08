from sqlalchemy import func
from sqlalchemy.orm import Session

from models.chunk import Chunk
from models.document import Document
from models.evaluation_question import EvaluationQuestion
from models.experiment import Experiment
from models.experiment_run import ExperimentRun


class DashboardRepository:

    def get_stats(
        self,
        db: Session,
    ):

        return {
            "documents": db.query(
                func.count(Document.id)
            ).scalar(),

            "chunks": db.query(
                func.count(Chunk.id)
            ).scalar(),

            "experiments": db.query(
                func.count(Experiment.id)
            ).scalar(),

            "runs": db.query(
                func.count(ExperimentRun.id)
            ).scalar(),

            "questions": db.query(
                func.count(EvaluationQuestion.id)
            ).scalar(),
        }