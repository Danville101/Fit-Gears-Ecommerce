from fastapi import FastAPI, Depends, HTTPException, Response, File , Form, UploadFile, Request, Header
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from app.schema.user_schema import CreateUserRequest, LoginResquest, ResetPasswordRequest
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user_model import User
from app.models.order_model import Order ,Shipping, OrderItem, Cart, CartItem
from app.schema.order_schema import CreateCheckoutRequest, CreateCartRequest, UpdateItemRequest
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
from app.services.recommendation import get_recommendation
import os

from app.routers.admin import admin_app

costumer_app = FastAPI(debug=True)


env= Environment(loader=PackageLoader('app', 'templates') )

stripe.api_key="sk_test_51Lij1LKl07rHxPLvCex6bW4vc1YdGCGyAuSzL6qWlJMLmuNMx0DgiP1w9W4uxMy89WXlsdgARHTzBHoTOJHnx9jw00PwqDna31"






@costumer_app.post("/reset_password/")
async def rest(req: ResetPasswordRequest,db: Session = Depends(get_db)):
     user = db.query(User).filter(User.email == req.email).first()
     if not user:
          raise HTTPException(status_code=40, detail="Email dont exist")
     else:
       template =env.get_template('resetpaassword.html')
       template_data = {'user_name': user.user_name}
       htm_content = template.render(template_data)
       msg=MIMEMultipart()
       msg["From"] = 'danville.wilks@gmail.com'
       msg["To"] = req.email
       msg["Subject"]= "Reset password"
       msg.attach(MIMEText(htm_content, "html"))
       
       
       server = smtplib.SMTP('smtp.gmail.com', 587)
       server.starttls()
       server.login('danville.wilks@gmail.com', 'mhgrlqtjnkzfpqjl')
       server.sendmail(msg['From'], msg['To'], msg.as_string())
       server.quit()




@costumer_app.post("/cart/")
async def cart(request: Request,cartReq: CreateCartRequest ,db: Session = Depends(get_db)):
     user_agent = request.headers.get('User-Agent')
     item_incart = False
     
     
     #if not user
    
     cart = db.query(Cart).filter(Cart.user_agent==user_agent).first()
     
     
     if not cart:
          
         new_cart =  Cart(
               user_agent= user_agent
          )
     
         db.add(new_cart)
         db.commit()

         
         new_item = CartItem(
        product_name=  cartReq.product_name,
       price=   cartReq.price,
      cart_number= new_cart.id,
        quantity=  cartReq.quantity
     ) 
         db.add(new_item)
         db.commit()
     
     if cart:
          
             exist_cart= db.query(CartItem).filter(CartItem.cart_number == cart.id).all()
             for item in exist_cart:
                  if item.product_name == cartReq.product_name:
                       item_incart = True
                       
          
                       item.quantity = cartReq.quantity  + item.quantity                                      
                       db.commit()
                       
     if item_incart == False:
          new_item1 = CartItem(
       product_name=  cartReq.product_name,
      price=   cartReq.price,
     cart_number= cart.id,
       quantity=  cartReq.quantity
    )  
          db.add(new_item1)
          db.commit()
          
     return cart
    
         
@costumer_app.put("/cart/{id}")
async def remove_item(request: Request, req: UpdateItemRequest ,db: Session = Depends(get_db)):
     id = request.path_params["id"]
     user_agent = request.headers.get('User-Agent')
     cart= db.query(Cart).filter(Cart.user_agent == user_agent).first()
     items = db.query(CartItem).filter(CartItem.cart_number == cart.id).all()
     
     for item in items:
          if item.id == int(id):
               if req.increment_decrement:
                    item.quantity = item.quantity + req.increment_decrement
                    print("this",item)
                    db.commit()
               if req.amount:
                    item.quantity = req.amount
                    db.commit()   
               if item.quantity <= 0:
                    db.delete(item)
                    db.commit()




@costumer_app.delete("/cart/{id}")
async def remove_item(request: Request ,db: Session = Depends(get_db)):
     id = request.path_params["id"]
     user_agent = request.headers.get('User-Agent')
     cart= db.query(Cart).filter(Cart.user_agent == user_agent).first()
     items = db.query(CartItem).filter(CartItem.cart_number == cart.id).all()
     
     for item in items:
          if item.id == int(id):
                    db.delete(item)
                    db.commit()



        
     
     

