# Generated by Django 3.2 on 2021-04-25 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cards',
            name='front',
            field=models.CharField(max_length=50),
        ),
    ]