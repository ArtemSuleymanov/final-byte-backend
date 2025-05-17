import createHttpError from 'http-errors';
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransactionById
} from '../services/transaction.js';
import { parsePaginationParams,  } from '../utils/parsePaginationParams.js';
import { parseSortParams,  } from '../utils/parseSortParams.js';
export const getTransactionsController = async (req, res, next) => {
  try {
    const paginationParams = parsePaginationParams(req.query);
   const sortParams = parseSortParams(req.query);

    const transactions = await getAllTransactions({ ...paginationParams, ...sortParams });

    res.json({
      status: 200,
      message: "Successfully found transactions",
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const createTransactionController = async (req, res, next) => {
  try {
    const transaction = await createTransaction(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a transaction',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransactionController = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const resultat = await updateTransaction(transactionId, req.body);

    if (!resultat) {
      throw createHttpError(404, 'Transaction not found');
    }

    res.json({
      status: 200,
      message: 'Successfully updated a transaction',
      data: resultat.transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransactionController = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const data = await deleteTransactionById(transactionId);

    if (!data) {
      throw createHttpError(404, `Transaction with ID ${transactionId} not found`);
    }

    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};
