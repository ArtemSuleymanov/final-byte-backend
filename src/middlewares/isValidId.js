import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
  const { contactId: transactionId } = req.params;

  if (!isValidObjectId(transactionId)) {
    return next(createHttpError(404, 'Invalid ID'));
  }

  next();
};

