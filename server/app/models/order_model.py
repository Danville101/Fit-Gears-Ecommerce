from typing import TYPE_CHECKING
from sqlalchemy import Integer, String , Boolean, DateTime, func , ForeignKey, Numeric
from sqlalchemy.sql.schema import Column
from sqlalchemy.orm import relationship
from app.db.session import Base
from sqlalchemy import Enum


if TYPE_CHECKING:
     from .user_model import User
     from .product_model import Product
 


class Cart(Base):
     __tablename__= "cart"
     id = Column(Integer, primary_key=True)
     costumer_email = Column(String,  ForeignKey("user.email"), nullable=True)
     user_agent= Column(String, nullable=True)
     date_created = Column(DateTime, default=func.now())


class CartItem(Base):
     __tablename__= "cart_items"
     id = Column(Integer, primary_key=True)
     price = Column(Numeric(10,2), nullable=False)
     quantity = Column(Integer, nullable=False)
     cart_number = Column(Integer, ForeignKey("cart.id"))
     product_name = Column(String, ForeignKey("product.name"))
     date_created = Column(DateTime, default=func.now())
     
          

class Order(Base):
     
     
     __tablename__ = "order"
     
     id = Column(Integer, primary_key=True)
     costumer_email = Column(String,  ForeignKey("user.email"))
     total_cost = Column(Numeric(10,2), nullable=False)
     status =  Column(String, nullable=False)
     order_number = Column(Integer, nullable=False, unique=True)
     date_created = Column(DateTime, default=func.now())
    #costumer = relationship("User", back_populates="order")
    # order_item= relationship("OrderItem", back_populates="order")
    # shipping = relationship("Shipping", back_populates="order")

     


class OrderItem(Base):
     
    __tablename__ = "order_items"
    
    
    id= Column(Integer, primary_key=True)
    price = Column(Numeric(10,2), nullable=False)
    quantity = Column(Integer, nullable=False)
    order_number = Column(Integer, ForeignKey("order.order_number"))
    product_name = Column(String, ForeignKey("product.name"))
    date_created = Column(DateTime, default=func.now())
   # products = relationship("Product", back_populates="order_item")
    #order = relationship("Order", back_populates="order_item")
    
     


class Shipping(Base):
     
     __tablename__ = "shipping"
     
     id = Column(Integer, primary_key=True)
     first_name = Column(String, nullable=False)
     last_name = Column(String, nullable=False)
     email = Column(String, nullable=False)
     address_line1 = Column(String, nullable=False)
     address_line2 = Column(String, nullable=False)
     city = Column(String, nullable=False)
     country_state = Column(String, nullable=False)
     postcode_zipcode = Column(String, nullable=False)
     phone = Column(String, nullable=False)
     order_number = Column(Integer, ForeignKey("order.order_number"))
     date_created = Column(DateTime, default=func.now())
    # order = relationship("Order", back_populates="shipping")




  
     