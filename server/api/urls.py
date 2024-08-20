from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('booking/', views.booking, name='booking'),
    path('user/details/', views.user_details, name='user-details'),
]
