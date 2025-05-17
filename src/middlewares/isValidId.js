import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!isValidObjectId(id)) {
      return next(createHttpError(400, `Invalid ID in param '${paramName}': ${id}`));
    }

    next();
  };
};
