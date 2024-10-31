from django.urls import path
from .views import CreateCart

urlpatterns = [
    path('create-cart/',CreateCart , name='Add To Cart'),
] 
