from django.urls import path
from home import views

app_name = 'home'

urlpatterns = [
    path('', views.facial, name='facial'),
    path('profile/', views.profile, name='profile'),
    path('reports/', views.reports, name='reports'),
]
