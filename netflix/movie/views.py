from django.shortcuts import render
from rest_framework import viewsets
from .models import Movie
from .serializers import  Movie_Serializer
# Create your views here.
class Movie_ViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = Movie_Serializer
