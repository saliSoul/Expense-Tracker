import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
import statsRoutes from './routes/stats.route.js';
import categoryRoutes from './routes/category.route.js';
import expenseRoutes from './routes/expense.route.js';
import soap from 'soap';
import { expenseService } from './services/soapServices.js';
import { wsdlDefinition } from './services/wsdlDefinition.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5007;

// Middleware
app.use(cookieParser());
app.use(express.json());

// REST API routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/stats", statsRoutes);

// SOAP Service
soap.listen(app, '/wsdl', expenseService, wsdlDefinition, () => {
  console.log(`SOAP service running at http://localhost:${PORT}/wsdl`);
});

// Connect to database and start server
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
