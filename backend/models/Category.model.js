import mongoose from 'mongoose';

const categorySchema = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      minlength: [4, 'Category name must be at least 4 characters long'] 
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Ensure each user can have only one category with a given name
categorySchema.index({ user: 1, name: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;
