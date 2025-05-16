import { Router } from 'express';
import {getTransactions} from '../controllers/transaction.js';

const TransactionRouter = Router();

TransactionRouter.get('/', getTransactions);

export default TransactionRouter;
