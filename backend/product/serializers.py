from rest_framework import serializers
from .models import Shirt , Image , Size

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Size
        fields="__all__"

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=Image
        fields="__all__"

class ShirtSerializer(serializers.ModelSerializer):
    sizes=SizeSerializer(many=True)
    images=ImageSerializer(many=True)

    class Meta:
        model=Shirt
        fields="__all__"