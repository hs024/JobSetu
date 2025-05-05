# jobs/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('api/scrape-jobs/', views.scrape_jobs, name='scrape_jobs'),
    path('api/job-listings/', views.job_listings, name='job_listings'),
    path('api/register/', views.register),
    path('api/login/', views.login),
    path('api/user-details/', views.user_details, name='user_details'),
    
     # Favorite job routes
    path('api/favorites/', views.AddToFavorites.as_view(), name='favorites'),
    path('api/favorites/<int:favorite_id>/', views.RemoveFromFavorites.as_view(), name='remove-from-favorites'),
    path('api/favorites/check/', views.CheckFavorite.as_view(), name='check-favorite'),
    path('api/favorites/list/', views.FavoriteList.as_view(), name='favorite-list'),
    # userid
       path('api/user-id/', views.get_user_id, name='get_user_id'),
]
