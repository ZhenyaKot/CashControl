from django.urls import path
from home import views

app_name = 'home'

urlpatterns = [
    path('', views.facial, name='facial'),
    path('categories/', views.categories, name='categories'),
]
