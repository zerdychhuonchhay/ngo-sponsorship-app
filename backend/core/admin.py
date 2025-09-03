from django.contrib import admin
from .models import School, Student, AcademicReport, FollowUpRecord, Transaction, GovernmentFiling

# Register your models here.

# --- WHY we do this ---
# The admin.site.register() function tells the Django admin panel:
# "I want to be able to view, add, edit, and delete records for this model."
# We must do this for every model we want to manage.

admin.site.register(School)
admin.site.register(Student)
admin.site.register(AcademicReport)
admin.site.register(FollowUpRecord)
admin.site.register(Transaction)
admin.site.register(GovernmentFiling)
