import uuid

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base


class QuestionResult(Base):
    __tablename__ = "question_results"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    run_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("experiment_runs.id")
    )

    question: Mapped[str]

    answer: Mapped[str]

    contexts: Mapped[str]

    latency: Mapped[float]

    faithfulness: Mapped[float]

    answer_relevancy: Mapped[float]

    context_precision: Mapped[float]

    context_recall: Mapped[float]

    run = relationship(
        "ExperimentRun",
        back_populates="results",
    )