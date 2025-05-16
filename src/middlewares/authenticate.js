import createHttpError from "http-errors";
import { SessionsCollection } from "../db/models/session.js";
import User from "../db/models/user.js";

export const authenticate = async (req, res, next) => {
    try {
      const authHeader = req.get('Authorization');
  
      if (!authHeader) {
        return next(createHttpError(401, 'Please provide Authorization header'));
      }
  
      const [bearer, token] = authHeader.split(' ');
  
      if (bearer !== 'Bearer' || !token) {
        return next(createHttpError(401, 'Auth header should be of type Bearer'));
      }
  
      const session = await SessionsCollection.findOne({ accessToken: token });
  
      if (!session) {
        return next(createHttpError(401, 'Session not found'));
      }
  
      const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
  
      if (isAccessTokenExpired) {
        return next(createHttpError(401, 'Access token expired'));
      }
  
      const user = await User.findById(session.userId);
  
      if (!user) {
        return next(createHttpError(401, 'User not found'));
      }
  
      req.user = user;
      next();
    } catch (error) {
      next(createHttpError(500, error.massage));
    }
  };
  