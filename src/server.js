import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from './routers/auth.js';
import TransactionRouter from './routers/transaction.js';
import {notFoundHandler} from "./middlewares/notFoundHandler.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import { getEnvVar } from './utils/getEnvVar.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use("/auth", authRouter);
  app.use("/transactions", TransactionRouter);

  app.use("/api-docs", swaggerDocs());
 

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};