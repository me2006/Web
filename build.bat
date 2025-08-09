@echo off
setlocal

echo Cleaning up...

rmdir /s /q node_modules 2>nul
rmdir /s /q build 2>nul
del /f /q package-lock.json 2>nul

echo Cleaning npm cache...
call npm cache clean --force

echo Installing dependencies...
call npm install

echo Building project...
call npm run build

echo Done.
pause
