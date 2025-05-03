#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Netmifi Deployment Script${NC}"
echo "This script will help you deploy both the frontend and backend of the Netmifi application."
echo ""

# Check if user wants to deploy frontend
read -p "Do you want to deploy the frontend to Vercel? (y/n): " deploy_frontend
if [ "$deploy_frontend" = "y" ]; then
  echo -e "${YELLOW}Deploying frontend to Vercel...${NC}"
  cd frontend
  vercel
  cd ..
fi

# Check if user wants to deploy backend
read -p "Do you want to deploy the backend to Railway? (y/n): " deploy_backend
if [ "$deploy_backend" = "y" ]; then
  echo -e "${YELLOW}Deploying backend to Railway...${NC}"
  cd backend
  railway up
  cd ..
fi

echo -e "${GREEN}Deployment process completed!${NC}"
echo "Please check the DEPLOYMENT.md file for more detailed instructions." 