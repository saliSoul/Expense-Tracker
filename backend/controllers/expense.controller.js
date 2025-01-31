import Expense from '../models/Expense.model.js';
import mongoose from 'mongoose';
export const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).populate('category');
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
      const { id } = req.params;
      const expense = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ success: false, message: "Invalid Expense ID" });
      }

      const updatedExpense = await Expense.findByIdAndUpdate(id, expense, { new: true });
      if (!updatedExpense) {
          return res.status(404).json({ success: false, message: "Expense not found" });
      }


      res.status(200).json({ success: true, data: updatedExpense });
  } catch (error) {
      console.error("Error occurred:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const deleteExpense = async (req,res)=>{ // it will dynamic
  const {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Expense ID" });
  }
  try{
      await Expense.findByIdAndDelete(id);
      res.status(200).json({success:true, message:"Expense deleted"});
  }catch(error){
      console.log("Error in Finding Expense" , error.message);
      res.status(500).json({success:false, message:"Server Error"});
  }
};