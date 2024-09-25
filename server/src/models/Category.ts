import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  icon: string;
  transactions: mongoose.Types.ObjectId[];
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
});

export const Category = mongoose.model<ICategory>("Category", CategorySchema);
