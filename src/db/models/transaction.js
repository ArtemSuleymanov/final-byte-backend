import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true, min: 0, max: 1000000 },
  date: { type: Date, required: true },
  comment: { type: String, maxlength: 192 },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
