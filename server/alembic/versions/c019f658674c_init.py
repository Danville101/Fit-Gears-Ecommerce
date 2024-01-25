"""init

Revision ID: c019f658674c
Revises: 
Create Date: 2023-02-19 05:28:27.179764

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c019f658674c'
down_revision = None
branch_labels = None
depends_on = None



def upgrade():
         
         
         
         op.create_table(
             'category',
             sa.Column('id', sa.Integer, primary_key=True),
             sa.Column("name", sa.String, nullable=False, unique=True),
             sa.Column("date_created", sa.DateTime, nullable=False),
            
             
         )

         
         
         
         
         op.create_table(
             'product',
             sa.Column('id', sa.Integer, primary_key=True),
             sa.Column("name", sa.String, nullable=False , unique=True),
             sa.Column("image1", sa.String, nullable=False),
             sa.Column("image2", sa.String, nullable=False),
             sa.Column("image3", sa.String, nullable=False),
             sa.Column("image4", sa.String, nullable=False),
             sa.Column("description", sa.String, nullable=False),
             sa.Column("price", sa.Numeric(10,2), nullable=False),
             sa.Column("quantity", sa.Integer, nullable=False),
             sa.Column("category_name", sa.String, nullable=False),
             sa.Column("date_created", sa.DateTime, nullable=False),
             sa.Column('published',  sa.Boolean , nullable=False),
             sa.ForeignKeyConstraint(["category_name"], ["category.name"],),
             
             
         )
          
         op.create_table(
             'user',
             sa.Column('id', sa.Integer, primary_key=True),
             sa.Column("user_name", sa.String, nullable=False ),
             sa.Column("password", sa.String, nullable=False),
             sa.Column("email", sa.String, nullable=False, unique=True),
             sa.Column("is_staff", sa.Boolean, nullable=False),
             sa.Column("date_created", sa.DateTime, nullable=False),
             
         )
         op.create_table(
             'order',
             sa.Column('id', sa.Integer, primary_key=True),
             sa.Column("costumer_email", sa.String, nullable=False),
             sa.Column("total_cost", sa.Numeric(10,2), nullable=False),
             sa.Column("status", sa.String, nullable=False),
             sa.Column("order_number", sa.Integer, nullable=False , unique=True),
             sa.Column("date_created", sa.DateTime, nullable=False),
             sa.ForeignKeyConstraint(["costumer_email"], ["user.email"],),
               
         )
              
    
         op.create_table(
             'order_items',
             sa.Column('id', sa.Integer, primary_key=True),
             sa.Column("price", sa.Integer, nullable=False),
             sa.Column("quantity", sa.Integer, nullable=False),
             sa.Column("order_number", sa.Integer, nullable=False),
             sa.Column("product_name", sa.String, nullable=False),
             sa.Column("date_created", sa.DateTime, nullable=False),
             sa.ForeignKeyConstraint(["order_number"], ["order.order_number"],),
             sa.ForeignKeyConstraint(["product_name"], ["product.name"],)
             
         )


        
         
         
    
       
         op.create_table(
             'shipping',
             sa.Column('id', sa.Integer, primary_key=True),
             sa.Column("first_name", sa.String, nullable=False),
             sa.Column("last_name", sa.String, nullable=False),
             sa.Column("email", sa.String, nullable=False),
             sa.Column("address_line1", sa.String, nullable=False),
             sa.Column("address_line2", sa.String, nullable=False),
             sa.Column("city", sa.String, nullable=False),
             sa.Column("country_state", sa.String, nullable=False),
             sa.Column("postcode_zipcode", sa.String, nullable=False),
             sa.Column("phone", sa.String, nullable=False),
             sa.Column("order_number", sa.Integer, nullable=False),
             sa.Column("date_created", sa.DateTime, nullable=False),
             sa.ForeignKeyConstraint(["order_number"], ["order.order_number"],),
         )
         
         
         
         
          
         op.create_table(
             'cart',
             sa.Column('id', sa.Integer, primary_key=True),
             sa.Column('costumer_email', sa.String, nullable=True),
             sa.Column("user_agent", sa.String, nullable=True),
             sa.Column("date_created", sa.DateTime, nullable=False),
             sa.ForeignKeyConstraint(["costumer_email"], ["user.email"],),
    
             
         )
         op.create_table(
             'cart_items',
             sa.Column('id', sa.Integer, primary_key=True),
             sa.Column("price", sa.Integer, nullable=False),
             sa.Column("quantity", sa.Integer, nullable=False),
             sa.Column("cart_number", sa.Integer, nullable=False),
             sa.Column("product_name", sa.String, nullable=False),
             sa.Column("date_created", sa.DateTime, nullable=False),
             sa.ForeignKeyConstraint(["cart_number"], ["cart.id"],),
             sa.ForeignKeyConstraint(["product_name"], ["product.name"],)
             
         )




def downgrade():
    op.drop_table("product")
    op.drop_table('category')
    op.drop_table("user")

    op.drop_table("order")
    op.drop_table('order_items')
    op.drop_table("shipping")
    op.drop_table("order")
    op.drop_table("cart")
    op.drop_table("cart_items")
    