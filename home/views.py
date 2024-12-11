from django.shortcuts import render

# Create your views here.


def facial(request):
    return render(request, 'home/facial.html')


def categories(request):
    return render(request, 'home/categories.html')