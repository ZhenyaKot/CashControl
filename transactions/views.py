from datetime import date, timedelta

from categories.models import Category
from django.contrib import messages
from django.db.models import Sum
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.utils import timezone
from transactions.models import Payment
from transactions.models import TypeTransactions, Transactions

# Create your views here.

TODAY = date.today()
FIRST_DAY_OF_MONTH = TODAY.replace(day=1)


# Функция для расчета доходов и расходов за месяц
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

    all_transactions = Transactions.objects.all()[::-1]

    context = {
        'expense_categories': expense_categories,
        'income_categories': income_categories,
        'payment_all': payment_all,
        'month_expense_transactions': month_expense_transactions,
        'month_income_transactions': month_income_transactions,
        'all_transactions': all_transactions
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


def get_dates_for_period(request):
    time_period = request.GET.get('time_period', 'all_time')
    current_date = timezone.now()

    if time_period == '1':
        start_date = current_date - timedelta(days=1)
        end_date = current_date

    elif time_period == '7':
        start_date = current_date - timedelta(days=7)
        end_date = current_date

    elif time_period == '30':
        start_date = current_date - timedelta(days=30)
        end_date = current_date

    else:
        start_date = ''
        end_date = ''

    return JsonResponse({
        'start_date': start_date.strftime('%Y-%m-%d') if start_date else '',
        'end_date': end_date.strftime('%Y-%m-%d') if end_date else ''
    })


def filter_sort_transactions(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        transactions_type = request.GET.get('transactions_type', 'all_type')
        start_date = request.GET.get('start_date', None)
        end_date = request.GET.get('end_date', None)
        amount_from = request.GET.get('amount_from', None)
        amount_to = request.GET.get('amount_to', None)
        sort_order = request.GET.get('sort_order', None)

        latest_transactions = Transactions.objects.all()

        if start_date:
            latest_transactions = latest_transactions.filter(date__gte=start_date)

        if end_date:
            latest_transactions = latest_transactions.filter(date__lte=end_date)

        if transactions_type != 'all_type':
            latest_transactions = latest_transactions.filter(
                type_transactions_id=2 if transactions_type == 'income' else 1)

        if amount_from:
            latest_transactions = latest_transactions.filter(sum__gte=amount_from)

        if amount_to:
            latest_transactions = latest_transactions.filter(sum__lte=amount_to)

        # Сортировка
        if sort_order == 'asc':
            latest_transactions = latest_transactions.order_by('date')
        else:
            latest_transactions = latest_transactions.order_by('-date')

        html = render(request, 'transactions/transactions_partial.html', {
            'all_transactions': latest_transactions
        }).content.decode('utf-8')

        return JsonResponse({'html': html})

    return JsonResponse({'error': 'Invalid request'}, status=400)


def deleted_transactions(request, transactions_id):
    if request.method == 'DELETE':
        transaction = get_object_or_404(Transactions, id=transactions_id)
        transaction_name = transaction.description
        transaction.delete()
        success_message = f'Транзакция - {transaction.description}: успешно удалена.'
        return JsonResponse({'message': success_message}, status=200)
    return JsonResponse({'status': 'error'}, status=400)
