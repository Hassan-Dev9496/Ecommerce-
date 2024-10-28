import uuid
from django.shortcuts import render
from .models import User 
from rest_framework.response import Response
from rest_framework import status 
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import check_password , make_password
from django.contrib.auth import authenticate


@api_view(['POST'])
def Signup(request):
        email = request.data.get('email')
        if User.objects.filter(email=email, is_verified=True).exists():
            return Response({'message': "Email is already registered"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            verification_url = f"http://localhost:3000/verify-email/{user.verification_token}/"
            send_mail(
                'Verify your email',
                f'Click the link to verify your email: {verification_url}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
            return Response(
                {"message": "Email is Registered Successfully. Please verify your email", 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def VerifyEmail(request, token):
    try:
        user = User.objects.get(verification_token=token)
        user.is_verified = True
        user.verification_token = None
        user.save()
        return Response({"message": "Email verified successfully"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "Invalid verification token"}, status=status.HTTP_400_BAD_REQUEST)
    

    
@api_view(['POST'])
def Login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Using `authenticate` for email and password
    user = authenticate(request, username=email, password=password)

    if user is not None:
        if not user.is_verified:
            return Response({"error": "User is not verified"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Login Succeed', 'user': UserSerializer(user).data}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def VerifyPassowordEmail(request):
    email=request.data.get('email')
    user_exist = User.objects.filter(email=email , is_verified=True).exists()
    user = User.objects.get(email = email)
    if not user_exist:
        return Response({'error':'User does not exist'} , status=status.HTTP_400_BAD_REQUEST)
    
    user.password_reset_token = uuid.uuid4()
    user.save()

    reset_url = f"http://localhost:3000/reset-password/{user.password_reset_token}/"
    send_mail(
        'Reset your password',
        f'Click the link to reset your password: {reset_url}',
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )
    return Response({'message': 'Password reset link has been sent to your email.'}, status=status.HTTP_200_OK)


@api_view(['GET'])

def VerifyPasswordResetToken(request, reset_token):
    try:
        user = User.objects.get(password_reset_token=reset_token)
        return Response({"message": "Token is valid, You can change your password now!"}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])

def ChangePassword(request):
    new_password = request.data.get('new_password')
    token=request.data.get('token')
    try:
        user = User.objects.get(password_reset_token=token)
        
    except User.DoesNotExist:
        return Response({'error': 'Invalid or expired token' }, status=status.HTTP_400_BAD_REQUEST)

    user.password = make_password(new_password)
    user.password_reset_token = None
    user.save()
    
    return Response({'message': 'Password has been changed successfully', 'user':UserSerializer(user).data}, status=status.HTTP_200_OK)






    






