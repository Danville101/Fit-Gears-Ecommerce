from pydantic  import BaseModel
from fastapi import  File, Form, UploadFile

class CreateProductRequest(BaseModel):
     name:str= Form(...)
     category_name: str = Form(...)
     image1: UploadFile =File(...)
     image2: UploadFile =File(...)
     image3: UploadFile =File(...)
     image4: UploadFile =File(...)
     description:str = Form(...)
     price: float = Form(...)
     quantity:int = Form(...)



 