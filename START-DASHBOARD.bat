@echo off
title JAMIESSHOESS Dashboard
echo.
echo  ========================================
echo   JAMIESSHOESS Dashboard Launcher
echo  ========================================
echo.

cd /d "%~dp0"

:: Check Node is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
  echo.
  echo  ======================================================
  echo   Node.js is not installed!
  echo  ======================================================
  echo.
  echo  1. Download Node.js from: https://nodejs.org
  echo     (Download the LTS version)
  echo  2. Run the installer - click Next/Next/Finish
  echo  3. Restart your computer
  echo  4. Double-click START-DASHBOARD.bat again
  echo.
  echo  Opening nodejs.org for you now...
  start "" "https://nodejs.org"
  pause
  exit /b 1
)

:: Install dependencies if needed
if not exist "node_modules" (
  echo  Installing dependencies...
  call npm install
  echo.
)

:: Kill any existing dashboard server on port 3002
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":3002 "') do (
  taskkill /F /PID %%a >nul 2>&1
)

echo  Starting dashboard server on port 3002...
echo.

:: Start the dashboard server in background
start /B node dashboard-server.js

:: Wait a moment for server to start
timeout /t 2 /nobreak >nul

:: Open dashboard in Chrome (try multiple paths)
set CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe"
set CHROME_X86="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"

if exist %CHROME% (
  start "" %CHROME% "http://localhost:3002/dashboard.html"
) else if exist %CHROME_X86% (
  start "" %CHROME_X86% "http://localhost:3002/dashboard.html"
) else (
  start "" "http://localhost:3002/dashboard.html"
)

echo  Dashboard open at: http://localhost:3002/dashboard.html
echo.
echo  Press Ctrl+C to stop the server.
echo.

:: Keep window open and show server logs
node dashboard-server.js
