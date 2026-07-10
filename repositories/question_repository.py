from sqlalchemy.orm import Session

from models.evaluation_question import EvaluationQuestion


class QuestionRepository:

    def create(
        self,
        db: Session,
        question: EvaluationQuestion,
    ) -> EvaluationQuestion:

        db.add(question)
        db.flush()
        db.refresh(question)

        return question

    def get_all(
        self,
        db: Session,
    ) -> list[EvaluationQuestion]:

        return (
            db.query(EvaluationQuestion)
            .all()
        )

    def get_by_id(
        self,
        db: Session,
        question_id,
    ) -> EvaluationQuestion | None:

        return (
            db.query(EvaluationQuestion)
            .filter(
                EvaluationQuestion.id == question_id
            )
            .first()
        )

    def find_by_experiment(
        self,
        db: Session,
        experiment_id,
    ) -> list[EvaluationQuestion]:

        return (
            db.query(EvaluationQuestion)
            .filter(
                EvaluationQuestion.experiment_id == experiment_id
            )
            .order_by(
                EvaluationQuestion.created_at.desc()
            )
            .all()
        )

    def delete(
        self,
        db: Session,
        question: EvaluationQuestion,
    ) -> None:

        db.delete(question)