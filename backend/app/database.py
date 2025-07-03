# app/database.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


DATABASE_URL = "postgresql://postgres:bookbuddy@localhost:5432/bookbuddy"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

# ✅ Correct get_db function
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
