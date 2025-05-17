import createHttpError from 'http-errors';
import { deleteTransactionById, getAllTransactions} from '../services/transaction.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getTransactionsController = async (req, res, next) => {
   const paginationParams = parsePaginationParams(req.query);
    const transactions = await getAllTransactions({...paginationParams});
 
    res.json({
      status:200,
      message:"Successfuly find transactions",
      data:transactions,
    });
 
  };


  export const deleteTransactionController = async (req, res) => {
  const { transactionId } = req.params;

  const data = await deleteTransactionById(transactionId );
  if (!data) {
    throw createHttpError(404, `Transaction with ${transactionId} not found`);
  }
  res.status(204).send();
};

