from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.dependencies import get_db

from schemas.dashboard import DashboardStatsResponse

from services.dashboard_service import DashboardService


router = APIRouter(
    prefix="/dashboard",
    tags=["dashboard"],
)

service = DashboardService()


@router.get(
    "/stats",
    response_model=DashboardStatsResponse,
)
def get_dashboard_stats(
    db: Session = Depends(get_db),
):

    return service.get_stats(
        db=db,
    )