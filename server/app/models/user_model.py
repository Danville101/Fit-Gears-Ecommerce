from typing import TYPE_CHECKING
from sqlalchemy import Integer, String , Boolean, DateTime,  func
from sqlalchemy.sql.schema import Column
from sqlalchemy.orm import relationship
from app.db.session import Base



if TYPE_CHECKING:
     from .order_model import Order
 
     



class User(Base):
     
     __tablename__ ="user"
     
     id =Column(Integer, primary_key=True)
     user_name = Column(String, nullable=False, unique=True)
     password=Column(String, nullable=False)
     email=Column(String, nullable=False)
     is_staff=Column(Boolean, default=False)
     date_created=Column(DateTime, default=func.now())
    # order = relationship("Order", back_populates="costumer")
     
     
     
     
     