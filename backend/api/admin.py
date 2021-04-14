from django.contrib import admin

from .models import Users

class UsersAdmin(admin.ModelAdmin):
  list_display = ('userId', 'username', 'email', 'password', 'registered')

admin.site.register(Users, UsersAdmin)
