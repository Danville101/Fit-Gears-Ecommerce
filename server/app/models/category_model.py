from typing import TYPE_CHECKING
from sqlalchemy import Integer, String , Boolean, DateTime,  LargeBinary, func, ForeignKey
from sqlalchemy.sql.schema import Column
from sqlalchemy.orm import relationship
from app.db.session import Base
from .product_model import Product

if TYPE_CHECKING:
     from app.models.product_model import Product

class Category(Base):
     
     __tablename__ ="category"
     
     id =Column(Integer, primary_key=True)
     name = Column(String, nullable=False, unique=True)
     date_created = Column(DateTime, default=func.now())
    # products= relationship("Product", back_populates='category')
     
     
     
     