# Manual Railway Deployment Guide

Since we're having issues with the Railway CLI, here's a step-by-step guide to deploy your backend to Railway manually:

## Step 1: Create a Railway Account

1. Go to [Railway](https://railway.app/) and sign up for an account.

## Step 2: Create a New Project

1. After logging in, click on "New Project".
2. Select "Deploy from GitHub repo".
3. Connect your GitHub account if you haven't already.
4. Select the repository containing your backend code.

## Step 3: Configure Environment Variables

1. In your Railway project, go to the "Variables" tab.
2. Add the following environment variables:
   - `PORT`: 3000
   - `DATABASE_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
   - `SECRET_KEY`: A secure random string for JWT signing
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
   - `EMAIL_USER`: Email address for sending emails
   - `EMAIL_PASS`: Password for the email account

## Step 4: Configure Build Settings

1. In your Railway project, go to the "Settings" tab.
2. Under "Build & Deploy", set the following:
   - Build Command: `npm run build`
   - Start Command: `npm start`

## Step 5: Deploy

1. Railway will automatically deploy your application.
2. Once deployed, you'll get a URL for your backend API.

## Step 6: Update Frontend Configuration

1. Update the `VITE_API_BASE_ROUTE` in your frontend's `.env` file to point to your Railway backend URL.
2. Deploy your frontend to Vercel as described in the DEPLOYMENT.md file.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the Railway logs for errors.
2. Make sure all environment variables are correctly set.
3. Verify that your MongoDB connection string is correct and the database is accessible.
4. Ensure your backend code is compatible with Railway's environment. 