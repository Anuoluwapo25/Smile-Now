from django.contrib.auth.backends import ModelBackend
from .models import CustomerUser, Doctor

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = CustomerUser.objects.get(email=username)
        except CustomerUser.DoesNotExist:
            return None

        if user.check_password(password):
            return user

        return None
    

class DoctorAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            doctor = Doctor.objects.get(user__email=username)
            if doctor.user.check_password(password):
                return doctor.user
        except Doctor.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return CustomerUser.objects.get(pk=user_id)
        except CustomerUser.DoesNotExist:
            return None