@costumer_app.get("/cart/")
async def get_cart(request: Request,db: Session = Depends(get_db)):
     try:
       user_agent = request.headers.get('User-Agent')
       client_ip = request.client.host
       amount = 0
       total=0
       
       print("IP",client_ip)
       
       
       print(user_agent)
       
       item_with_image=[]
       to_send_data=[]
      
       cart= db.query(Cart).filter(Cart.user_agent == user_agent).first()
       if cart:
          items = db.query(CartItem).filter(CartItem.cart_number== cart.id).all()
          for item in items:
                to_send_data.append({
                     "price": item.price,
                     "product": item.product_name,
                     "quantity":item.quantity
                     
                })
          
          
          for item in items:
               product= db.query(Product).filter(Product.name == item.product_name).first()
               item_with_image.append({
                    "item": item,
                    "image":product.image1,
                    "product_id":product.id
               })
               
               amount += item.quantity
               subtotal = item.price * item.quantity
               total += subtotal
          print(amount)
          return {"amount":amount,
                "products": item_with_image,
                "total":total,
                "to_send_data":to_send_data
               
               
               }
       else:
          
            print(amount)
            return {"amount":amount}
          
        
        
     except Exception as e:
         print(e)
   
     
     



@costumer_app.get("/product/{id}")
async def item( req: Request, db: Session = Depends(get_db)):
     
      id = req.path_params["id"]
      
      product = db.query(Product).filter(Product.id== id).first()
      image_name = str(product.image1)[6:]
      
      rec=get_recommendation(image_name)
      items=[]
      for names in rec:
          names1=f"media/{names}"
          product_name = db.query(Product).filter(Product.image1 ==names1).first()
          items.append(product_name)
      
      return {'product':product,
              "recommendation": items[1:6]
              }

@costumer_app.get("/categories/")
async def category(db: Session=Depends(get_db)):
     
     info=[]
     categories = db.query(Category).all()
     
     for category in  categories:
          product = db.query(Product).filter(Product.category_name== category.name).all()[21]
          data={
               "category": category.name,
                "image": product.image1
          }    
          
          info.append(data)
     
     
     return info
          
     

     
     
     
     
     
     
     
@costumer_app.post("/checkout/")
async def checkout( request:Request, req: CreateCheckoutRequest, db: Session = Depends(get_db)):
     
     user_agent = request.headers.get('User-Agent')
     latest = db.query(Order).order_by(desc(Order.date_created)).first()
     
     if latest == None:
          order_num=1
     else:
          order_num = latest.id +1
     
     total= 0
     
     for order_items in req.items:
          total += order_items.price * order_items.quantity 
     

     shippig_cost= round(total/100*1.2, 2)
     
     new_order=Order(
     
     costumer_email = "danvil@gmaihl.com",
     total_cost = round(total,2),
     status = "processing",
     order_number = order_num 
     )
     
     db.add(new_order)
     db.flush()
     db.commit()

     

     
     
     new_shipping= Shipping(
           first_name= req.first_name,
           last_name = req.last_name,
           email = req.email,
           address_line1 = req.address_line1,
           address_line2 = req.address_line2,
           country_state = req.country_state,
           postcode_zipcode= req.postcode_zipcode,
           city = req.city,
           phone = req.phone,
           order_number =order_num
           )
     db.add(new_shipping)
     db.commit()
    
     
     for order_item in req.items:
          new_order_item= OrderItem(
          price = order_item.price,
    quantity = order_item.quantity,
    order_number = order_num,
    product_name = order_item.product
          )
          
          db.add(new_order_item)
          db.commit()
     
     customer = stripe.Customer.create(
            description="danvil@gmaihl.com",
             )
        
     items = []
     
     for item in req.items:
        prodcut =db.query(Product).filter(Product.name== item.product).first()
        image = str(prodcut.image1).replace(" ","%20")
        prodcut.quantity = prodcut.quantity - item.quantity
        db.commit()
        
        data= {
           
      'price_data': {
        'currency': 'usd',
        'product_data': {
          'name': item.product,
          'images':[f'http://127.0.0.1:8000/{image}']
                
        },
        'unit_amount':int(item.price * 100) ,
      },
      'quantity': item.quantity,

  
      
    }
        print(f'http://127.0.0.1:8000/{image}')
         
        items.append(data)
          
     
     checkout_session = stripe.checkout.Session.create(
        customer=customer["id"],
        success_url=f"http://localhost:8000/success",
        cancel_url=f"http://localhost:8000/cancel",
        payment_method_types=["card"],
        mode="payment",
        line_items= items,
            metadata={
        "order_number": order_num,
        "subtotal":round(total,2),
         "shipping":shippig_cost,
         "total":round(total,2)+shippig_cost,
         "name": new_shipping.first_name+" "+ new_shipping.last_name,
                      "place":new_shipping.address_line1,
                      "postcode":new_shipping.postcode_zipcode,
                      "country": new_shipping.country_state,
                      "phone": new_shipping.phone
         
    },
    )
     
     cart = db.query(Cart).filter(Cart.user_agent == user_agent).first()
     db.delete(cart)
     db.commit()
     
     
     
       
  
     
     return RedirectResponse( checkout_session.url, status_code=303)






