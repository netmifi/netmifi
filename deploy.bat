@echo off
echo Netmifi Deployment Script
echo This script will help you deploy both the frontend and backend of the Netmifi application.
echo.

set /p deploy_frontend=Do you want to deploy the frontend to Vercel? (y/n): 
if /i "%deploy_frontend%"=="y" (
  echo Deploying frontend to Vercel...
  cd frontend
  vercel
  cd ..
)

set /p deploy_backend=Do you want to deploy the backend to Railway? (y/n): 
if /i "%deploy_backend%"=="y" (
  echo Deploying backend to Railway...
  cd backend
  railway up
  cd ..
)

echo Deployment process completed!
echo Please check the DEPLOYMENT.md file for more detailed instructions.
pause 