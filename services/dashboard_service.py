from sqlalchemy.orm import Session

from repositories.dashboard_repository import (
    DashboardRepository,
)


class DashboardService:

    def __init__(self):

        self.dashboard_repo = DashboardRepository()

    def get_stats(
        self,
        db: Session,
    ):

        return self.dashboard_repo.get_stats(
            db=db,
        )