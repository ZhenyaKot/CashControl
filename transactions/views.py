from datetime import date, timedelta

from categories.models import Category
from django.contrib import messages
from django.db.models import Sum
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from transactions.models import Payment
from transactions.models import TypeTransactions, Transactions

# Create your views here.

TODAY = date.today()
FIRST_DAY_OF_MONTH = TODAY.replace(day=1)


def calculating_transactions_day(id_type_transactions):
    month_transactions = Transactions.objects.filter(
        type_transactions_id=id_type_transactions, date__gte=FIRST_DAY_OF_MONTH,
        date__lt=TODAY.replace(day=1) + timedelta(days=31))

    total_month_transactions = month_transactions.aggregate(total=Sum('sum'))

    return total_month_transactions['total']


def transactions(request):
    expense_categories = Category.objects.filter(category_type_id=1)
    income_categories = Category.objects.filter(category_type_id=2)
    payment_all = Payment.objects.all()

    month_expense_transactions = calculating_transactions_day(id_type_transactions=1)
    month_income_transactions = calculating_transactions_day(id_type_transactions=2)

    latest_transactions = Transactions.objects.filter(date__gte=FIRST_DAY_OF_MONTH,
                                                      date__lt=TODAY.replace(day=1) + timedelta(days=31))[::-1]

    context = {
        'expense_categories': expense_categories,
        'income_categories': income_categories,
        'payment_all': payment_all,
        'month_expense_transactions': month_expense_transactions,
        'month_income_transactions': month_income_transactions,
        'latest_transactions': latest_transactions
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


def sort_transactions(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        order = request.GET.get('order', 'asc')
        latest_transactions = Transactions.objects.filter(date__gte=FIRST_DAY_OF_MONTH,
                                                          date__lt=TODAY.replace(day=1) + timedelta(days=31))

        if order == 'asc':
            latest_transactions = latest_transactions.order_by('date')
        else:
            latest_transactions = latest_transactions.order_by('-date')

        html = render(request, 'transactions/transactions_partial.html', {
            'latest_month_transactions': latest_transactions,
        }).content.decode('utf-8')

        return JsonResponse({'html': html})

    return JsonResponse({'error': 'Invalid request'}, status=400)
