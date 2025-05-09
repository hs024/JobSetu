from django.urls import path
from .views import submit_feedback

urlpatterns = [
    path("api/submit-feedback/", submit_feedback, name="submit-feedback"),
]
