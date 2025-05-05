
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .scrapers import run_scrapers  # your scraper function
from .models import JobListing
from .serializers import JobListingSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Favorite
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import IntegrityError

#################################!   Login #####################
# Helper to get tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

###################!register 


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')
    email = data.get('email', '')
    first_name = data.get('first_name', '')
    last_name = data.get('last_name', '')
    full_name = data.get('full_name', '')  # Optional custom field
    profile_picture = data.get('profile_picture', '')  # Optional custom field

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=400)

    try:
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        user.save()

        # If you have a Profile model for full_name and profile_picture, create/update it here
        # Example:
        # Profile.objects.create(user=user, full_name=full_name, profile_picture=profile_picture)

        return Response({'message': 'User created successfully'}, status=201)

    except (ValidationError, IntegrityError) as e:
        return Response({'error': str(e)}, status=400)
################### ! login
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    from django.contrib.auth import authenticate
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        tokens = get_tokens_for_user(user)
        return Response(tokens)
    else:
        return Response({'error': 'Invalid Credentials'}, status=400)






###############################!    Scrapper ###############################
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def scrape_jobs(request):
    search_term = request.data.get('search_term')
    if not search_term:
        return Response({'error': 'search_term is required'}, status=400)

    jobs = run_scrapers(search_term)
    return Response({'message': f'{len(jobs)} jobs scraped successfully!'})


#######################!   Job listing     ####################3
# @api_view(['GET'])
# def job_listings(request):
#     jobs = JobListing.objects.filter(is_active=True).order_by('-posted_date')[:50]
#     serializer = JobListingSerializer(jobs, many=True)
#     return Response(serializer.data)

@api_view(['GET'])
def job_listings(request):
    search_term = request.query_params.get('search_term', '')
    if search_term:
        jobs = JobListing.objects.filter(title__icontains=search_term)  # You can filter by title, company, etc.
    else:
        # jobs = JobListing.objects.all()  # No search term, fetch all
        jobs = JobListing.objects.filter(is_active=True).order_by('-posted_date')[:50]

    serializer = JobListingSerializer(jobs, many=True)
    return Response(serializer.data)




#####################!  userdetail 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_details(request):
    # Fetch the authenticated user
    user = request.user
    
    # Return the user details
    user_data = {
        'username': user.username,  # User's unique username
        'email': user.email,  # User's email
        'first_name': user.first_name,  # First name
        'last_name': user.last_name,  # Last name
        'full_name': user.get_full_name(),  # Full name (from first and last)
        'role': "User" if user.is_active else "Inactive",  # Active/Inactive status
        'date_joined': user.date_joined.strftime('%Y-%m-%d'),  # Date joined formatted
        'profile_picture': user.profile.profile_picture.url if hasattr(user, 'profile') and user.profile.profile_picture else None,  # Profile picture URL (if you have a profile model with a picture)
        'last_login': user.last_login.strftime('%Y-%m-%d %H:%M:%S') if user.last_login else None,  # Last login time
    }
    
    return Response(user_data)





#########################!   favourite 



class CheckFavorite(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        job_url = request.query_params.get('url')  # Get job URL from query params
        if job_url:
            job = JobListing.objects.filter(url=job_url).first()
            if job:
                favorite = Favorite.objects.filter(user=request.user, job=job).first()
                if favorite:
                    return Response({'is_favorite': True, 'id': favorite.id})
            return Response({'is_favorite': False})
        return Response({'error': 'Job URL is required'}, status=400)


class AddToFavorites(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        job_url = request.data.get('url')  # Expect job URL in request body
        if job_url:
            job = JobListing.objects.filter(url=job_url).first()
            if job:
                # Check if already favorited
                if Favorite.objects.filter(user=request.user, job=job).exists():
                    return Response({'error': 'Job is already in favorites'}, status=status.HTTP_400_BAD_REQUEST)
                # Create new favorite
                Favorite.objects.create(user=request.user, job=job)
                return Response({'message': 'Job added to favorites'})
            return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'Job URL is required'}, status=status.HTTP_400_BAD_REQUEST)


class RemoveFromFavorites(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, favorite_id):
        try:
            favorite = Favorite.objects.get(id=favorite_id, user=request.user)
            favorite.delete()
            return Response({'message': 'Job removed from favorites'})
        except Favorite.DoesNotExist:
            return Response({'error': 'Favorite not found'}, status=status.HTTP_404_NOT_FOUND)
# In views.py
class FavoriteList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favorites = Favorite.objects.filter(user=request.user)
        favorite_jobs = [favorite.job for favorite in favorites]
        
        # Serialize the jobs and return them
        serialized_jobs = JobListingSerializer(favorite_jobs, many=True)
        return Response(serialized_jobs.data)


#########################!  userid by username

@api_view(['GET'])
def get_user_id(request):
    username = request.GET.get('username')
    if username is None:
        return Response({"error": "Username not provided"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(username=username)
        return Response({"user_id": user.id})
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)