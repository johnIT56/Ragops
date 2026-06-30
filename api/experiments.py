from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.dependencies import get_db

from models.experiment import Experiment
from schemas.experiments import ExperimentCreate, ExperimentResponse

router = APIRouter(prefix="/experiments", tags=["experiments"])


@router.post("/", response_model=ExperimentResponse)
def create_experiment(
    payload: ExperimentCreate,
    db: Session = Depends(get_db),
):

    experiment = Experiment(
        name=payload.name,
        config=payload.config.model_dump() if hasattr(payload.config, "model_dump") else payload.config,
    )

    db.add(experiment)
    db.commit()
    db.refresh(experiment)

    return experiment