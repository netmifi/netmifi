# Manual Vercel Deployment Guide

Since we're having issues with the Vercel CLI, here's a step-by-step guide to deploy your frontend to Vercel manually:

## Step 1: Create a Vercel Account

1. Go to [Vercel](https://vercel.com/) and sign up for an account.

## Step 2: Create a New Project

1. After logging in, click on "Add New..." and select "Project".
2. Connect your GitHub account if you haven't already.
3. Select the repository containing your frontend code.

## Step 3: Configure Project Settings

1. In the project configuration page, set the following:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install

## Step 4: Configure Environment Variables

1. In the "Environment Variables" section, add the following:
   - `VITE_API_BASE_ROUTE`: URL of your backend API (e.g., https://your-railway-app.railway.app)
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID

## Step 5: Deploy

1. Click "Deploy" to start the deployment process.
2. Vercel will build and deploy your application.
3. Once deployed, you'll get a URL for your frontend application.

## Step 6: Configure Custom Domain (Optional)

1. In your Vercel project, go to the "Settings" tab.
2. Under "Domains", you can add a custom domain for your application.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the Vercel build logs for errors.
2. Make sure all environment variables are correctly set.
3. Verify that your frontend code is compatible with Vercel's environment.
4. If you're having issues with routing, make sure your `vercel.json` file is correctly configured. 