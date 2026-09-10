from rest_framework.routers import DefaultRouter
from django.urls import path,include
from .views import Category_ViewSet


router = DefaultRouter()
router.register(r'category',Category_ViewSet)

urlpatterns = [
    path('',include(router.urls)),
]
