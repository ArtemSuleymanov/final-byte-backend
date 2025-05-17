import { Router } from 'express';
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../utils/validateBody.js";

import {getTransactions, createTransactionController, updateTransactionController} from '../controllers/transaction.js';
import { transactionAddSchema, transactionUpdateSchema } from "../validation/transaction.js";

const TransactionRouter = Router();

TransactionRouter.get('/', getTransactions);
TransactionRouter.post('/', validateBody(transactionAddSchema), createTransactionController);
TransactionRouter.patch('/:transactionId', isValidId, validateBody(transactionUpdateSchema), updateTransactionController);

export default TransactionRouter;
