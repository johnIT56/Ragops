from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from core.dependencies import get_db
from services.retrieval_service import RetrievalService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


class AskRequest(BaseModel):
    question: str
    top_k: int = 5


class AskResponse(BaseModel):
    answer: str
    context: list[str]


@router.post(
    "/ask",
    response_model=AskResponse,
)
def ask_question(
    request: AskRequest,
    db: Session = Depends(get_db),
):

    service = RetrievalService()

    answer, context = service.answer_question(
        db=db,
        question=request.question,
        top_k=request.top_k,
    )

    return AskResponse(
        answer=answer,
        context=context,
    )