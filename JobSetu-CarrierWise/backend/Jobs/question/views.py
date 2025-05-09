# views.py
import requests
from django.shortcuts import render, redirect
from django.http import HttpResponse

# Fetch jobs from an API (example)
def questionnaire(request):
    api_url = "http://localhost:8080/api/vi/assessment/getAllJobs"
    response = requests.get(api_url)
    
    if response.status_code == 200:
        jobs = response.json()  # Assuming the API returns a JSON array of jobs
    else:
        jobs = []

    return render(request, "questionnaire.html", {"jobs": jobs})

# Fetch questions for a specific job ID
def questions(request, job_id):
    api_url = f"http://localhost:8080/api/vi/assessment/getAllQuestions/{job_id}"
    response = requests.get(api_url)
    
    if response.status_code == 200:
        questions = response.json()
    else:
        questions = []

    return render(request, "questions_page.html", {"job_id": job_id, "questions": questions})

# Delete a specific question
def delete_question(request, question_id):
    api_url = f"http://localhost:8080/api/vi/assessment/deleteQuestion/{question_id}"
    response = requests.delete(api_url)
    
    if response.status_code == 200:
        return HttpResponse("Question deleted successfully.", status=200)
    else:
        return HttpResponse("Failed to delete the question.", status=400)


# from django.http import HttpResponse

# def delete_question(request, question_id):
#     # Your logic to delete the question goes here
#     # response = delete_question_logic(question_id)  # Placeholder for your deletion logic
#     api_url = f"http://localhost:8080/api/vi/assessment/deleteQuestion/{question_id}"
#     response = requests.delete(api_url)

#     if response.status_code == 200:
#         return HttpResponse(
#             """
#             <!DOCTYPE html>
#             <html lang="en">
#             <head>
#                 <meta charset="UTF-8">
#                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
#                 <title>Question Deleted Successfully</title>
#                 <script src="https://cdn.tailwindcss.com"></script>
#             </head>
#             <body class="bg-gray-100 flex items-center justify-center min-h-screen">
#                 <div class="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
#                     <h1 class="text-2xl font-bold text-gray-800 mb-6">Question Deleted Successfully</h1>
#                     <div class="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
#                         Question deleted successfully.
#                     </div>
#                     <a href="/questions/1" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 mt-4">
#                         Go back to Questions
#                     </a>
#                 </div>
#             </body>
#             </html>
#             """,
#             status=200
#         )
#     else:
#         return HttpResponse(
#             """
#             <!DOCTYPE html>
#             <html lang="en">
#             <head>
#                 <meta charset="UTF-8">
#                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
#                 <title>Failed to Delete Question</title>
#                 <script src="https://cdn.tailwindcss.com"></script>
#             </head>
#             <body class="bg-gray-100 flex items-center justify-center min-h-screen">
#                 <div class="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
#                     <h1 class="text-2xl font-bold text-gray-800 mb-6">Failed to Delete Question</h1>
#                     <div class="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
#                         Failed to delete the question.
#                     </div>
#                     <a href="/questions/1" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 mt-4">
#                         Go back to Questions
#                     </a>
#                 </div>
#             </body>
#             </html>
#             """,
#             status=400
#         )
