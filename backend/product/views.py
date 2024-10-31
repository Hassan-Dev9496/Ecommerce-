from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Shirt 
from .serializers import ShirtSerializer
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])

def GetProducts(request):
    category=request.query_params.get('category' , None)
    if category:
        products= Shirt.objects.filter(category = category)
    else:
        products=Shirt.objects.all()
    
    serializer = ShirtSerializer(products , many=True)
    return Response(data=serializer.data)


@api_view(['GET'])
def GetSingleProduct(request):
    paramtitle = request.query_params.get('title')
    adjusted_title = paramtitle.replace("-", " ")
    try:
        product = Shirt.objects.get(title=adjusted_title)
        serializer = ShirtSerializer(product)
        return Response(data=serializer.data)
    except Shirt.DoesNotExist:
        return Response({"error": "Product not found"} , status=status.HTTP_400_BAD_REQUEST)