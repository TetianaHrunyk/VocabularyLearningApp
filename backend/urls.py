"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from api import views
from .views import index


router = routers.DefaultRouter()
router.register(r'decks', views.DecksView, 'decks')
router.register(r'cards', views.CardsView, 'cards')

urlpatterns = [
    path('', index, name='index'),
    path('signup/', index, name='index'),
    path('login/', index, name='index'),
    path('cards/', index, name='index'),
    path('decks/', index, name='index'),
    path('study/', index, name='index'),
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('token-auth/refresh/', refresh_jwt_token),
    path('api/', include('api.urls')),
    path('api/', include(router.urls)),
    
]