import { Router } from 'express';
import { isValidId } from "../middlewares/isValidId.js";
import ctrlWrapper from '../middlewares/ctrlWrapper.js';
import { validateBody } from "../utils/validateBody.js";

import { createTransactionController, updateTransactionController, deleteTransactionController, getTransactionsController} from '../controllers/transaction.js';
import { transactionAddSchema, transactionUpdateSchema } from "../validation/transaction.js";

const TransactionRouter = Router();

TransactionRouter.get('/', ctrlWrapper(getTransactionsController));

TransactionRouter.post(
  '/',
  validateBody(transactionAddSchema),
  ctrlWrapper(createTransactionController)
);

TransactionRouter.patch(
  '/:transactionId',
  isValidId("transactionId"),
  validateBody(transactionUpdateSchema),
  ctrlWrapper(updateTransactionController)
);

TransactionRouter.delete('/:transactionId',isValidId("transactionId"), ctrlWrapper(deleteTransactionController));

export default TransactionRouter;

