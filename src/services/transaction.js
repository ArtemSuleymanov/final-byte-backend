import Transaction from "../db/models/transaction.js";

export const getAllTransactions = async () => {
  return await Transaction.find();
};