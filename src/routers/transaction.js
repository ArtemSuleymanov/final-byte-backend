import { Router } from 'express';
import * as transactionController from '../controllers/transaction.js';

const TransactionRouter = Router();

TransactionRouter.get('/transactions', transactionController.getTransactions);

export default TransactionRouter;
