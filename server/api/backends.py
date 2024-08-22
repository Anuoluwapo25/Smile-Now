from django.contrib.auth.backends import ModelBackend
from .models import CustomerUser, Doctor
from django.contrib.auth import authenticate
from django.contrib.auth.backends import BaseBackend

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = CustomerUser.objects.get(email=username)
        except CustomerUser.DoesNotExist:
            return None

        if user.check_password(password):
            return user

        return None

def authenticate_email(request, email=None, password=None):
    try:
        user = CustomerUser.objects.get(email=email)
        return authenticate(request, username=user.username, password=password)
    except CustomerUser.DoesNotExist:
        return None


class EmailBackend(BaseBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = CustomerUser.objects.get(email=email)
        except CustomerUser.DoesNotExist:
            return None

        if user.check_password(password):
            return user
        
        return None

    def get_user(self, user_id):
        try:
            return CustomerUser.objects.get(pk=user_id)
        except CustomerUser.DoesNotExist:
            return None

# class DoctorAuthBackend(ModelBackend):
#     def authenticate(self, request, username=None, password=None, **kwargs):
#         try:
#             doctor = Doctor.objects.get(user__email=username)
#             if doctor.user.check_password(password):
#                 return doctor.user
#         except Doctor.DoesNotExist:
#             return None

#     def get_user(self, user_id):
#         try:
#             return CustomerUser.objects.get(pk=user_id)
#         except CustomerUser.DoesNotExist:
#             return None