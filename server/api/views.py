from rest_framework import status, permissions, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.utils import timezone
from .models import CustomerUser, BookUser, Doctor
from .serializer import RegisterSerializer, LoginSerializer, CustomerUserSerializer, DoctorLoginSerializer, BookingSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


api_view(['GET'])
def home(request):
    return Response("Hello World")

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'user': CustomerUserSerializer(user).data,
                    'token': token.key
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        return Response({'message': 'Please use POST to register a new user'}, status=status.HTTP_200_OK)

# Login View
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    def get(self, request):
        return Response({'message': 'Please use POST to login'}, status=status.HTTP_200_OK)
    

class DoctorLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = DoctorLoginSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data.get('user')
            doctor = serializer.validated_data.get('doctor')

            # Generate or retrieve token for authenticated user
            token, created = Token.objects.get_or_create(user=user)

            return Response({
                'token': token.key,
                'user_id': user.id,
                'username': user.username,
                'email': user.email,
                'doctor_id': doctor.id,
                'specialization': doctor.specialization,
            })
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# class DoctorLoginView(APIView):
#     permission_classes = [AllowAny]  
#     serializer_class = DoctorLoginSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.validated_data['user']
#             doctor = serializer.validated_data['doctor']
#             token, created = Token.objects.get_or_create(user=user)

#             return Response({
#                 'token': token.key,
#                 'doctor_id': doctor.id,
#                 'email': user.email,
#                 'specialization': doctor.specialization,
#             }, status=status.HTTP_200_OK)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookingCreateView(APIView):
    def post(self, request):
        serializer = BookingSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_details(request):
#     user = request.user
#     user_data = {
#         'firstname': user.first_name,
#         'lastname': user.last_name,
#         'email': user.email
#     }
#     return Response(user_data)
