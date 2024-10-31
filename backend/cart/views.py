from django.shortcuts import render
from .models import Cart
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User 


@api_view(['POST'])
def CreateCart(request):
    user=request.user
    if user.is_authenticated:
        cart, created = Cart.objects.get_or_create(user=user)
        return Response({ 'cart_id':cart.id  , 'message':'Cart is created'} , status=status.HTTP_200_OK)
    return Response({"error": "User not verified"}, status=status.HTTP_403_FORBIDDEN)
    


