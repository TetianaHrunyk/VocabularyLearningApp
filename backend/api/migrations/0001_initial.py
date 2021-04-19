# Generated by Django 3.2 on 2021-04-18 18:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Decks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deckName', models.CharField(default='Custom Deck', max_length=50)),
                ('created', models.DateField(auto_now_add=True)),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Cards',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('front', models.CharField(max_length=50, unique=True)),
                ('back', models.CharField(max_length=50)),
                ('context', models.CharField(default='', max_length=500)),
                ('added', models.DateTimeField(auto_now_add=True)),
                ('revised', models.DateTimeField(auto_now_add=True)),
                ('nat_for', models.FloatField(default=0.1)),
                ('for_nat', models.FloatField(default=0.1)),
                ('deck', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.decks')),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
