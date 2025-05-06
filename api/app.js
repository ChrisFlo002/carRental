import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from './middleware/errorHandler.js';
// Route files
import carRoutes from './routes/carRoutes.js';
import clientRoutes from'./routes/clientRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import branchRoutes from './routes/branchRoutes.js';

// Load env vars
dotenv.config();


const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security middleware
app.use(helmet());
app.use(cors());

// Mount routers
app.use('/api/v1/cars', carRoutes);
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/maintenance', maintenanceRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/branches', branchRoutes);

// Error handler middleware (should be last)
app.use(errorHandler);

export default app;