from fastapi import FastAPI, Depends, HTTPException, Response, File , Form, UploadFile
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from app.schema.user_schema import CreateUserRequest, LoginResquest
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user_model import User
from app.models.order_model import Order ,Shipping, OrderItem
from app.schema.order_schema import CreateOrderItemRequest, CreateShippingRequest, CreateCheckoutRequest
from app.utils.hash import get_password_hash, verify_password
from app.models.category_model import Category #Once imported a bug is introduced
from app.models.product_model import Product #Once imported a bug is introduced
import jwt
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import aiofiles
from typing import List, Optional
from sqlalchemy import desc, asc
from  app.utils.auth import get_token, get_email
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Environment, PackageLoader
from app.schema.model import TextIn
from fastapi import Query
import stripe
from starlette.responses import RedirectResponse

from app.routers.admin import admin_app
from app.routers.costumer import costumer_app
import os

app = FastAPI(debug=True)
app.mount("/admin", admin_app)
app.mount("/costumer", costumer_app)

env= Environment(loader=PackageLoader('app', 'templates') )

stripe.api_key= os.environ.get("STRIPE_API_KEY")





app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.mount("/media", StaticFiles(directory="media"), name="media")



@app.post("/reset_password/")
async def rest():
     template =env.get_template('resetpaassword.html')
     template_data = {'user_name': "dan"}
     htm_content = template.render(template_data)
     msg=MIMEMultipart()
     msg["From"] = 'danville.wilks@gmail.com'
     msg["To"] = "danville.wilks@gmail.com"
     msg["Subject"]= "Reset password"
     msg.attach(MIMEText(htm_content, "html"))
     
     
     server = smtplib.SMTP('smtp.gmail.com', 587)
     server.starttls()
     server.login('danville.wilks@gmail.com', 'mhgrlqtjnkzfpqjl')
     server.sendmail(msg['From'], msg['To'], msg.as_string())
     server.quit()
     










@app.post("/register/")
async def createuser(req: CreateUserRequest, db:Session = Depends(get_db)):
    # password1 =  await hash(req.password)
     if req.password == req.passwordrepeat:
       
          new_user= User(
               user_name = req.user_name,
               password= get_password_hash(req.password),
               email = req.email
          )
          
          db.add(new_user)
          db.commit()
          return{
               "successful": True,
               "Id": new_user.id
          }
     else:
          return HTTPException(400, "Password dont match")



@app.post("/login/")
async def login(req: LoginResquest, db:Session=Depends(get_db)):
     user =db.query(User).filter(User.email == req.email).first()
     if not user:
          return HTTPException(400, "Email don't exist")
     
     if not verify_password(req.password, user.password):
          return HTTPException(400, "Email or Password Incorrect")
     
     payload={
               "email":user.email,
            
          }
          
     token= get_token(payload)
     response = JSONResponse("ok")
          
     response.set_cookie("token", token, httponly=True, secure=True, samesite="none" )
     response.set_cookie("user", user.user_name, httponly=True, secure=True, samesite="none" )
    
     
     return response
              
     





#@app.get("/products/")
#async def products(db:Session=Depends(get_db)):
#     products = db.query(Product).order_by(Product.name).all()
#     
#     return products
     
     

@app.get("/category/")
async def category(db:Session=Depends(get_db)):
     
     category=  db.query(Category).all()
     if not category:
        raise HTTPException(status_code=404, detail="Item not found")
     
     return category


@app.get("/products/")
async def read_items(
    page: int = Query(4, description="The page number"),
    page_size: int = Query(11, description="The number of items per page"),
    db:Session=Depends(get_db)
):

    products = db.query(Product).order_by(desc(Product.date_created)).offset((page - 1) * page_size).limit(page_size).all()
    return  products

