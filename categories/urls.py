from django.urls import path

from categories import views

app_name = 'categories'

urlpatterns = [
    path('', views.categories, name='categories'),
    path('add/', views.add_category, name='add_category')
]