@costumer_app.post("/confirm/")
async def check(request: Request,  db:Session = Depends(get_db)):
     print(request.headers)
     
     payload = await request.body()
     event = None
     sig_header =  request.headers.get("stripe-signature") 
     endpoint_secret = 'whsec_kw2K3BwiRrsfAWAiQoIxVwwDMiNNH5Ly'
     
     customer_id = payload['data']['object']['customer']
     customer = stripe.Customer.retrieve(customer_id)
     
     print(customer)
     
     hook_secret="whsec_2b21c26bc7a2b1fa4c25be1bfc64c0bf210f2f1b8ea747acbf03dd2ea5cc7ca5"
     
 
 
     try:
           event = stripe.Webhook.construct_event(
             payload, sig_header,hook_secret
         )
           
           print(event)
     except ValueError as e:
         # Invalid payload
         return "Invalid payload", 400
     if event['type'] == 'checkout.session.completed':
         session = event.data.object
         metadata = session.metadata 
        
          
         order=db.query(Order).filter(Order.order_number == metadata.order_number).first()
         order.status="paid"
         db.commit()
      
      
         
        
         
         template =env.get_template('order_confirm.html')
         template_data = {"order_number":metadata.order_number ,'subtotal': metadata.subtotal, 'shipping': metadata.shipping, "total": metadata.total, 
                       "name": metadata.name,
                       "place":metadata.place,
                       "postcode":metadata.postcode,
                       "country": metadata.country,
                       "phone": metadata.phone
                       
                       }
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
         
  
         
  
     elif event['type'] == 'checkout.session.async_payment_failed' or event['type'] == "checkout.session.expired":
         session = event.data.object
         metadata = session.metadata 
         
         order = db.query(Order).filter(Order.order_number== metadata.order_number).first()
         order.status="failed"
         db.commit()
         order_items=db.query(OrderItem).filter(OrderItem.order_number== metadata.order_number).all()
         for items in order_items:
              product = db.query(Product).filter(Product.name== items.product).first()
              product.quantity = prodcut.quantity + item.quantity
              db.commit()
        
               
          
         print("Payment Failed")


     return "Success", 200



@costumer_app.post("/register/")
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
          raise HTTPException(status_code=40, detail="Password dont match")



@costumer_app.post("/login/")
async def login(req: LoginResquest, db:Session=Depends(get_db)):
     user =db.query(User).filter(User.email == req.email).first()
     if not user:
          raise HTTPException(status_code=400, detail="Email or Password incorrect" )
     
     if not verify_password(req.password, user.password):
          raise HTTPException(status_code=400,  detail="Email or Password incorrect")
     else:
        payload={
                  "email":user.email,
               
             }
             
        token= get_token(payload)
        response = JSONResponse("ok")
             
        response.set_cookie("token", token, httponly=True, secure=True, samesite="none" )
        print("wow")
        
        return response
        





#@app.get("/products/")
#async def products(db:Session=Depends(get_db)):
#     products = db.query(Product).order_by(Product.name).all()
#     
#     return products
     
     

@costumer_app.get("/category/")
async def category(db:Session=Depends(get_db)):
     
     category=  db.query(Category).all()
     
     return category


@costumer_app.get("/products/")
async def read_items(
    page: int = Query(4, description="The page number"),
    page_size: int = Query(36, description="The number of items per page"),
    search: str = Query(None, description="Search query"),
    category: str = Query(None, description="Category"),
    lowprice: str = Query(None, description="low price"),
    highprice: str = Query(None, description="high price"),
    db:Session=Depends(get_db)
):
    
    try:
      
           if search is not None:
               search_query= db.query(Product).order_by(asc(Product.name))
               search_result = search_query.filter(Product.name.ilike(f"%{search}%")).limit(36).offset(page_size-36).all()
               search_count = search_query.filter(Product.name.ilike(f"%{search}%")).count()
      
               return {"result":search_result,
                                    "count":search_count}
               
     
     
           elif category is not None:
               category_query = db.query(Product).order_by(asc(Product.name))

               category_result = category_query.filter(Product.category_name == category).limit(36).offset(page_size-36).all()
               category_count= category_query.filter(Product.category_name == category).count()
     
               return  {
                    "result":category_result,
                    "count":category_count
                    
               }
            
           elif lowprice is not None and highprice is not None :
               product_price_query= db.query(Product).order_by(asc(Product.name))
               product_price_result = product_price_query.filter(Product.price>lowprice).filter(Product.price<highprice).offset(page_size-36).limit(36).all()
               product_price_count =product_price_query.filter(Product.price>lowprice).filter(Product.price<highprice).count()

               return {"result":product_price_result,
                                             "count":product_price_count
                                           }
                 
           else:
              query = db.query(Product).order_by(asc(Product.name))
              query_count =   db.query(Product).order_by(asc(Product.name)).count()
   
              return  {"result": query.offset(page_size-36).limit(36).all(),
                                                                  "count":query_count}
        
    except Exception as e:
        print(e)
    
     
   








