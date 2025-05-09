@echo off
echo Stopping all Node, Python, and Java processes started by services...

taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM python.exe >nul 2>&1
taskkill /F /IM java.exe >nul 2>&1

echo ✅ All services stopped.
pause
