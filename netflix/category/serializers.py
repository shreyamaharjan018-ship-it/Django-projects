from rest_framework import serializers
from .models import Category

class Category_Serializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Category