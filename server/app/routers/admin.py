from fastapi import FastAPI, Depends, HTTPException, Response, File , Form, UploadFile, Path, Body
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from app.schema.user_schema import CreateUserRequest, LoginResquest
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user_model import User
from app.utils.hash import get_password_hash, verify_password
from app.models.category_model import Category #Once imported a bug is introduced
from app.models.product_model import Product #Once imported a bug is introduced
from app.models.order_model import Order, OrderItem, Shipping
import jwt
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import aiofiles
from sqlalchemy import desc, asc
from  app.utils.auth import get_token, get_email
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Environment, PackageLoader
from fastapi import Query
import stripe
import requests
import datetime


admin_app = FastAPI(debug=True)

env= Environment(loader=PackageLoader('app', 'templates') )

stripe.api_key="sk_test_51Lij1LKl07rHxPLvCex6bW4vc1YdGCGyAuSzL6qWlJMLmuNMx0DgiP1w9W4uxMy89WXlsdgARHTzBHoTOJHnx9jw00PwqDna31"







@admin_app.post("/reset_password/")
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
     










@admin_app.post("/product/")
async def create_product(
                         name:str= Form(...), 
                         category:str =Form(...), 
                         description:str=Form(...), 
                         price:str= Form(...),
                         quantity: str = Form(...), 
                         image1: UploadFile =File(...),
                         image2: UploadFile =File(...),
                         image3: UploadFile =File(...),
                         image4: UploadFile =File(...)
                         , db: Session = Depends(get_db)
                         ):
     
     category_cap =category.capitalize()
     
     latest_category = db.query(Category).order_by(desc(Category.id)).first()
     category_exist =  db.query(Category).filter(Category.name == category_cap).first()
     if not category_exist:
          new_category=Category(
               id=latest_category.id +1,
               name=category_cap
          )
          db.add(new_category)
          db.commit()
     
    
    
     latest_product = db.query(Product).order_by(desc(Product.id)).first()     
     async with aiofiles.open('media/'+image1.filename, "wb") as out_file:
        content= await image1.read()
        await out_file.write(content)
        
     async with aiofiles.open('media/'+image2.filename, "wb") as out_file:
        content= await image2.read()
        await out_file.write(content)
        
     async with aiofiles.open('media/'+image3.filename, "wb") as out_file:
        content= await image3.read()
        await out_file.write(content)
        
     async with aiofiles.open('media/'+image4.filename, "wb") as out_file:
        content= await image4.read()
        await out_file.write(content)
     
  
     
     new_product= Product(
     id=latest_product.id+1,
     name = name,
     image1='media/'+image1.filename,
     image2='media/'+image2.filename,                     
     image3='media/'+image3.filename,
     image4='media/'+image4.filename,
     description= description,
     price=price,
     category_name=category_cap,
     quantity=quantity)
     
     

     
     
     db.add(new_product)
     db.commit()
     
     return new_product.id 


#REGISTER
@admin_app.post("/register/")
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



@admin_app.post("/login/")
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
     
     return response
     





#@app.get("/products/")
#async def products(db:Session=Depends(get_db)):
#     products = db.query(Product).order_by(Product.name).all()
#     
#     return products
     
     

@admin_app.get("/category/")
async def category(db:Session=Depends(get_db)):
     
     category=  db.query(Category).all()
     
     return category


#@admin_app.get("/products/")
#async def read_items(
#    page: int = Query(1, description="The page number"),
#    page_size: int = Query(10, description="The number of items per page"),
#    db:Session=Depends(get_db)
#):
#    pages =[]
#    all_products = db.query(Product).all()
#    products = db.query(Product).order_by(desc(Product.name)).offset((page - 1) * page_size).limit(page_size).all()
#    limit=int(len(all_products)/page_size)
#    for i in range(1,limit+1):
#         pages.append(i)
#
#         
#    data={
#         "pages": pages,
#         "products":products
#    }
#    return data



@admin_app.get("/products/")
async def read_items(
    page: int = Query(1, description="The page number"),
    page_size: int = Query(10, description="The number of items per page"),
    search: str = Query(None, description="Search query"),
    db:Session=Depends(get_db)
):
    pages =[]
    query = db.query(Product).order_by(asc(Product.name))

    if search is not None:
        query = query.filter(Product.name.ilike(f"%{search}%"))
        
     

    all_products = query.all()
    products = query.offset((page - 1) * page_size).limit(page_size).all()
    limit=int(len(all_products)/page_size)
    for i in range(1,limit+1):
         pages.append(i)

         
    data={
         "pages": pages,
         "products":products
    }
    return data


