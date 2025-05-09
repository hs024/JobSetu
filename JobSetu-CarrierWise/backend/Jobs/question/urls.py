# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('questionnaire/', views.questionnaire, name="questionnaire"),
    path('questions/<int:job_id>/', views.questions, name="questions"),
    path('delete_question/<int:question_id>/', views.delete_question, name="delete_question"),
]
