from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.dependencies import get_db

from schemas.question_results import (
    QuestionResultResponse,
)

from schemas.experiment_runs import ExperimentRunResponse

from services.run_service import RunService

router = APIRouter(
    prefix="/runs",
    tags=["runs"],
)

service = RunService()


@router.get(
    "/{run_id}/results",
    response_model=list[QuestionResultResponse],
)
def get_results(
    run_id,
    db: Session = Depends(get_db),
):

    return service.get_results(
        db=db,
        run_id=run_id,
    )

@router.get(
    "/{run_id}",
    response_model=ExperimentRunResponse,
)
def get_run(
    run_id,
    db: Session = Depends(get_db),
):

    return service.get(
        db=db,
        run_id=run_id,
    )