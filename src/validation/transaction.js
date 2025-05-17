import Joi from 'joi';

export const transactionAddSchema = Joi.object({
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().required(),
  amount: Joi.number().min(0).max(1000000).required(),
  date: Joi.date().required(),
  comment: Joi.string().min(2).max(192)
});

export const transactionUpdateSchema = Joi.object({
  type: Joi.string().valid('income', 'expense'),
  category: Joi.string(),
  amount: Joi.number().min(0).max(1000000),
  date: Joi.date(),
  comment: Joi.string().min(2).max(192)
});
