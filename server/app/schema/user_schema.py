from pydantic  import BaseModel

class CreateUserRequest(BaseModel):
     user_name: str
     email:str
     password:str
     passwordrepeat:str


class LoginResquest(BaseModel):
     email :str
     password:str
     
     
class ResetPasswordRequest(BaseModel):
      email :str