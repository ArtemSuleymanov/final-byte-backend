import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = paramName => {
    const func = async(req, res, next ) =>{
        try {
              const id = req.params[paramName];
              if (!isValidObjectId(id)) {
                throw createHttpError(400, `${id} is not a valid id`);
              }
              next();
            } catch (error) {
              next(createHttpError(400, error.message));
            }
    };
    return func;
};