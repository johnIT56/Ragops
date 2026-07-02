from sqlalchemy.orm import Session

from models.evaluation_question import EvaluationQuestion
from repositories.question_repository import QuestionRepository


class QuestionService:

    def __init__(self):
        self.repo = QuestionRepository()

    def create(
        self,
        db: Session,
        experiment_id,
        question,
        ground_truth,
    ):

        obj = EvaluationQuestion(
            experiment_id=experiment_id,
            question=question,
            ground_truth=ground_truth,
        )

        obj = self.repo.create(
            db=db,
            question=obj,
        )

        db.commit()

        return obj

    def list(
        self,
        db: Session,
    ):
        return self.repo.list(db)

    def get_by_experiment(
        self,
        db: Session,
        experiment_id,
    ):
        return self.repo.find_by_experiment(
            db=db,
            experiment_id=experiment_id,
        )