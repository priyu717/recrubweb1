@echo off
SET PATH=C:\Program Files\nodejs;%PATH%
echo Starting Backend Dev Server...
cd /d "%~dp0backend"
npm run dev
