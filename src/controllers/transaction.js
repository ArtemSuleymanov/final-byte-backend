import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransactionById,
} from '../services/transaction.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import Transaction, {
  transactionsSortFields,
} from '../db/models/transaction.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseTransactionsFilterParams } from '../utils/filters/parseTransactionsFilterParams.js';

export const getTransactionsController = async (req, res, next) => {


    const paginationParams = parsePaginationParams(req.query);
    const sortParams = parseSortParams(req.query, transactionsSortFields);

    const filters = parseTransactionsFilterParams(req.query);
       if (!req.user || !req.user._id) {
      throw createHttpError(401, 'Unauthorized');}
    filters.userId = req.user._id;
     
    
    const transactions = await getAllTransactions({
      ...paginationParams,
      ...sortParams,
      filters,
    });
    res.json({
      status: 200,
      message: 'Successfully found transactions',
      data: transactions,
    });
  
};

export const createTransactionController = async (req, res, next) => {

    const transaction = await createTransaction(req.body);

  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, transactionsSortFields);
  const filters = parseTransactionsFilterParams(req.query);
  if (!req.user || !req.user._id) {
    throw createHttpError(401, 'Unauthorized');
  }
  filters.userId = req.user._id;

  const transactions = await getAllTransactions({
    ...paginationParams,
    ...sortParams,
    filters,
  });
  res.json({
    status: 200,
    message: 'Successfully found transactions',
    data: transactions,
  });
};

export const createTransactionController = async (req, res, next) => {
   const { _id: userId } = req.user;

    if (!userId ) {
    throw createHttpError(401, 'Unauthorized');
  }
    const transaction = await createTransaction({...req.body, userId} );


    res.status(201).json({
      status: 201,
      message: 'Successfully created a transaction',
      data: transaction,
    });
  
 
};

export const updateTransactionController = async (req, res, next) => {

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
 
 
};

export const deleteTransactionController = async (req, res, next) => {


    const { transactionId } = req.params;
     const { _id: userId } = req.user;
    const data = await deleteTransactionById(transactionId, userId);

    if (!data) {
      throw createHttpError(
        404,
        `Transaction with ID ${transactionId} not found`,
      );
    }

    res.status(204).send();



};

export const getMonthlySummaryController = async (req, res, next) => {
  const { yearMonth } = req.params;
  const [year, month] = yearMonth.split('-').map(Number);

  if (!year || !month || month < 1 || month > 12) {
    return res
      .status(400)
      .json({ message: 'Invalid year or month format (use YYYY-MM)' });
  }

  if (!req.user || !req.user._id) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: user not authenticated' });
  }
  const { _id: userId } = req.user;

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 1); // ексклюзивна дата

  const transactions = await Transaction.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      },
    },
    {
      $group: {
        _id: {
          type: '$type',
          category: '$category',
        },
        totalAmount: { $sum: '$amount' },
      },
    },
  ]);

  const categorySummary = {};
  let totalIncome = 0;
  let totalExpense = 0;

  for (const t of transactions) {
    const { type, category } = t._id;
    if (!categorySummary[type]) categorySummary[type] = {};
    categorySummary[type][category] = t.totalAmount;

    if (type === 'income') {
      totalIncome += t.totalAmount;
    } else if (type === 'expense') {
      totalExpense += t.totalAmount;
    }
  }

  res.json({
    categorySummary,
    totals: {
      income: totalIncome,
      expense: totalExpense,
    },
  });
};
