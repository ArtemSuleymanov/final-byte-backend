import { Router } from 'express';
import { deleteTransactionController, getTransactionsController} from '../controllers/transaction.js';
import ctrlWrapper from '../middlewares/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const TransactionRouter = Router();

TransactionRouter.get('/', ctrlWrapper(getTransactionsController));


TransactionRouter.delete('/:transactionId',isValidId("transactionId"), ctrlWrapper(deleteTransactionController));

export default TransactionRouter;

