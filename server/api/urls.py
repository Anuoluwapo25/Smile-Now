from django.urls import path
from . import views
from .views import RegisterView, LoginView, DoctorLoginView, BookingCreateView


urlpatterns = [
    path('', views.home, name='home'),
    path('register/',  RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('booking/', BookingCreateView.as_view(), name='booking'),
    path('doctor/login/', DoctorLoginView.as_view(), name='doctor-login'),
    # path('doctor/<int:doctor_id>/', views.doctor_dashboard, name='doctor-dashboard'),
    # path('user/details/', views.user_details, name='user-details'),
]
