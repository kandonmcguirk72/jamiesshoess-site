@echo off
title JAMIESSHOESS Local Server
color 0A
echo.
echo  ==========================================
echo   JAMIESSHOESS -- Starting Local Server
echo  ==========================================
echo.
echo  Server will start at: http://localhost:8080
echo.
echo  - Open Chrome and go to http://localhost:8080
echo  - Press Ctrl+C in this window to stop server
echo  - Keep this window open while using the site
echo.
cd /d "%~dp0"
where npx >nul 2>&1
if %errorlevel% neq 0 (
  echo  ERROR: Node.js not installed!
  echo  Download from: https://nodejs.org
  pause
  exit
)
npx serve . -p 8080 --no-clipboard
pause
