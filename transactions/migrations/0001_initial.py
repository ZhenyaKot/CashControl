# Generated by Django 5.1.4 on 2024-12-22 19:45

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=150, unique=True)),
            ],
            options={
                'verbose_name': 'тип оплаты',
                'verbose_name_plural': 'типы оплаты ',
            },
        ),
        migrations.CreateModel(
            name='Transactions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now, verbose_name='дата')),
                ('sum', models.PositiveIntegerField()),
                ('description', models.TextField(blank=True, max_length=150, null=True, verbose_name='описание')),
                ('image', models.ImageField(blank=True, null=True, upload_to='transactions_images', verbose_name='фотография транзакции')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='categories.category', verbose_name='категория транзакции')),
                ('payment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='transactions.payment', verbose_name='тип оплаты')),
            ],
            options={
                'verbose_name': 'транзакцию',
                'verbose_name_plural': 'транзакции',
            },
        ),
    ]
