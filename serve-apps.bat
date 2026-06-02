@echo off
cd /d %~dp0

if "%1"=="admin" (
    echo Starting admin app...
    start cmd /k "cd /d %~dp0 && npx ng serve admin --port 4200"
    goto :eof
)

if "%1"=="client" (
    echo Starting client app...
    start cmd /k "cd /d %~dp0 && npx ng serve client --port 4300"
    goto :eof
)

if "%1"=="" (
    echo No app specified. Starting both admin and client...
    start cmd /k "cd /d %~dp0 && npx ng serve admin --port 4200"
    start cmd /k "cd /d %~dp0 && npx ng serve client --port 4300"
    goto :eof
)

echo Invalid argument: %1
echo Usage:
echo   serve-app.bat admin
echo   serve-app.bat client
echo   serve-app.bat
pause