@admin_app.get("/products_all/")
async def  all_products_lenght(
    db:Session=Depends(get_db)
):

    products = db.query(Product).all()
    
    return  len(products)





@admin_app.delete("/product/{id}")
def delete_record(id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Record not found")
    db.delete(product)
    db.commit()
    return {"message": "Record deleted"}


@admin_app.put("/product_published/{id}")
def update_record(request: Request, db: Session = Depends(get_db)):
    id = request.path_params["id"]
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Record not found")
    product.published = not product.published
    
    db.commit()
    

    
    
@admin_app.get("/orders/")
def get_orders(db: Session = Depends(get_db)):
     
     order_details=[]
     item_and_iamge=[]
     
     orders = db.query(Order).all()
     for order in orders:
          shipping_details = db.query(Shipping).filter(Shipping.order_number == order.order_number).first()
          items = db.query(OrderItem).filter(OrderItem.order_number==order.order_number).all()
          for item in items:
               product = db.query(Product).filter(Product.name == item.product_name).first()
               item_and_iamge.append({
               "quantity": item.quantity,
                "product_name": item.product_name,
                "image":f"http://127.0.1:8000/{product.image1}"
                    
               })
               
          
          order_details.append({
               "order":order,
                "shipping":shipping_details,
                "items":item_and_iamge
          })
     
     return order_details
          
          
@admin_app.get("/order/{id}")
def orders_details(request:Request,db: Session = Depends(get_db)):
     id = request.path_params["id"]
     
     item_and_iamge=[]
     
     order = db.query(Order).filter(Order.id ==id).first()
     shipping_details = db.query(Shipping).filter(Shipping.order_number == order.order_number).first()
     items = db.query(OrderItem).filter(OrderItem.order_number==order.order_number).all()
     for item in items:
               product = db.query(Product).filter(Product.name == item.product_name).first()
               item_and_iamge.append({
               "quantity": item.quantity,
                "product_name": item.product_name,
                "image":f"http://127.0.1:8000/{product.image1}"
                    
               })
               
          
     order_details={
               "order":order,
                "shipping":shipping_details,
                "items":item_and_iamge
          }
     
     return order_details


@admin_app.get("/avaiable_products/")
def avaiable(db: Session = Depends(get_db)):
     avaiable= db.query(Product).filter(Product.published == True).all()
     return len(avaiable)





@admin_app.get("/daily_revenue/")
def daily(db: Session = Depends(get_db)):
     orders= db.query(Order).all()
     date_string = "2023-02-10"
     

     
     data={}
     
     for order in orders:
          date_time = str(order.date_created)
          day= date_time[0:10]
          date_obj = datetime.datetime.strptime(day, "%Y-%m-%d")
          formatted_date = date_obj.strftime("%b-%d-%Y")
          
          if day in data:
               data[formatted_date] += order.total_cost
          else:
               data[formatted_date] = order.total_cost
     
     return { "labels":list(data.keys()),
              "data": list(data.values())
          
     }


     
@admin_app.get("/week_revenue/")
def weekly(db: Session = Depends(get_db)):
     orders= db.query(Order).all()
     
     data={}
     
     for order in orders:
          date_tiem = str(order.date_created)
          day= date_tiem[8:10]
          if day in data:
               data[day] += order.total_cost
          else:
               data[day] = order.total_cost
     
     return data


@admin_app.get("/daily_best_seller/")
def daily_seller(db: Session= Depends(get_db)):
     selling={}
     final=[]
     
     orders_items =db.query(OrderItem).all()
     for order_item in orders_items:
          if order_item.product_name in selling:
               selling[order_item.product_name] += order_item.quantity
          else:
               selling[order_item.product_name] = order_item.quantity
     
     sorted_dict = dict(sorted(selling.items(), key=lambda item: item[1], reverse=True))
     first_five = dict(list(sorted_dict.items())[:5])
     for key, value in first_five.items():
          product = db.query(Product).filter(Product.name== key).first()
          final.append( {"image":f'http://127.0.0.1:8000/{product.image1}',
            "name": key,
            "amount": round(product.price * value,2),
             "orders": value,
             "stock": product.quantity,
             "price": product.price
           
           })
     return final
               
     
   
     
     