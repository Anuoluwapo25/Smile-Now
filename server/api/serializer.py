from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import CustomerUser, Doctor


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


class DoctorAuthentication(BaseAuthentication):
    def authenticate(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            doctor = Doctor.objects.get(user__email=email)
            if doctor.user.check_password(password):
                return (doctor.user, None)
        except Doctor.DoesNotExist:
            raise AuthenticationFailed('Invalid email or password')

    def get_user(self, user_id):
        try:
            return CustomerUser.objects.get(pk=user_id)
        except CustomerUser.DoesNotExist:
            return None
        
# class DoctorLoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField(write_only=True)

#     def validate(self, attrs):
#         email = attrs.get('email')
#         password = attrs.get('password')

#         try:
#             doctor = Doctor.objects.get(user__email=email)
#             user = doctor.user
#             if user.check_password(password):
#                 attrs['user'] = user
#                 return attrs
#             else:
#                 raise serializers.ValidationError('Invalid email or password')
#         except Doctor.DoesNotExist:
#             raise serializers.ValidationError('Invalid email or password')
        
class DoctorLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'specialization', 'availability']


# class BookingSerializer(serializers.ModelSerializer):
#     doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())
#     service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
#     patient = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

#     class Meta:
#         model = Booking
#         fields = ['id', 'doctor', 'service', 'patient', 'date', 'status']

#     def create(self, validated_data):
#         return Booking.objects.create(**validated_data)
