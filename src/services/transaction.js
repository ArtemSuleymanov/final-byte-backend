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

