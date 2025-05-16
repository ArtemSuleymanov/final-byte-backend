import { Router } from 'express';

import * as transactionController from '../controllers/transaction.js';

const TransactionRouter = Router();

TransactionRouter.get('/', transactionController.getTransactions);
TransactionRouter.post('/', transactionSchema, create);
TransactionRouter.put('/:TransactionId', transactionSchema, update);

export default TransactionRouter;
