import Category from '../models/Category.model.js';
import Expense from '../models/Expense.model.js';

export const expenseService = {
  ExpenseService: {
    ExpensePort: {
      async getExpensesByCategory(args) {
        const { userId, categoryName } = args;
        try {
          const category = await Category.findOne({ name: categoryName, user: userId });
          if (!category) {
            return { expenses: '', error: 'Category not found' }; // Empty string for expenses
          }

          const expenses = await Expense.find({ category: category._id, user: userId });
          const expenseDetails = expenses.map(e => 
            `ID: ${e._id}, Amount: ${e.amount}, Description: ${e.description || 'No description provided'}`
          ).join('; ');
          

          return { 
            expenses: expenseDetails || '', // Empty string if no expenses
            error: '', // No error
          };
        } catch (error) {
          return { 
            expenses: '', 
            error: error.message || 'An unknown error has occurred', // Non-null error
          };
        }
      },
    },
  },
};
