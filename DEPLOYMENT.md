# Deployment Guide for Netmifi

This guide will walk you through deploying both the frontend and backend of the Netmifi application.

## Frontend Deployment (Vercel)

1. **Create a Vercel Account**
   - Sign up at [Vercel](https://vercel.com) if you don't have an account.

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy the Frontend**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Login to Vercel:
     ```bash
     vercel login
     ```
   - Deploy the application:
     ```bash
     vercel
     ```
   - Follow the prompts to complete the deployment.

4. **Configure Environment Variables**
   - In the Vercel dashboard, go to your project settings.
   - Add the following environment variables:
     - `VITE_API_BASE_ROUTE`: URL of your backend API (e.g., https://netmifi-api.railway.app)
     - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth client ID

## Backend Deployment (Railway)

1. **Create a Railway Account**
   - Sign up at [Railway](https://railway.app) if you don't have an account.

2. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

3. **Deploy the Backend**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Login to Railway:
     ```bash
     railway login
     ```
   - Initialize a new project:
     ```bash
     railway init
     ```
   - Deploy the application:
     ```bash
     railway up
     ```

4. **Configure Environment Variables**
   - In the Railway dashboard, go to your project settings.
   - Add the following environment variables:
     - `PORT`: 3000 (or your preferred port)
     - `DATABASE_URI`: Your MongoDB connection string
     - `NODE_ENV`: production
     - `SECRET_KEY`: A secure random string for JWT signing
     - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
     - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
     - `EMAIL_USER`: Email address for sending emails
     - `EMAIL_PASS`: Password for the email account

## MongoDB Setup

1. **Create a MongoDB Atlas Account**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) if you don't have an account.

2. **Create a Cluster**
   - Create a new cluster (free tier is sufficient for development).
   - Set up database access with a username and password.
   - Set up network access to allow connections from anywhere (0.0.0.0/0).

3. **Get Connection String**
   - In the MongoDB Atlas dashboard, click "Connect" on your cluster.
   - Choose "Connect your application".
   - Copy the connection string and replace `<password>` with your database user password.
   - Use this connection string as the `DATABASE_URI` in your Railway environment variables.

## Connecting Frontend and Backend

1. **Update API URL**
   - After deploying the backend, note the URL provided by Railway.
   - Update the `VITE_API_BASE_ROUTE` in your Vercel environment variables to point to this URL.

2. **Test the Connection**
   - Visit your deployed frontend URL.
   - Test the application to ensure it can communicate with the backend.

## Troubleshooting

- **CORS Issues**: If you encounter CORS errors, ensure your backend's CORS configuration allows requests from your frontend domain.
- **Database Connection**: If the backend can't connect to the database, verify your MongoDB connection string and network access settings.
- **Environment Variables**: Double-check all environment variables are correctly set in both Vercel and Railway dashboards. 