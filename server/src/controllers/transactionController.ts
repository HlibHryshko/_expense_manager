import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { log } from "console";
import { Category, ICategory } from "../models/Category";

export const createTransaction = async (req: Request, res: Response) => {
  const { amount, category, description, date } = req.body;
  try {
    const newCategory: ICategory = await Category.create(category);

    const newTransaction = await Transaction.create({
      amount,
      date,
      category: newCategory._id,
      description,
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
