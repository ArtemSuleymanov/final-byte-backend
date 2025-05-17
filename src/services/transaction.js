import Transaction from '../db/models/transaction.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { sortList } from '../constants/index.js';

export const getAllTransactions = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters ={}
}) => {
  const skip = (page - 1) * perPage;
  const transactionsQuery = Transaction.find();
 if(filters.type) {
  transactionsQuery.where("type").equals(filters.type);
 }
 if(filters.category) {
  transactionsQuery.where("category").equals(filters.category);
 }
 if(filters.minTrabsactionDate){
  transactionsQuery.where("date").gte(filters.minTrabsactionDate);
 }
if(filters.maxTrabsactionDate){
  transactionsQuery.where("date").lte(filters.maxTrabsactionDate);
 }

  const data = await transactionsQuery.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await Transaction.find().merge(transactionsQuery).countDocuments();
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

export const updateTransaction = async (
  transactionId,
  payload,
  options = {},
) => {
  const rawResult = await Transaction.findOneAndUpdate(
    { _id: transactionId },
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

export const deleteTransactionById = async (transactionId) =>
  Transaction.findOneAndDelete({ _id: transactionId });
