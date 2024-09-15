import mongoose, { Schema, Document } from "mongoose";

// הגדרת הסוג של הדוקומנט
interface ITransaction extends Document {
  type: string;
  amount: number;
  description?: string;
}

// הגדרת הסכימה
const transactionSchema: Schema = new Schema({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
});

// יצירת המודל
const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);

export default Transaction;
