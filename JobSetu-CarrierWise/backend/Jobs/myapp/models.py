from django.db import models
from django.contrib.auth.models import User

# Create your models here.
from django.db import models

class JobListing(models.Model):
    SOURCE_CHOICES = [
        ('LINKEDIN', 'LinkedIn'),
        ('INDEED', 'Indeed'),
        ('NAUKRI', 'Naukri'),
        ('INTERNSHALA', 'Internshala'),
    ]
    
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    # source = models.CharField(max_length=20)
    url = models.URLField(max_length=1000)
    posted_date = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    salary = models.CharField(max_length=100, blank=True, null=True)
    skills = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} at {self.company} ({self.source})"
    


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(JobListing, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'job')  # A user can only favorite a job once

    def __str__(self):
        return f"Favorite job: {self.job.title} by {self.user.username}"
    


# stream result user  api to send userid 