from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os


SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL")



engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_size=20, max_overflow=20)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine,)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    except:
        db.close()
