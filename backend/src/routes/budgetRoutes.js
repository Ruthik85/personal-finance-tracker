const express = require('express');
const { getBudgets, setBudget, deleteBudget } = require('../controllers/budgetController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// All budget routes are protected by JWT authentication
router.get('/', verifyToken, getBudgets);
router.post('/', verifyToken, setBudget);
router.delete('/:id', verifyToken, deleteBudget);

module.exports = router;