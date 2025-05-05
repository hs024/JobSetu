from django.contrib import admin
from myapp.models import JobListing
# Register your models here.
class JobListingAdmin(admin.ModelAdmin):
    list_display=["title","company","location","source","url","posted_date","description","salary","skills","is_active","created_at","updated_at"]
admin.site.register(JobListing,JobListingAdmin)