from django.db import models


# Create your models here.


class TypeCategory(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='тип категории')

    class Meta:
        verbose_name = 'тип Категории'
        verbose_name_plural = 'тип Категории'

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='имя категории')
    description = models.TextField(max_length=50, blank=True, null=True, verbose_name='описание')
    created = models.DateTimeField(auto_now_add=True, verbose_name='дата создания')
    upload = models.DateTimeField(auto_now=True, verbose_name='дата обновления')
    category_type = models.ForeignKey(TypeCategory, on_delete=models.CASCADE, related_name='categories',
                                      verbose_name='тип категории')

    class Meta:
        verbose_name = 'Категорию'
        verbose_name_plural = 'Категории'

    def __str__(self):
        return self.name
