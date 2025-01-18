from django.contrib import admin
from transactions.models import Transactions, Payment, TypeTransactions

# Register your models here.


admin.site.register(Transactions)
admin.site.register(Payment)
admin.site.register(TypeTransactions)