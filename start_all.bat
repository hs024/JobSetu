@echo off
echo Starting services...

:: Start Django (Python)
start "" cmd /c "cd JobSetu-CarrierWise\backend\Jobs && py manage.py runserver"
:: Save the PID
timeout /t 1 >nul

:: Start Spring Boot (Java)
start "" cmd /c "cd JobSetu-questionaire\jobassessment-email-service-on-registration\target && java -jar jobassessment-0.0.1-SNAPSHOT.jar"

@REM start "" cmd /c "cd JobSetu-questionaire\jobassessment-main\target && java -jar jobassessment-0.0.1-SNAPSHOT.jar"

timeout /t 1 >nul

:: Start React 1 (CarrierWise Frontend)
start "" cmd /c "cd JobSetu-CarrierWise\frontend\front && npm run dev"
timeout /t 1 >nul

:: Start React 2 (Job Test App)
start "" cmd /c "cd JobSetu-questionaire\front_questionare\job-test-app && npm run dev"
timeout /t 1 >nul

:: Open React app in browser
start http://localhost:5174

echo ✅ All services started.
pause
