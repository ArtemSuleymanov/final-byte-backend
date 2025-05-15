import httpErrors from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  next(httpErrors(404, 'Route not found'));
};