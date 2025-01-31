import express from 'express';
import { getTotalExpenses, getCategoryExpenses, getMonthlyExpenses } from '../controllers/stats.controller.js';
import protectRoute from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/total-expenses',protectRoute, getTotalExpenses);

router.get('/category-expenses', protectRoute,getCategoryExpenses);

router.get('/monthly-expenses',protectRoute, getMonthlyExpenses);

export default router;
