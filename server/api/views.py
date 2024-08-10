from django.shortcuts import render
from rest_framework.decorators import api_view
from api.serializer import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
# Create your views here.

@api_view(['GET'])
def home(request):
    return Response("Hello World")

@api_view(['POST'])
def register(request):
    data = request.data
    serializer = RegisterSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg":"user created successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    data = request.data
    user = authenticate(username=data.get('username'), password=data.get('password'))
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"msg":"user logged in","token":token.key}, status=status.HTTP_200_OK)
    return Response({"msg":"Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)