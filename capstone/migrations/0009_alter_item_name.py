# Generated by Django 4.0.5 on 2022-06-20 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('capstone', '0008_dish_picture_remove_replacement_item_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='name',
            field=models.CharField(max_length=300),
        ),
    ]
