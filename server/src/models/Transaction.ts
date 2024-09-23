import mongoose, { Schema, Document } from "mongoose";

interface ITransaction extends Document {
  amount: number;
  category: mongoose.Types.ObjectId;
  date: Date;
  description: string;
}

const TransactionSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
