const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: {
        date: 'desc'
      }
    });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter gastos' });
  }
};


const addExpense = async (req, res) => {
  const { description, amount } = req.body;
  try {
    const expense = await prisma.expense.create({
      data: { description, amount }
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar gasto' });
  }
};


const updateExpense = async (req, res) => {
  const { id } = req.params; 
  const { description, amount } = req.body; 

  try {
    const expense = await prisma.expense.update({
      where: { id: Number(id) }, 
      data: { description, amount } 
    });
    res.status(200).json(expense); 
  } catch (err) {
    
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Gasto não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao atualizar gasto' });
  }
};


const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.expense.delete({
      where: { id: Number(id) }
    });
    res.status(200).json({ message: 'Gasto removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover gasto' });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense, 
  deleteExpense
};
