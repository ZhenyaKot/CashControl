from django.shortcuts import render


# Create your views here.


def facial(request):
    return render(request, 'home/facial.html')


def transactions(request):
    return render(request, 'home/transactions.html')


def profile(request):
    return render(request, 'home/profile.html')


def reports(request):
    return render(request, 'home/reports.html')
