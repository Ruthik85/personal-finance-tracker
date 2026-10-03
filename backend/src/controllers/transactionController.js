const prisma = require('../prisma');

// Get all transactions for the logged-in user
const getTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions', details: error.message });
  }
};

// Add a new transaction (income or expense)
const addTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, type, category, date } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({ error: 'Amount, type, and category are required fields.' });
    }

    const transaction = await prisma.transaction.create({
      data: {
        title: category,
        amount: parseFloat(amount),
        type,
        category,
        date: date ? new Date(date) : undefined,
        userId,
      },
    });

    res.status(201).json({ message: 'Transaction added successfully', transaction });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add transaction', details: error.message });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Verify the transaction belongs to the user before deleting
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });

    if (!transaction || transaction.userId !== userId) {
      return res.status(404).json({ error: 'Transaction not found or unauthorized' });
    }

    await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction', details: error.message });
  }
};

module.exports = { getTransactions, addTransaction, deleteTransaction };