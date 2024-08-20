from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Doctor, Service, Booking

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Doctor, Service, Booking


class RegisterSerializer(serializers.Serializer):

    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, obj):
        if User.objects.filter(email=obj.get('email')).exists():
            raise serializers.ValidationError("Email already exists")
        if User.objects.filter(email=obj.get('username')).exists():
            raise serializers.ValidationError("username already exists")
        return obj
        
    def create(self, validated_data):
        user = User.objects.create(
                            username= validated_data['username'],
                            email=validated_data['email'],
                            first_name=validated_data['first_name'],
                            last_name=validated_data['last_name']
                            )
        user.set_password(validated_data['password'])
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'specialization', 'availability']

class DoctorLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'description']

class BookingSerializer(serializers.ModelSerializer):
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())
    service = serializers.PrimaryKeyRelatedField(queryset=Service.objects.all())
    patient = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Booking
        fields = ['id', 'doctor', 'service', 'patient', 'date', 'status']

    def create(self, validated_data):
        return Booking.objects.create(**validated_data)
