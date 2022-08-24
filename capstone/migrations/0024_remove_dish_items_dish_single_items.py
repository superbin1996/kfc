# Generated by Django 4.0.5 on 2022-06-30 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('capstone', '0023_remove_dish_choices_dish_selections'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dish',
            name='items',
        ),
        migrations.AddField(
            model_name='dish',
            name='single_items',
            field=models.ManyToManyField(blank=True, related_name='dishSingleItems', to='capstone.item'),
        ),
    ]
