from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.dependencies import get_db
from schemas.chat import AskRequest, AskResponse
from services.rag_service import RagService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("/ask", response_model=AskResponse)
def ask(
    request: AskRequest,
    db: Session = Depends(get_db),
):
    rag_service = RagService()

    answer, context = rag_service.ask(
        db=db,
        question=request.question,
        top_k=request.top_k,
    )

    return AskResponse(
        answer=answer,
        context=context,
    )