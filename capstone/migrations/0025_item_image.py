# Generated by Django 4.0.5 on 2022-07-03 08:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('capstone', '0024_remove_dish_items_dish_single_items'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='items', to='capstone.picture'),
        ),
    ]
