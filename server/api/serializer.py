from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient, Doctor, Service, Booking


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


class BookingSerializer(serializers.Serializer):
    doctor = serializers.CharField(max_length=100)
    service = serializers.CharField(max_length=100)
    date = serializers.DateField()
    status = serializers.BooleanField(default=True)
    
    
    def create(self, validated_data):
        user = self.context['request'].user
        patient, created = Patient.objects.get_or_create(user=user)

        doctor_name = validated_data.get('doctor')
        service_name = validated_data.get('service')

      
        doctor, _ = doctor.objects.get_or_create(user__username=doctor_name)
        service, _ = service.objects.get_or_create(name=service_name)

        
        booking = Booking.objects.create(
            doctor=doctor,
            patient=patient,
            service=service,
            date=validated_data['date'],
            status=validated_data['status']
        )
        return booking