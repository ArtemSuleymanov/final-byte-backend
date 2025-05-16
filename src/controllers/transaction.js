import * as transactionService from '../services/transaction.js';

export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};
