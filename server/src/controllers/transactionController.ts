import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { Category, ICategory } from "../models/Category";
import { Person } from "../models/Person";

interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with your actual user type
}

export const createTransaction = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { amount, category, description, date } = req.body;
  try {
    const newCategory: ICategory = await Category.create(category);

    if (!req.user) {
      res.status(500).json({ message: "User is not Authenticated" });
    }

    const newTransaction = await Transaction.create({
      amount,
      date,
      category: newCategory._id,
      description,
    });

    // Add transaction to the person's list of transactions
    const updatedPerson = await Person.findByIdAndUpdate(
      req.user,
      { $push: { transactions: newTransaction._id } },
      { new: true }
    );

    if (!updatedPerson) {
      await Transaction.findByIdAndDelete(newTransaction._id);
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
