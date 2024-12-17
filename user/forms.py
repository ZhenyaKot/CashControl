from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from user.models import User


class UserLoginForm(AuthenticationForm):
    class Meta:
        model = AuthenticationForm
        fields = [
            'username',
            'password'
        ]


class UserRegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password1',
            'password2'
        ]
