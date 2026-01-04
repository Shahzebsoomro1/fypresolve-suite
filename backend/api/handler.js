import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import organizationRoutes from '../routes/organizationRoutes.js';
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import departmentRoutes from '../routes/departmentRoutes.js';
import complaintRoutes from '../routes/complaintRoutes.js';
import complaintTypeRoutes from '../routes/complaintTypeRoutes.js';
import workflowRoutes from '../routes/workflowRoutes.js';
import notificationRoutes from '../routes/notificationRoutes.js';
import feedbackRoutes from '../routes/feedbackRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

// Connect to MongoDB once
let dbConnected = false;
const ensureDBConnection = async () => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (err) {
      console.error('DB connection error:', err);
    }
  }
};

// API Routes
app.use('/api/organizations', organizationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/complaints/types', complaintTypeRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/feedback', feedbackRoutes);

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  await ensureDBConnection();
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ResolveSuite API is running' });
});

app.get('/', (req, res) => {
  res.json({ message: 'ResolveSuite API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

export default app;
