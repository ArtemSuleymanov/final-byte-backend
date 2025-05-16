import { Router } from 'express';
import { getTransactionsController} from '../controllers/transaction.js';
import ctrlWrapper from '../middlewares/ctrlWrapper.js';

const TransactionRouter = Router();

TransactionRouter.get('/', ctrlWrapper(getTransactionsController));

export default TransactionRouter;

