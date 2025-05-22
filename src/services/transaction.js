import Transaction from "../db/models/transaction.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllTransactions = async ({page = 1, perPage = 10}) => {
  const skip = (page-1) * perPage;
  const data = await Transaction.find().skip(skip).limit(perPage);
  const totalItems = await Transaction.find().countDocuments();
  const paginationData = calculatePaginationData({page , perPage,totalItems });
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

export const updateTransaction = async (transactionId, payload, options = {}) => {
  const rawResult = await Transaction.findOneAndUpdate(
    { _id: transactionId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if(!rawResult || !rawResult.value){
    return null;
  };

  return {
    transaction: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteTransactionById = async (transactionId) =>
  Transaction.findOneAndDelete({ _id: transactionId });