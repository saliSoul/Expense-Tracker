import express from 'express';
import protectRoute from '../middlewares/auth.middleware.js'; // Import the middleware
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/createCategory', protectRoute, createCategory);
router.get('/', protectRoute, getCategories);
router.put('/updateCategory/:id', protectRoute, updateCategory);
router.delete('/:id', protectRoute, deleteCategory);

export default router;
