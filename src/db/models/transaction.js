import mongoose from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { categoriesList, typeList } from '../../constants/transactions.js';
const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: typeList, required: true },
  category: {
    type: String,
    enum:categoriesList,
    required: true,
  },
  amount: { type: Number, required: true, min: 0, max: 1000000 },
  date: { type: Date, required: true },
  comment: { type: String, maxlength: 192 },
});

transactionSchema.post('save', handleSaveError);
transactionSchema.pre('findOneAndUpdate', setUpdateSettings);
transactionSchema.post('findOneAndUpdate', handleSaveError);
export const transactionsSortFields =  ['amount', 'date' ];

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
