import createHttpError from 'http-errors';
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransactionById
} from '../services/transaction.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import Transaction from '../db/models/transaction.js';

export const getTransactionsController = async (req, res, next) => {
  try {
    const paginationParams = parsePaginationParams(req.query);
    const transactions = await getAllTransactions({ ...paginationParams });

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


export const getMonthlySummaryController = async (req, res) => {
  try {
    const { yearMonth } = req.params;
    const [year, month] = yearMonth.split('-').map(Number);

    if (!year || !month || month < 1 || month > 12) {
      return res.status(400).json({ message: 'Invalid year or month format (use YYYY-MM)' });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1); // ексклюзивно

    const transactions = await Transaction.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lt: endDate
          }
        }
      },
      {
        $group: {
          _id: {
            type: "$type",
            category: "$category"
          },
          totalAmount: { $sum: "$amount" }
        }
      }
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
        expense: totalExpense
      }
    });

  } catch (error) {
    console.error("Error in getMonthlySummary:", error);
    res.status(500).json({ message: 'Server error' });
  }
};