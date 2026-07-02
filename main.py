from fastapi import FastAPI

from api.documents import router as documents_router
from api.chat import router as chat_router
from api.experiments import router as experiments_router

from core.database import Base, engine

# Import ALL models so SQLAlchemy knows about them
from models.document import Document
from models.chunk import Chunk
from models.experiment import Experiment
from models.experiment_run import ExperimentRun
from models.evaluation_question import EvaluationQuestion
from api.questions import router as questions_router

app = FastAPI(
    title="RAGOps",
    version="0.1.0",
)


@app.on_event("startup")
def startup():
    print(Base.metadata.tables.keys())
    Base.metadata.create_all(bind=engine)
    


app.include_router(documents_router)
app.include_router(chat_router)
app.include_router(experiments_router)
app.include_router(questions_router)