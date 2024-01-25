import jwt


def get_token(payload:dict):
     
     token= jwt.encode(payload, "secert", algorithm="HS256")
     return token
     


def get_email(token):
     
    
     payload = jwt.decode( token, "secert", algorithms=["HS256"])
     return payload["email"]