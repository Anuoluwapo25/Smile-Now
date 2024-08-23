from rest_framework import serializers
from django.contrib.auth import authenticate
# from rest_framework.authentication import BaseAuthentication
# from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import CustomerUser, Doctor, BookUser


class CustomerUserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=255, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError({'error': 'Invalid credentials'})

        token, created = Token.objects.get_or_create(user=user)
        return {'token': token.key}


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = CustomerUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        return user

    def validate_email(self, value):
        if CustomerUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        if CustomerUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value


# class DoctorAuthentication(BaseAuthentication):
#     def authenticate(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')

#         try:
#             doctor = Doctor.objects.get(user__email=email)
#             if doctor.user.check_password(password):
#                 return (doctor.user, None)
#         except Doctor.DoesNotExist:
#             raise AuthenticationFailed('Invalid email or password')

#     def get_user(self, user_id):
#         try:
#             return CustomerUser.objects.get(pk=user_id)
#         except CustomerUser.DoesNotExist:
#             return None
        
class DoctorLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        print(email, password)

        if email and password:
            user = authenticate(request=None, email=email, password=password)

            print(user)
            if user:
                try:
                    doctor = Doctor.objects.get(user=user)
                    data['user'] = user
                    data['doctor'] = doctor
                except Doctor.DoesNotExist:
                    raise serializers.ValidationError("This user is not a registered doctor.")
            else:
                raise serializers.ValidationError("Invalid email or password provided.")
        else:
            raise serializers.ValidationError("Both 'email' and 'password' must be provided.")

        return data
    
    
# class BookingSerializer(serializers.Serializer):
#     doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())
#     service = serializers.CharField(max_length=255)
#     date = serializers.DateField()
#     status = serializers.CharField(max_length=20, default='pending')

#     def create(self, validated_data):
#         request = self.context.get('request')
#         patient = request.user

#         return BookUser.objects.create(
#             patient=patient,
#             **validated_data
#         )


# class BookingSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     doctor = serializers.CharField(max_length=100)
#     service = serializers.CharField(max_length=100)
#     date = serializers.DateField()
#     time = serializers.TimeField()
#     name = serializers.PrimaryKeyRelatedField(read_only=True)

#     def create(self, validated_data):
#         return BookUser.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         instance.doctor = validated_data.get('doctor', instance.doctor)
#         instance.service = validated_data.get('service', instance.service)
#         instance.date = validated_data.get('date', instance.date)
#         instance.time = validated_data.get('time', instance.time)
#         instance.save()
#         return instance

class BookingSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    service = serializers.CharField(max_length=255)
    doctor = serializers.CharField(max_length=255)
    name = serializers.PrimaryKeyRelatedField(queryset=CustomerUser.objects.all()) 
    time = serializers.TimeField()
    date = serializers.DateField()
    is_completed = serializers.BooleanField(default=False)

    def create(self, validated_data):
        book = BookUser.objects.create(
            name=validated_data['name'],
            service=validated_data['service'],
            doctor=validated_data['doctor'],
            time=validated_data['time'],
            date=validated_data['date'],
            is_completed=validated_data.get('is_completed', False)
        )
        return book
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.service = validated_data.get('service', instance.service)
        instance.doctor = validated_data.get('doctor', instance.doctor)
        instance.time = validated_data.get('time', instance.time)
        instance.date = validated_data.get('date', instance.date)
        instance.is_completed = validated_data.get('is_completed', instance.is_completed)
        instance.save()
        return instance


class AvailabilityCheckSerializer(serializers.Serializer):
    doctor = serializers.CharField()
    date = serializers.DateField()
    time = serializers.TimeField()