import mongoose, { Schema, Document } from "mongoose";

export interface IPerson extends Document {
  name: string;
  email: string;
  password: string;
  transactions: mongoose.Types.ObjectId[];
  categories: mongoose.Types.ObjectId[];
}

const PersonSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

export const Person = mongoose.model<IPerson>("Person", PersonSchema);
