from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Shirt 
from .serializers import ShirtSerializer
from rest_framework.response import Response

@api_view(['GET'])

def GetProducts(request):
    category=request.query_params.get('category' , None)
    if category:
        products= Shirt.objects.filter(category = category)
    else:
        products=Shirt.objects.all()
    
    serializer = ShirtSerializer(products , many=True)
    return Response(data=serializer.data)
