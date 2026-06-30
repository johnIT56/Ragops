from sqlalchemy.orm import Session

from models.question_result import QuestionResult


class QuestionResultRepository:

    def create(
        self,
        db: Session,
        result: QuestionResult,
    ) -> QuestionResult:

        db.add(result)
        db.flush()

        return result