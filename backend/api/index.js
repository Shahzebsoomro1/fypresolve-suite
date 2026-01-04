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
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();  // Load environment variables

const app = express();
app.use(express.json());  // Parse incoming requests with JSON payloads
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Specify the exact origin
  credentials: true, // This allows the server to accept credentials
};

app.use(cors(corsOptions));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect to the MongoDB database
connectDB();

// Define your API routes here
app.use('/api/organizations', organizationRoutes); 
app.use('/api/auth', authRoutes); // Use authentication routes
app.use('/api/users', userRoutes);// Use user routes
app.use('/api/departments', departmentRoutes); // Use department routes
app.use('/api/complaints/types', complaintTypeRoutes); // Use complaint type routes
app.use('/api/complaints', complaintRoutes); // Use complaint routes
app.use('/api/workflows', workflowRoutes); // Use workflow routes 
app.use('/api/notifications', notificationRoutes); // Use notification routes
app.use('/api/feedback', feedbackRoutes); // Use feedback routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default app;
