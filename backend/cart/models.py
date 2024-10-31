from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Cart(models.Model):
    user=models.OneToOneField(User , on_delete=models.CASCADE , null=True , blank=True)
    created_at = models.DateTimeField(default=timezone.now)

class CartItem(models.Model):
    cart=models.ForeignKey(Cart , on_delete=models.CASCADE , related_name='item')
    product_id=models.IntegerField()    
    size=models.CharField(max_length=100)
    quantity=models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
