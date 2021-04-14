from django.db import models

class Users(models.Model):
  userId = models.AutoField(primary_key=True)
  username = models.CharField(max_length=60, null=False, unique=True)
  email = models.EmailField(max_length=254, null=False, unique=True)
  password = models.CharField(max_length=50, null=False)
  registered = models.DateField(auto_now_add=True)

  def __str__(self):
      return self.username
  

class Decks(models.Model):
  deckId = models.AutoField(primary_key=True)
  userId = models.ForeignKey(Users, on_delete=models.CASCADE)
  deckName = models.CharField(default="Custom Deck", max_length=50)
  created = models.DateField(auto_now_add=True)

class Cards(models.Model):
  id = models.AutoField(primary_key=True)
  deckId = models.ForeignKey(Decks, on_delete=models.CASCADE)
  userId = models.ForeignKey(Users, on_delete=models.CASCADE)
  front = models.CharField(max_length=50, null=False, unique=True)
  back = models.CharField(max_length=50, null=False)
  context = models.CharField(max_length=500)
  added = models.DateTimeField( auto_now_add=False)
  revised = models.TimeField(auto_now_add=True)
  nat_for = models.FloatField(default=0.1, null=False)
  for_nat = models.FloatField(default=0.1, null=False)
