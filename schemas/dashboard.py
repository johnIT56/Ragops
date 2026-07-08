from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):

    documents: int

    chunks: int

    experiments: int

    runs: int

    questions: int