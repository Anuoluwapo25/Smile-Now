from django.contrib import admin
from .models import CustomerUser, BookUser

# Register your models here
admin.site.register(CustomerUser)
admin.site.register(BookUser)
# admin.site.register(Patient)
# admin.site.register(Service)
# admin.site.register(Booking)
