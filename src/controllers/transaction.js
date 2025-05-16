import { getAllTransactions} from '../services/transaction.js';
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


