const express = require('express');
const router = express.Router();
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController'); 


router.get('/api/expenses', getExpenses);
router.post('/api/expenses', addExpense);
router.put('/api/expenses/:id', updateExpense); 
router.delete('/api/expenses/:id', deleteExpense);

module.exports = router;
