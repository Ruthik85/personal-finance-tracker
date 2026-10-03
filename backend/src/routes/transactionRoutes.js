const express = require('express');
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactionController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// All routes here are protected by verifyToken middleware
router.get('/', verifyToken, getTransactions);
router.post('/', verifyToken, addTransaction);
router.delete('/:id', verifyToken, deleteTransaction);

module.exports = router;