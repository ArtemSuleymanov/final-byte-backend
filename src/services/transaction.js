import { sortList } from '../constants/index.js';
import Transaction from '../db/models/transaction.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllTransactions = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const filter = {};
  if (filters.userId) filter.userId = filters.userId;
  if (filters.type) filter.type = filters.type;
  if (filters.category) filter.category = filters.category;
  if (filters.minTransactionDate || filters.maxTransactionDate) {
    filter.date = {};
    if (filters.minTransactionDate) {
      filter.date.$gte = filters.minTransactionDate;
    }
    if (filters.maxTransactionDate) {
      const endOfDay = new Date(filters.maxTransactionDate);
      endOfDay.setHours(23, 59, 59, 999);
      filter.date.$lte = endOfDay;
    }
  }

  const [data, totalItems] = await Promise.all([
    Transaction.find(filter)
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),

    Transaction.countDocuments(filter),
  ]);

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

export const updateTransaction = async (userId, _id, payload, options = {}) => {
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
  Transaction.findOneAndDelete({ _id: transactionId, userId });
