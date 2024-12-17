from django.contrib import auth, messages
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse

from user.models import User
from user.forms import UserRegisterForm, UserLoginForm


# Create your views here.

def login(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth.login(request, user)

            return HttpResponseRedirect(reverse('home:profile'))

        messages.error(request, 'Неверное имя пользователя или пароль')
    else:
        form = UserLoginForm()

    context = {
        'form': form
    }

    return render(request, 'user/login.html', context)


def registration(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth.login(request, user)

            return HttpResponseRedirect(reverse('user:login'))

    else:
        form = UserRegisterForm()

    context = {
        'form': form,
    }

    return render(request, 'user/registration.html', context)
