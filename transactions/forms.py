from django import forms

from .models import Transactions


class TransactionsForm(forms.ModelForm):
    class Meta:
        model = Transactions
        fields = [
            'date',
            'sum',
            'description',
            'image',
            'payment',
            'category',
        ]
