@echo off
title Send Clipboard to Claude Code
echo.
echo  ========================================
echo   Sending clipboard to Claude Code...
echo  ========================================
echo.

cd /d "%~dp0"

:: Grab whatever's on the clipboard and pipe it to Claude Code
powershell -NoProfile -Command "Get-Clipboard -Raw | Out-File -Encoding utf8 .claude-prompt.tmp"

if not exist .claude-prompt.tmp (
  echo  ERROR: Could not read clipboard.
  pause
  exit /b 1
)

echo  Clipboard contents:
echo  ----------------------------------------
type .claude-prompt.tmp
echo.
echo  ----------------------------------------
echo.
echo  Press any key to send this to Claude Code...
pause >nul

:: Pipe the clipboard text into Claude Code (headless mode)
type .claude-prompt.tmp | claude -p --output-format text

del .claude-prompt.tmp

echo.
echo  ========================================
echo   Done. Press any key to close.
echo  ========================================
pause >nul
