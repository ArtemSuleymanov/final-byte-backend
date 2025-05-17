import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
  requestResetToken,
} from "../services/auth.js";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { getEnvVar } from "../utils/getEnvVar.js";
// import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js";

// const setupSession = (res, session) => {
//   res.cookie('refreshToken', session.refreshToken, {
//     httpOnly: true,
//     expires: session.refreshTokenValidUntil,
//   });
//   res.cookie('sessionId', session._id, {
//     httpOnly: true,
//     expires: session.refreshTokenValidUntil,
//   });
// };

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const { _id, name, email, createdAt, updatedAt } = user;

  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    data: { _id, name, email, createdAt, updatedAt },
  });
};

//   export const loginController = async(req,res) => {
//     const session = await loginUser(req.body);

//     setupSession(res, session);

//     res.json({
//       status: 200,
//       message: 'Successfully logged in an user!',
//       data: {
//         accessToken: session.accessToken,
//       },
//     });
//   };

//   export const refreshController = async(req,res) =>{
//     const session = await refreshUser(req.cookies);

//     setupSession(res, session);

//     res.json({
//       status: 200,
//       message: "Successfully refreshed a session!",
//       data: {
//         accessToken: session.accessToken,
//       },
//     });
//   };

//   export const logoutController = async(req,res) => {
//     if (req.cookies.sessionId) {
//       await logoutUser(req.cookies.sessionId);
//     }

//     res.clearCookie('sessionId');
//     res.clearCookie('refreshToken');

//     res.status(204).send();
//   };

//   export const requestResetEmailController = async (req,res) =>{
//     await requestResetToken(req.body.email);

//     res.json({
//       status: 200,
//       message: "Reset password email has been successfully sent.",
//       data: {}
//   });
//   };

//   export const resetPwd = async(req,res) =>{
//     const {token, password} = req.body;

//     let payload;
//     try {
//       payload = jwt.verify(token, getEnvVar('JWT_SECRET'));
//     } catch{
//       throw createHttpError(401, "Token is expired or invalid.");
//     }

//     const user = await UsersCollection.findOne({email: payload.email});

//     if (!user) {
//       throw createHttpError(404, "User not found!");
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     user.password = hashedPassword;
//     user.sessionToken = null;
//     await user.save();

//     res.status(200).json(   {
//       status: 200,
//       message: "Password has been successfully reset.",
//       data: {}
//   }
// );
//   };
