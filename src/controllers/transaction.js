import {getAllTransactions} from '../services/transaction.js';

export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await getAllTransactions();
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export async function create(req, res) {
  try {
    const transaction = await createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Error creating transaction' });
  }
};

export async function update(req, res) {
  try {
    const transaction = await updateTransaction(req.params.id, req.body);
    if (!transaction) return res.status(404).json({ error: 'Not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Error updating transaction' });
  }
};
