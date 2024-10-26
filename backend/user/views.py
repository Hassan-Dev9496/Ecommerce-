from django.shortcuts import render
from .models import User 
from rest_framework.response import Response
from rest_framework import status 
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import check_password , make_password


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

    try:
        user = User.objects.get(email=email)
        print(user , "user")
        print("Stored password (hashed):", user.password)
        print("Check password result with actual password:", check_password(password, user.password))  # Check with the input password
    except User.DoesNotExist:
        return Response({"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    if not user.is_verified:
        return Response({"error": "User is not verified"}, status=status.HTTP_400_BAD_REQUEST)

    if check_password(password, user.password):
        return Response({'message': 'Login Succeed', 'user': UserSerializer(user).data}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
    
