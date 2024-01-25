from typing import TYPE_CHECKING
from sqlalchemy import Integer, String , Boolean, DateTime, func , ForeignKey, Numeric
from sqlalchemy.sql.schema import Column
from sqlalchemy.orm import relationship
from app.db.session import Base


if TYPE_CHECKING:
     from .category_model import Category
     from .order_model import OrderItem


class Product(Base):
     
     __tablename__ ="product"
     
     id =Column(Integer, primary_key=True)
     name = Column(String, nullable=False, unique=True)
     image1=Column(String, nullable=False)
     image2=Column(String, nullable=False)
     image3=Column(String, nullable=False)
     image4=Column(String, nullable=False)
     description=Column(String, nullable=False)
     price=Column(Numeric(10,2), nullable=False)
     published= Column(Boolean, nullable=False, default=True)
     quantity=Column(Integer, nullable=False)
     date_created=Column(DateTime, default=func.now())
     category_name = Column(String, ForeignKey("category.name"))
     #category = relationship("Category", back_populates="products")
    # order_item= relationship("OrderItem", back_populates="products")
