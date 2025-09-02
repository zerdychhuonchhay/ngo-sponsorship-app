# backend/ngo_project/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # This is the new line that connects our core app's URLs
    path('api/', include('core.urls')), 
]