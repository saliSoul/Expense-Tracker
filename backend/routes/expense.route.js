import express from "express";
import { createExpense, getExpenses,updateExpense,deleteExpense } from '../controllers/expense.controller.js';
import protectRoute from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post("/createExpense",protectRoute, createExpense);
router.put("/:id", protectRoute, updateExpense);
router.get("/",protectRoute, getExpenses);
router.delete("/:id",protectRoute, deleteExpense); 

export default router;
