import createHttpError from 'http-errors';
import {getAllTransactions, createTransaction, updateTransaction} from '../services/transaction.js';

export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await getAllTransactions();
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export const createTransactionController = async (req, res) => {
    const transaction = await createTransaction(req.body);

    res.status(201).json({
    status: 201,
    message: 'Successfully created a transaction',
    data: transaction
  });
  
};

export const updateTransactionController = async (req, res) => {
  const { transactionId } = req.params;
  const resultat = await updateTransaction(transactionId, req.body);

  if(!resultat) {
    throw createHttpError(404, 'Transaction not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a transaction',
    data: resultat.transaction,
  });
   
};
