# Generated by Django 4.0.5 on 2022-06-29 13:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('capstone', '0021_rename_picture_dish_image_comboitems'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dish',
            old_name='image',
            new_name='images',
        ),
    ]
