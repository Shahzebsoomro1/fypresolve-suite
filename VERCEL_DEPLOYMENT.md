# Vercel Deployment Guide for ResolveSuite

## Project Structure
This is a monorepo with two main parts:
- **Backend**: Express.js API (Node.js)
- **Frontend**: React application

## Prerequisites
1. GitHub account with your project repository
2. Vercel account (sign up at https://vercel.com)
3. MongoDB Atlas account for database
4. Environment variables ready

## Deployment Steps

### 1. Prepare Your Repository
Ensure your code is pushed to GitHub with the following structure:
```
project-root/
├── backend/
│   ├── api/
│   │   └── index.js
│   ├── vercel.json
│   ├── package.json
│   └── ...
├── frontend/
│   ├── package.json
│   ├── public/
│   ├── src/
│   └── ...
└── vercel.json
```

### 2. Deploy Backend (Express API)

#### Option A: Deploy Backend Separately
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Choose **Framework Preset**: Node.js
5. In "Root Directory", set it to `backend`
6. Click "Environment Variables" and add:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string
   - `FRONTEND_URL`: Your frontend domain (e.g., https://yourapp.vercel.app)
   - `NODE_ENV`: production
   - Any other required environment variables

7. Click "Deploy"

#### Backend Deployment Verification
- After deployment, your API will be available at: `https://your-backend.vercel.app`
- Test the health endpoint: `https://your-backend.vercel.app/health`

### 3. Deploy Frontend (React App)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Choose **Framework Preset**: Create React App
5. In "Root Directory", set it to `frontend`
6. Click "Environment Variables" and add:
   - `REACT_APP_API_URL`: Your backend API URL (e.g., https://your-backend.vercel.app/api)

7. Build Command: `npm run build`
8. Output Directory: `build`
9. Click "Deploy"

#### Frontend Deployment Verification
- Your app will be available at: `https://yourapp.vercel.app`
- Ensure API calls work correctly with your backend

### 4. Configure CORS
Update your backend CORS settings (in `backend/server.js`) to include your frontend domain:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Set via environment variables
  credentials: true,
};
```

### 5. Environment Variables Checklist

#### Backend (.env)
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] FRONTEND_URL
- [ ] NODE_ENV=production
- [ ] EMAIL_SERVICE (if applicable)
- [ ] EMAIL_USER (if applicable)
- [ ] EMAIL_PASSWORD (if applicable)

#### Frontend (.env)
- [ ] REACT_APP_API_URL

### 6. Troubleshooting

#### Build Fails
- Check Node.js version compatibility (should be 16+)
- Ensure all dependencies are listed in package.json
- Check for hardcoded paths that might break in production

#### API Connection Issues
- Verify `REACT_APP_API_URL` is correctly set
- Check backend CORS configuration includes frontend domain
- Ensure backend environment variables are set correctly

#### MongoDB Connection Issues
- Verify MongoDB Atlas connection string is correct
- Check IP whitelist includes Vercel IPs (0.0.0.0/0 for broad access)
- Ensure database user has correct permissions

#### Static Files / Uploads
- Vercel filesystem is read-only except for `/tmp`
- For uploads, consider using cloud storage (AWS S3, Cloudinary, etc.)
- Update upload service to use cloud storage instead of local filesystem

### 7. Continuous Deployment
- Any push to your main branch will automatically trigger a new deployment
- Vercel shows deployment status in both the dashboard and GitHub

### 8. Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 9. Monitoring & Logs
- View logs in Vercel dashboard under each deployment
- Use Vercel CLI for local testing: `npm i -g vercel && vercel`

## Additional Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Node.js on Vercel](https://vercel.com/docs/concepts/functions/serverless-functions)
- [React Deployment Guide](https://create-react-app.dev/deployment/)

## Notes
- Keep your `.env.local` file locally and use Vercel dashboard for production secrets
- Never commit `.env` files to Git
- Test your API endpoints before finalizing deployment
