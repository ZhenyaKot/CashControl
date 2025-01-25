from django.urls import path

from transactions import views

app_name = 'transactions'

urlpatterns = [
    path('', views.transactions, name='transactions'),
    path('add/', views.add_transactions, name='add_transactions'),
    # path('sort-transactions/', views.sort_transactions, name='sort_transactions'),
    path('deleted-transactions/<int:transactions_id>/', views.deleted_transactions, name='deleted_transactions'),
    path('get-dates-for-period/', views.get_dates_for_period, name='get_dates_for_period'),
    path('filter-sort-transactions/', views.filter_sort_transactions, name='filter_sort_transactions'),
]
