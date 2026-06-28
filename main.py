from fastapi import FastAPI

from api.documents import router as documents_router
from api.chat import router as chat_router

app = FastAPI(
    title="RAGOps",
    version="0.1.0",
)

app.include_router(documents_router)
app.include_router(chat_router)