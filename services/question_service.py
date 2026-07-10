from sqlalchemy.orm import Session

from models.evaluation_question import EvaluationQuestion

from repositories.question_repository import (
    QuestionRepository,
)


class QuestionService:

    def __init__(self):
        self.repo = QuestionRepository()

    def create(
        self,
        db: Session,
        experiment_id,
        question,
        ground_truth,
    ) -> EvaluationQuestion:

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
        db.refresh(obj)

        return obj

    def get_all(
        self,
        db: Session,
    ) -> list[EvaluationQuestion]:

        return self.repo.get_all(db)

    def get_by_experiment(
        self,
        db: Session,
        experiment_id,
    ) -> list[EvaluationQuestion]:

        return self.repo.find_by_experiment(
            db=db,
            experiment_id=experiment_id,
        )

    def update(
        self,
        db: Session,
        question_id,
        question,
        ground_truth,
    ) -> EvaluationQuestion:

        obj = self.repo.get_by_id(
            db=db,
            question_id=question_id,
        )

        if obj is None:
            raise ValueError(
                "Evaluation question not found."
            )

        obj.question = question
        obj.ground_truth = ground_truth

        db.commit()
        db.refresh(obj)

        return obj

    def delete(
        self,
        db: Session,
        question_id,
    ) -> None:

        obj = self.repo.get_by_id(
            db=db,
            question_id=question_id,
        )

        if obj is None:
            raise ValueError(
                "Evaluation question not found."
            )

        self.repo.delete(
            db=db,
            question=obj,
        )

        db.commit()