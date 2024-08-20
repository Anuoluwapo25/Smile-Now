from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('booking/', views.booking, name='booking'),
    path('doctor/login/', views.doctor_login, name='doctor-login'),
    path('doctor/<int:doctor_id>/', views.doctor_dashboard, name='doctor-dashboard'),
    path('user/details/', views.user_details, name='user-details'),
]
