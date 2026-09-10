from django.db import models
from django.contrib.auth.models import User
from category.models import Category
# Create your models here.
class Movie(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_id = models.AutoField(primary_key=True)
    movie_name = models.CharField(max_length=200)
    movie_description = models.TextField(max_length=1000, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete = models.CASCADE)
    movie_image = models.ImageField(upload_to='movies/',blank=True, null =True)
    created_at = models.DateField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now =True)
    def __str__(self):
        return f'{self.movie_id} - {self.movie_name[:20]}'