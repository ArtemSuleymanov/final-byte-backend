import { sortList } from '../constants/index.js';
import Transaction from '../db/models/transaction.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllTransactions = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters = {}
}) => {
  const skip = (page - 1) * perPage;
  const transactionsQuery = Transaction.find();
  if (filters.userId) {
    transactionsQuery.where('userId').equals(filters.userId);
  }

  if (filters.type) {
    transactionsQuery.where("type").equals(filters.type);
  }
  if (filters.category) {
    transactionsQuery.where("category").equals(filters.category);
  }
  if (filters.minTransactionDate) {
    transactionsQuery.where("date").gte(filters.minTransactionDate);
  }
  if (filters.maxTransactionDate) {
    const endOfDay = new Date(filters.maxTransactionDate);
    endOfDay.setHours(24, 0, 0, 0);
    transactionsQuery.where("date").lte(endOfDay);
  }

  const data = await transactionsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

const totalItems = await transactionsQuery.clone().countDocuments();
  const paginationData = calculatePaginationData({ page, perPage, totalItems });

  return {
    data,
    totalItems,
    ...paginationData,
  };
};

export const createTransaction = async (payload) => {
  const transaction = await Transaction.create(payload);
  return transaction;
};      

export const updateTransaction = async ( userId,
  _id,
  payload,
  options = {},
) => {
  const rawResult = await Transaction.findOneAndUpdate(
    { _id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) {
    return null;
  }

  return {
    transaction: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteTransactionById = async (transactionId, userId) =>
  Transaction.findOneAndDelete({ _id: transactionId,  userId});
