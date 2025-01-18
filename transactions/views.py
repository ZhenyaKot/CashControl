from datetime import date

from categories.models import Category
from django.contrib import messages
from django.db.models import Sum
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.urls import reverse
from transactions.models import Payment
from transactions.models import TypeTransactions, Transactions


# Create your views here.

def calculating_transactions_day(id_type_transactions):
    today_transactions = Transactions.objects.filter(type_transactions_id=id_type_transactions, date=date.today())

    total_today_transactions = today_transactions.aggregate(total=Sum('sum'))

    return total_today_transactions['total']


def transactions(request):
    expense_categories = Category.objects.filter(category_type_id=1)
    income_categories = Category.objects.filter(category_type_id=2)
    payment_all = Payment.objects.all()

    today_expense_transactions = calculating_transactions_day(id_type_transactions=1)
    today_income_transactions = calculating_transactions_day(id_type_transactions=2)

    context = {
        'expense_categories': expense_categories,
        'income_categories': income_categories,
        'payment_all': payment_all,
        'today_expense_transactions': today_expense_transactions,
        'today_income_transactions': today_income_transactions,
    }

    return render(request, 'transactions/transactions.html', context)


def add_transactions(request):
    if request.method == 'POST':
        transaction_date = request.POST.get('transaction_date')
        transaction_amount = request.POST.get('transaction_amount')
        category_id = request.POST.get('transaction_category')
        transaction_description = request.POST.get('transaction_description')
        payment_method_id = request.POST.get('payment_method')
        receipt_upload = request.FILES.get('receipt_upload')

        if payment_method_id:
            transaction_type = TypeTransactions.objects.get(name='расход')

            new_transaction = Transactions(
                date=transaction_date,
                sum=transaction_amount,
                payment_id=payment_method_id,
                description=transaction_description,
                category_id=category_id,
                image=receipt_upload,
                type_transactions=transaction_type
            )
        else:
            transaction_type = TypeTransactions.objects.get(name='доход')

            new_transaction = Transactions(
                date=transaction_date,
                sum=transaction_amount,
                description=transaction_description,
                category_id=category_id,
                image=receipt_upload,
                type_transactions=transaction_type,
                payment=None
            )

        new_transaction.save()
        messages.success(request, f'транзакция - успешно добавлена')
        return HttpResponseRedirect(reverse('transactions:transactions'))

    return HttpResponse(status=400)
