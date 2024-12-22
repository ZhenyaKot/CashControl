from django.urls import path

from categories import views

app_name = 'categories'

urlpatterns = [
    path('', views.categories, name='categories'),
    path('add/', views.add_category, name='add_category'),
    path('edit/<int:id_category>/', views.edit_category, name='edit_category'),
    path('deleted/<int:id_category>/', views.deleted_category, name='deleted_category')
]
