import Joi from "joi";

import { emailRegexp } from "../constants/auth.js";

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(2).max(32).required(),
});

// export const authLoginSchema = Joi.object({
//   email: Joi.string().pattern(emailRegexp).required(),
//   password: Joi.string().min(6).required(),
// });

// export const requestResetEmailSchema = Joi.object({
//   email: Joi.string().email().required(),
// });

// export const resetPwdSchema = Joi.object({
//   token: Joi.string().required(),
//   password: Joi.string().min(6).required(),
// });
