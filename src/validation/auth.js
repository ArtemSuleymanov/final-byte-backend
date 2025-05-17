import Joi from 'joi';

import { emailRegexp } from '../constants/auth.js';

export const authRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(32).required(),
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).max(64).required(),
  password: Joi.string().min(8).max(64).required(),
});
