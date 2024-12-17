from django.urls import path
from home import views

app_name = 'home'

urlpatterns = [
    path('', views.facial, name='facial'),
    path('categories/', views.categories, name='categories'),
    path('transactions/', views.transactions, name='transactions'),
    path('profile/', views.profile, name='profile'),
    path('reports/', views.reports, name='reports'),
]
