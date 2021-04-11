from rest_framework import serializers
from .models import Users, Decks, Cards

class UsersSerializer(serializers.ModelSerializer):
  class Meta:
    model = Users
    fields = ('userId', 'userName', 'email', 'password', 'registered')

class DecksSerializer(serializers.ModelSerializer):
  class Meta:
    model = Decks
    fields = ('deckId', 'userId', 'deckName', 'created')

class CardsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cards
    fields = ('id', 'deckId', 'userId', 'front', 'back',
              'context', 'added', 'revised', 'nat_for', 'for_nat')