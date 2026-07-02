from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.dependencies import get_db

from schemas.evaluation_question import (
    EvaluationQuestionCreate,
    EvaluationQuestionResponse,
)

from services.question_service import QuestionService

router = APIRouter(prefix="/questions", tags=["questions"])

service = QuestionService()


@router.post("/", response_model=EvaluationQuestionResponse)
def create_question(payload: EvaluationQuestionCreate, db: Session = Depends(get_db)):
    return service.create(
        db=db,
        experiment_id=payload.experiment_id,
        question=payload.question,
        ground_truth=payload.ground_truth,
    )


@router.get("/", response_model=list[EvaluationQuestionResponse])
def list_questions(db: Session = Depends(get_db)):
    return service.list(db)


@router.get("/by-experiment/{experiment_id}", response_model=list[EvaluationQuestionResponse])
def get_by_experiment(experiment_id, db: Session = Depends(get_db)):
    return service.get_by_experiment(db, experiment_id)