from django.urls import path 
from . import views

urlpatterns = [
    path('signup/' , views.Signup , name='Signup'),
    path('login/' , views.Login , name='Login'),
    path('verify-email/<uuid:token>/' , views.VerifyEmail , name='Verify Email'),
    path('verify-password-email/' , views.VerifyPassowordEmail , name='Verify Email'),
    path('verify-password-token/<uuid:reset_token>/' , views.VerifyPasswordResetToken , name="Password Tokken" ),
    path('change-password/' , views.ChangePassword , name="Change Password")

]

