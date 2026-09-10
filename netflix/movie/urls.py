from rest_framework.routers import DefaultRouter
from django.urls import path,include
from .views import Movie_ViewSet


router = DefaultRouter()
router.register(r'movie',Movie_ViewSet)

urlpatterns = [
    path('',include(router.urls)),
]
