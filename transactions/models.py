from categories.models import Category
from django.db import models
from django.utils import timezone


# Create your models here.

class Payment(models.Model):
    type = models.CharField(max_length=150, unique=True)

    class Meta:
        verbose_name = 'тип оплаты'
        verbose_name_plural = 'типы оплаты '

    def __str__(self):
        return self.type


class Transactions(models.Model):
    date = models.DateField(default=timezone.now, verbose_name='дата')
    sum = models.PositiveIntegerField(null=False)
    description = models.TextField(max_length=150, blank=True, null=True, verbose_name='описание')
    image = models.ImageField(null=True, blank=True, upload_to='transactions_images',
                              verbose_name='фотография транзакции')
    payment = models.ForeignKey(Payment, related_name='transactions', on_delete=models.CASCADE,
                                verbose_name='тип оплаты')
    category = models.ForeignKey(Category, related_name='transactions', on_delete=models.CASCADE,
                                 verbose_name='категория транзакции')

    class Meta:
        verbose_name = 'транзакцию'
        verbose_name_plural = 'транзакции'

    def __str__(self):
        return self.description

