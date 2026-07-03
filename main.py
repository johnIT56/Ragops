from fastapi import FastAPI

from api.documents import router as documents_router
from api.chat import router as chat_router
from api.experiments import router as experiments_router

from core.database import Base, engine


from api.questions import router as questions_router
from api.runs import router as runs_router

app = FastAPI(
    title="RAGOps",
    version="0.1.0",
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    


app.include_router(documents_router)
app.include_router(chat_router)
app.include_router(experiments_router)
app.include_router(questions_router)
app.include_router(runs_router)