# Generated by Django 5.0.4 on 2025-01-17 23:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0004_alter_payment_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='type',
            field=models.CharField(max_length=150, unique=True),
        ),
        migrations.AlterField(
            model_name='transactions',
            name='payment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='transactions.payment', verbose_name='тип оплаты'),
        ),
        migrations.AlterField(
            model_name='typetransactions',
            name='name',
            field=models.CharField(max_length=150, unique=True),
        ),
    ]
