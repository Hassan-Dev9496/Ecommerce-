from django.db import models
from django.contrib.auth.hashers import make_password , is_password_usable
from uuid import uuid4

class User(models.Model):
    name=models.CharField(max_length=250)
    email=models.EmailField(unique=True)
    password=models.TextField()
    is_verified=models.BooleanField(default=False)
    verification_token=models.UUIDField(default=uuid4 , editable=False , null=True)

    def save(self, *args , **kwargs):
        if self.password:
            self.password = make_password(self.password)
        super().save(*args , **kwargs)