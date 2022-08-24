# Generated by Django 4.0.5 on 2022-06-20 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('capstone', '0010_alter_dish_dessert_replacers_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dish',
            name='picture',
            field=models.ManyToManyField(blank=True, related_name='dishes', to='capstone.picture'),
        ),
        migrations.AlterField(
            model_name='picture',
            name='image',
            field=models.ImageField(default='default/imagenotfound.png', upload_to='dishes/'),
        ),
    ]
