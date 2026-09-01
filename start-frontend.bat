@echo off
SET PATH=C:\Program Files\nodejs;%PATH%
echo Starting Frontend Dev Server...
cd /d "%~dp0frontend"
npx vite --host --port 5173
