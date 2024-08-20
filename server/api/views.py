from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import Doctor, Service, Booking
from .serializer import RegisterSerializer, LoginSerializer, DoctorSerializer, ServiceSerializer, BookingSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

@api_view(['GET'])
def home(request):
    return Response("Hello World")

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"msg": "User created successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    user = authenticate(username=email, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"msg": "User logged in", "token": token.key}, status=status.HTTP_200_OK)
    return Response({"msg": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def booking(request):
    if request.method == 'GET':
        upcoming_bookings = Booking.objects.filter(
            patient=request.user,
            date__gte=timezone.now().date(),
            status=True
        ).order_by('date')
        booking_serializer = BookingSerializer(upcoming_bookings, many=True)

        services = Service.objects.all()
        service_serializer = ServiceSerializer(services, many=True)

        doctors = Doctor.objects.all()
        doctor_serializer = DoctorSerializer(doctors, many=True)

        return Response({
            'appointments': booking_serializer.data,
            'services': service_serializer.data,
            'doctors': doctor_serializer.data,
        })

    elif request.method == 'POST':
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(patient=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    user = request.user
    user_data = {
        'firstname': user.first_name,
        'lastname': user.last_name,
        'email': user.email
    }
    return Response(user_data)
