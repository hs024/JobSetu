# jobs/serializers.py

from rest_framework import serializers
from .models import Favorite
from .models import JobListing

class JobListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobListing
        fields = '__all__'


class FavoriteSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title')
    company = serializers.CharField(source='job.company')

    class Meta:
        model = Favorite
        fields = ['id', 'job_title', 'company']
