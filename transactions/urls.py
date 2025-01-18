from django.urls import path

from transactions import views

app_name = 'transactions'

urlpatterns = [
    path('', views.transactions, name='transactions'),
    path('add/', views.add_transactions, name='add_transactions'),
]
