from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from core.config import settings
from models.base import Base

engine = create_engine(settings.DATABASE_URL)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)