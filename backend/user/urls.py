from django.urls import path 
from . import views

urlpatterns = [
    path('signup/' , views.Signup , name='Signup'),
    path('login/' , views.Login , name='Login'),
    path('verify-email/<uuid:token>/' , views.VerifyEmail , name='Verify Email')
]
