from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.dependencies import get_db

from schemas.experiments import (
    ExperimentCreate,
    ExperimentResponse,
)

from services.experiment_service import ExperimentService
from services.experiment_runner import ExperimentRunner

router = APIRouter(
    prefix="/experiments",
    tags=["experiments"],
)

service = ExperimentService()
runner = ExperimentRunner()


@router.post("/", response_model=ExperimentResponse)
def create_experiment(
    payload: ExperimentCreate,
    db: Session = Depends(get_db),
):
    return service.create(
        db=db,
        payload=payload,
    )


@router.get("/", response_model=list[ExperimentResponse])
def list_experiments(
    db: Session = Depends(get_db),
):
    return service.list(db)


@router.post("/{experiment_id}/run")
def run_experiment(
    experiment_id: UUID,
    db: Session = Depends(get_db),
):
    experiment = service.get(
        db=db,
        experiment_id=experiment_id,
    )

    if experiment is None:
        raise HTTPException(
            status_code=404,
            detail="Experiment not found",
        )

    return runner.run(
        db=db,
        experiment=experiment,
    )