import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { IPerson, Person } from "../models/Person";
import { Category } from "../models/Category";
import { Model } from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: string;
}

interface CreateRequest {
  amount: number;
  category: string;
  date: Date;
  description: string;
}

export const createTransaction = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { amount, category, description, date }: CreateRequest = req.body;
  try {
    if (!req.user) {
      res.status(500).json({ message: "User is not Authenticated" });
    }

    const newTransaction = await Transaction.create({
      amount,
      date,
      category,
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

    // Add transaction to the category's list of transactions
    const updatedCategory = await Category.findByIdAndUpdate(
      category,
      { $push: { transactions: newTransaction._id } },
      { new: true }
    );

    if (!updatedCategory) {
      await Transaction.findByIdAndDelete(newTransaction._id);
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTransactions = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      res.status(500).json({ message: "User is not Authenticated" });
    }

    const user = await Person.findOne({ _id: req.user });

    if (!user) {
      // Handle case where user is not found
      return;
    }

    const transactions = await Transaction.find({
      _id: { $in: user.transactions },
    })
      .sort({ date: -1 })
      .populate("category", "name icon");

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
