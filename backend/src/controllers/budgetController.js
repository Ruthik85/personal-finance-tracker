const prisma = require('../prisma');

// Get all budgets for the logged-in user
const getBudgets = async (req, res) => {
  try {
    const userId = req.user.userId;
    const budgets = await prisma.budget.findMany({
      where: { userId },
      orderBy: { category: 'asc' },
    });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch budgets', details: error.message });
  }
};

// Set or update a budget for a specific category
const setBudget = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { category, amount, month } = req.body;

    if (!category || !amount) {
      return res.status(400).json({ error: 'Category and amount are required fields.' });
    }

    // Check if a budget for this category & month already exists for the user
    // (Upsert pattern: update if exists, create if it doesn't)
    const budget = await prisma.budget.upsert({
      where: {
        // Assuming unique constraint on user-category-month or handling via findFirst/create
        // If your schema uses a compound unique key or ID, adjust accordingly. 
        // Here we use a safe query approach:
        userId_category: { userId, category } // Adjust if your schema has a unique constraint name
      },
      update: {
        amount: parseFloat(amount),
        month: month || new Date().toISOString().slice(0, 7), // e.g., "2026-10"
      },
      create: {
        category,
        amount: parseFloat(amount),
        month: month || new Date().toISOString().slice(0, 7),
        userId,
      },
    }).catch(async () => {
      // Fallback if compound index isn't explicitly named in Prisma client yet
      const existing = await prisma.budget.findFirst({
        where: { userId, category }
      });
      if (existing) {
        return prisma.budget.update({
          where: { id: existing.id },
          data: { amount: parseFloat(amount) }
        });
      }
      return prisma.budget.create({
        data: {
          category,
          amount: parseFloat(amount),
          month: month || new Date().toISOString().slice(0, 7),
          userId,
        }
      });
    });

    res.status(201).json({ message: 'Budget saved successfully', budget });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set budget', details: error.message });
  }
};

// Delete a budget
const deleteBudget = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const budget = await prisma.budget.findUnique({
      where: { id: parseInt(id) },
    });

    if (!budget || budget.userId !== userId) {
      return res.status(404).json({ error: 'Budget not found or unauthorized' });
    }

    await prisma.budget.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete budget', details: error.message });
  }
};

module.exports = { getBudgets, setBudget, deleteBudget };