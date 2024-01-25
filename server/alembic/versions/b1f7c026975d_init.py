"""init

Revision ID: b1f7c026975d
Revises: c019f658674c
Create Date: 2023-02-20 23:50:13.788882

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b1f7c026975d'
down_revision = 'c019f658674c'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_constraint('cart_items_cart_number_fkey', 'cart_items', type_='foreignkey')
    op.create_foreign_key('cart_items_cart_number_fkey', 'cart_items', 'cart', ['cart_number'], ['id'], ondelete='CASCADE')

def downgrade():
    op.drop_constraint('cart_items_cart_number_fkey', 'child', type_='foreignkey')
    op.create_foreign_key('cart_items_cart_number_fkey', 'cart_items', 'cart', ['cart_number'], ['id'])