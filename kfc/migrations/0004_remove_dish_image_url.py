# Generated by Django 4.1.4 on 2022-12-31 09:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kfc', '0003_remove_item_image_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dish',
            name='image_url',
        ),
    ]
