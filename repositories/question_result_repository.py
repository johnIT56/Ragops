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
    
    def find_by_run(
        self,
        db: Session,
        run_id,
    ) -> list[QuestionResult]:

        return (
            db.query(QuestionResult)
            .filter(
                QuestionResult.run_id == run_id
            )
            .all()
        )