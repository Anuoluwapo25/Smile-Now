from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.utils import timezone
from .models import CustomerUser
from .serializer import RegisterSerializer, LoginSerializer, CustomerUserSerializer, DoctorAuthentication, DoctorLoginSerializer
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
    authentication_classes = [DoctorAuthentication]

    def post(self, request):
        serializer = DoctorLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({'token': token.key})

# @api_view(['POST'])
# def doctor_login(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     user = authenticate(username=username, password=password)
    
#     if user is not None:
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key}, status=status.HTTP_200_OK)
#     else:
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def doctor_dashboard(request, doctor_id):
#     try:
#         doctor = Doctor.objects.get(pk=doctor_id)
#     except Doctor.DoesNotExist:
#         return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

#     serializer = DoctorSerializer(doctor)
#     return Response(serializer.data)

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def booking(request):
#     if request.method == 'GET':
#         upcoming_bookings = Booking.objects.filter(
#             patient=request.user,
#             date__gte=timezone.now().date(),
#             status=True
#         ).order_by('date')
#         booking_serializer = BookingSerializer(upcoming_bookings, many=True)

#         services = Service.objects.all()
#         service_serializer = ServiceSerializer(services, many=True)

#         doctors = Doctor.objects.all()
#         doctor_serializer = DoctorSerializer(doctors, many=True)

#         return Response({
#             'appointments': booking_serializer.data,
#             'services': service_serializer.data,
#             'doctors': doctor_serializer.data,
#         })

#     elif request.method == 'POST':
#         serializer = BookingSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(patient=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
