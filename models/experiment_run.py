import uuid
from datetime import datetime

from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.base import Base


class ExperimentRun(Base):
    __tablename__ = "experiment_runs"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4
    )

    experiment_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("experiments.id"),
        nullable=False
    )

    avg_latency: Mapped[float] = mapped_column(nullable=False, default=0.0)
    avg_answer_relevancy: Mapped[float] = mapped_column(nullable=False, default=0.0)
    avg_faithfulness: Mapped[float] = mapped_column(nullable=False, default=0.0)
    avg_context_precision: Mapped[float] = mapped_column(nullable=False, default=0.0)
    avg_context_recall: Mapped[float] = mapped_column(nullable=False, default=0.0)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    experiment = relationship(
        "Experiment",
        back_populates="runs"
    )

    results = relationship(
        "QuestionResult",
        back_populates="run",
        cascade="all, delete-orphan"
    )