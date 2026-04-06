import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import enrollRoutes from './routes/enroll.js';
import webhookRoutes from './routes/webhook.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      // Development
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      // Production - Bootcamp Subdomain
      'https://bootcamp.eduaitutors.com',
      'https://www.bootcamp.eduaitutors.com',
      process.env.FRONTEND_URL,
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key'],
}));
app.use(express.json());

// Routes
app.use('/api/enroll', enrollRoutes);
app.use('/api/payment/ottu/webhook', webhookRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running!' });
});

// Database Connection and Server Startup
if (!process.env.MONGODB_URI) {
  console.error('❌ CRITICAL: MONGODB_URI is not defined in environment variables.');
  // We still start the server so the health check passes and logs can be reviewed
}

app.listen(PORT, async () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ Connected to MongoDB');
    } catch (err) {
      console.error('❌ MongoDB Connection Error:', err.message);
    }
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
});
