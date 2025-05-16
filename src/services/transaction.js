import Transaction from '../models/transaction.js';

export const getAllTransactions = async () => {
  return await Transaction.find();
};