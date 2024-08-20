# from django.db import models
# from django.contrib.auth.models import User

# class Service(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name

# class Doctor(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     # speciality = models.ForeignKey(Service, on_delete=models.CASCADE)
#     # availability = models.DateTimeField()

#     def __str__(self):
#         return self.user.username

# class Patient(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.user.username

# class Booking(models.Model):
#     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
#     patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
#     date = models.DateField()
#     service = models.ForeignKey(Service, on_delete=models.CASCADE)
#     status = models.BooleanField(default=True)

#     def __str__(self):
#         return f"{self.doctor.user.first_name} - {self.patient.user.first_name} on {self.date}"

from django.db import models
from django.conf import settings
import datetime

class Doctor(models.Model):
    name = models.CharField(max_length=255, default='Uknowny')
    specialization = models.CharField(max_length=255, default='unknown')
    availability = models.DateField(default=datetime.date.today)

    def __str__(self):
        return self.name

class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Booking(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    # patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    date = models.DateField(datetime.date.today)
    status = models.BooleanField(default=True)

    def __str__(self):
        return f'Booking by {self.patient} with {self.doctor} on {self.date}'
