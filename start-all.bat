@echo off
color 0A
title Starting All React Frontends
cls

echo.
echo  ========================================
echo  ^|  Starting All React Frontend Apps   ^|
echo  ========================================
echo.

set BASE_DIR=%CD%

echo  [1/5] Starting EHR Frontend...
start "EHR Frontend" cmd /k "color 0B && cd /d %BASE_DIR%\ehr && npm run dev"
timeout /t 2 /nobreak >nul

echo  [2/5] Starting Engine Frontend...
start "Engine Frontend" cmd /k "color 0C && cd /d %BASE_DIR%\engine && npm run dev"
timeout /t 2 /nobreak >nul

echo  [3/5] Starting LIS Frontend...
start "LIS Frontend" cmd /k "color 0D && cd /d %BASE_DIR%\lis && npm run dev"
timeout /t 2 /nobreak >nul

echo  [4/5] Starting Payer Frontend...
start "Payer Frontend" cmd /k "color 0E && cd /d %BASE_DIR%\payer && npm run dev"
timeout /t 2 /nobreak >nul

echo  [5/5] Starting PHR Frontend...
start "PHR Frontend" cmd /k "color 0F && cd /d %BASE_DIR%\phr && npm run dev"

echo.
echo  ========================================
echo  ^|      All Frontends Started!         ^|
echo  ========================================
echo.
echo   EHR:     http://localhost:8081
echo   Engine:  http://localhost:8080
echo   LIS:     http://localhost:8082
echo   Payer:   http://localhost:8083
echo   PHR:     http://localhost:8084
echo.
echo  ========================================
echo   Press any key to close this window...
pause >nul