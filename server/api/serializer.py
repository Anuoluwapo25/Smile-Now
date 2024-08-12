from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, obj):
        if User.objects.filter(email=obj.get('email')).exists():
            raise serializers.ValidationError("Email already exists")
        if User.objects.filter(username=obj.get('username')).exists():
            raise serializers.ValidationError("Username already exists")
        return obj
        
    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'], 
                            email=validated_data['email'],
                            # first_name=validated_data['first_name'],
                            # last_name=validated_data['last_name']
                            )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()