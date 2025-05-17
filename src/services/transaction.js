import Transaction from "../db/models/transaction.js";

export const getAllTransactions = async () => {
  return await Transaction.find();
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
