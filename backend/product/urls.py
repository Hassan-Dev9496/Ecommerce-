

from django.urls import path
from .views import GetProducts , GetSingleProduct

urlpatterns = [
    path('products/', GetProducts, name='product-list'),
    path('get-single-product/' , GetSingleProduct , name='get single product' )
] 
