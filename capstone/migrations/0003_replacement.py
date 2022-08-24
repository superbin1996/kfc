# Generated by Django 4.0.5 on 2022-06-19 04:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('capstone', '0002_category_item'),
    ]

    operations = [
        migrations.CreateModel(
            name='Replacement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='replacements', to='capstone.item')),
                ('replacements', models.ManyToManyField(blank=True, related_name='replacer', to='capstone.item')),
            ],
        ),
    ]
