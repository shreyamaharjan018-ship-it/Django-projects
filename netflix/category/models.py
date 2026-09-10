from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category_id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=200)
    category_description = models.TextField(max_length=1000, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now =True)
    def __str__(self):
        return f'{self.category_id} - {self.category_name[:20]}'