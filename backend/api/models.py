from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class Decks(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
  deckName = models.CharField(default="Custom Deck", max_length=50)
  created = models.DateField(auto_now_add=True)
  def __str__(self):
      return self.deckName + " by " + str(self.user)
  

class Cards(models.Model):
  deck = models.ForeignKey(Decks, on_delete=models.CASCADE, default=1)
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
  front = models.CharField(max_length=50, null=False, unique=True)
  back = models.CharField(max_length=50, null=False)
  context = models.CharField(max_length=500)
  added = models.DateTimeField( auto_now_add=False)
  revised = models.TimeField(auto_now_add=True)
  nat_for = models.FloatField(default=0.1, null=False)
  for_nat = models.FloatField(default=0.1, null=False)

