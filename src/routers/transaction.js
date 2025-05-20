import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import ctrlWrapper from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {authenticate} from '../middlewares/authenticate.js';
import {
  createTransactionController,
  updateTransactionController,
  deleteTransactionController,
  getTransactionsController,
  getMonthlySummaryController,
} from '../controllers/transaction.js';
import {
  transactionAddSchema,
  transactionUpdateSchema,
} from '../validation/transaction.js';

const TransactionRouter = Router();
TransactionRouter.use(authenticate);
TransactionRouter.get('/', ctrlWrapper(getTransactionsController));

TransactionRouter.post(
  '/',
  validateBody(transactionAddSchema),
  ctrlWrapper(createTransactionController),
);

TransactionRouter.patch(
  '/:transactionId',
  isValidId,
  validateBody(transactionUpdateSchema),
  ctrlWrapper(updateTransactionController),
);

TransactionRouter.delete(
  '/:transactionId',
  isValidId('transactionId'),
  ctrlWrapper(deleteTransactionController),
);

export default TransactionRouter;

TransactionRouter.get(
  '/summary/:yearMonth',
  ctrlWrapper(getMonthlySummaryController),
);
