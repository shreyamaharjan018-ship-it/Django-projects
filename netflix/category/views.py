from django.shortcuts import render
from rest_framework import viewsets
from .models import Category
from .serializers import Category_Serializer
# Create your views here.
class Category_ViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = Category_Serializer
