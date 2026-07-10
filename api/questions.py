from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.dependencies import get_db

from schemas.evaluation_questions import (
    EvaluationQuestionCreate,
    EvaluationQuestionUpdate,
    EvaluationQuestionResponse,
)

from services.question_service import QuestionService

router = APIRouter(
    prefix="/questions",
    tags=["questions"],
)

service = QuestionService()


@router.post(
    "/",
    response_model=EvaluationQuestionResponse,
)
def create_question(
    payload: EvaluationQuestionCreate,
    db: Session = Depends(get_db),
):

    return service.create(
        db=db,
        experiment_id=payload.experiment_id,
        question=payload.question,
        ground_truth=payload.ground_truth,
    )


@router.get(
    "/",
    response_model=list[EvaluationQuestionResponse],
)
def list_questions(
    db: Session = Depends(get_db),
):

    return service.get_all(db)


@router.get(
    "/by-experiment/{experiment_id}",
    response_model=list[EvaluationQuestionResponse],
)
def get_questions_by_experiment(
    experiment_id: UUID,
    db: Session = Depends(get_db),
):

    return service.get_by_experiment(
        db=db,
        experiment_id=experiment_id,
    )


@router.put(
    "/{question_id}",
    response_model=EvaluationQuestionResponse,
)
def update_question(
    question_id: UUID,
    payload: EvaluationQuestionUpdate,
    db: Session = Depends(get_db),
):

    return service.update(
        db=db,
        question_id=question_id,
        question=payload.question,
        ground_truth=payload.ground_truth,
    )


@router.delete("/{question_id}")
def delete_question(
    question_id: UUID,
    db: Session = Depends(get_db),
):

    service.delete(
        db=db,
        question_id=question_id,
    )

    return {
        "message": "Question deleted successfully."
    }