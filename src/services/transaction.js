import Transaction from '../db/models/transaction.js';

export const getAllTransactions = async () => {
  return await Transaction.find();
};
     
export async function createTransaction(data) {
  const transaction = new Transaction(data);
  return await transaction.save();
}

export async function updateTransaction(id, data) {
  return await Transaction.findByIdAndUpdate(id, data, { new: true });
}
