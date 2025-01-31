import Expense from '../models/Expense.model.js'; // Modèle des dépenses

// Statistiques sur le total des dépenses
export const getTotalExpenses = async (req, res) => {
  try {
    const totalExpenses = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }  // Somme totale des dépenses
    ]);
    res.json({ totalExpenses: totalExpenses[0].total });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du total des dépenses' });
  }
};

// Statistiques sur les dépenses par catégorie
export const getCategoryExpenses = async (req, res) => {
  try {
    const categoryExpenses = await Expense.aggregate([
      { $group: { _id: '$category', total: { $sum: '$amount' } } },  // Somme des dépenses par catégorie
      { $sort: { total: -1 } }  // Tri des catégories par montant décroissant
    ]);
    res.json({ categoryExpenses });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des dépenses par catégorie' });
  }
};

// Statistiques sur les dépenses mensuelles
export const getMonthlyExpenses = async (req, res) => {
  try {
    const monthlyExpenses = await Expense.aggregate([
      {
        $project: {
          month: { $month: '$date' },
          year: { $year: '$date' },
          amount: 1,
        },
      },
      {
        $group: {
          _id: { year: '$year', month: '$month' },
          totalExpenses: { $sum: '$amount' },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);
    res.json({ monthlyExpenses });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des dépenses mensuelles' });
  }
};
