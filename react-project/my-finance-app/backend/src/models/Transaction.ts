import mongoose, { Schema, Document } from "mongoose";

interface ITransaction extends Document {
  type: string;
  amount: number;
  description: string;
}

const transactionSchema: Schema = new Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
});

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);

export default Transaction;
