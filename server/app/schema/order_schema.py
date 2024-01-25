from pydantic  import BaseModel
from typing import List, Optional


class CreateCartRequest(BaseModel):
     price:float
     quantity:int

     product_name:str
     
class UpdateItemRequest(BaseModel):
     amount: Optional[int] = None
     increment_decrement : Optional[int] = None


class CreateShippingRequest(BaseModel):
     


     first_name :str
     last_name: str
     email:str
     address_line1:str
     address_line2:str
     city:str
     country_state:str
     postcode_zipcode:str
     phone:str
 




class CreateOrderItemRequest(BaseModel):
     
    price :float
    quantity :int
    product :str





class CreateCheckoutRequest(CreateShippingRequest):
    items: List[CreateOrderItemRequest]
     
     
