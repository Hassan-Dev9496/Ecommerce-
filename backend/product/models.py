from django.db import models

class Shirt(models.Model):
    title = models.CharField(max_length=255)
    actual_prize = models.DecimalField(max_digits=10, decimal_places=2)
    sale_prize = models.DecimalField(max_digits=10, decimal_places=2)
    category=models.CharField(max_length=50)

class Size(models.Model):
    shirt = models.ForeignKey(Shirt, related_name='sizes', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    quantity = models.IntegerField()

class Image(models.Model):
    shirt = models.ForeignKey(Shirt, related_name='images', on_delete=models.CASCADE)
    img = models.ImageField(upload_to='images/')
