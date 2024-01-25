"""init

Revision ID: ee54f3e0e1aa
Revises: 
Create Date: 2023-01-28 06:55:23.180880

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ee54f3e0e1aa'
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
             sa.Column("name", sa.String, nullable=False, unique=True),
             sa.Column("image1", sa.String, nullable=False),
             sa.Column("image2", sa.String, nullable=False),
             sa.Column("image3", sa.String, nullable=False),
             sa.Column("image4", sa.String, nullable=False),
             sa.Column("description", sa.String, nullable=False),
             sa.Column("price", sa.Integer, nullable=False),
             sa.Column("quantity", sa.Integer, nullable=False),
             sa.Column("category_name", sa.String, nullable=False),
             sa.Column("date_created", sa.DateTime, nullable=False),
             sa.ForeignKeyConstraint(["category_name"], ["category.name"],),
             
             
         )
          
         op.create_table(
             'user',
             sa.Column('id', sa.Integer, primary_key=True),
             sa.Column("user_name", sa.String, nullable=False),
             sa.Column("password", sa.String, nullable=False),
             sa.Column("email", sa.String, nullable=False, unique=True),
             sa.Column("is_staff", sa.Boolean, nullable=False),
             sa.Column("date_created", sa.DateTime, nullable=False),
             
         )
          
              
         op.create_table(
             'order',
             sa.Column('id', sa.Integer, primary_key=True),
             sa.Column("costumer_email", sa.String, nullable=False),
             sa.Column("total_cost", sa.Integer, nullable=False),
             sa.Column("is_paid", sa.Boolean, nullable=False),
             sa.Column("order_number", sa.Integer, nullable=False, unique=True),
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
             sa.Column("address", sa.String, nullable=False),
             sa.Column("zipcode", sa.String, nullable=False),
             sa.Column("place", sa.String, nullable=False),
             sa.Column("phone", sa.Integer, nullable=False),
             sa.Column("order_number", sa.Integer, nullable=False),
             sa.Column("date_created", sa.DateTime, nullable=False),
             sa.ForeignKeyConstraint(["order_number"], ["order.order_number"],),
         )
          
     


def downgrade():
    op.drop_table("product")
    op.drop_table('category')
    op.drop_table("user")

    op.drop_table("order")
    op.drop_table('order_items')
    op.drop_table("shipping")
