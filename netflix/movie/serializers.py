from rest_framework import serializers
from .models import Movie

class Movie_Serializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model =Movie