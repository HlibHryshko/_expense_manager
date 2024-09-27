import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";
import { Category, ICategory } from "../models/Category";
import { Person } from "../models/Person";
import { log } from "console";

interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with your actual user type
}

interface CreateRequest {
  name: string;
  icon: string;
}

export const createCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { name, icon }: CreateRequest = req.body;
  try {
    if (!req.user) {
      res.status(500).json({ message: "User is not Authenticated" });
    }

    const newCategory = await Category.create({ name, icon });

    // Add category to the person's list of categories
    const updatedPerson = await Person.findByIdAndUpdate(
      req.user,
      { $push: { categories: newCategory._id } },
      { new: true }
    );

    if (!updatedPerson) {
      await Category.findByIdAndDelete(newCategory._id);
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCategories = async (
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

    const categories = await Category.find({
      _id: { $in: user.categories },
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategoryExpenses = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { startDate, endDate } = req.query;

  try {
    if (!req.user) {
      res.status(500).json({ message: "User is not Authenticated" });
    }

    // Aggregation pipeline to calculate total amount spent per category
    const categoryExpenses = await Category.aggregate([
      // Left join to transactions based on the category id
      {
        $lookup: {
          from: "transactions",
          localField: "_id",
          foreignField: "category",
          as: "transactions",
          pipeline: [
            {
              $match: {
                user: req.user._id, // Filter transactions by the user
                date: {
                  $gte: new Date(startDate as string),
                  $lte: new Date(endDate as string),
                },
              },
            },
          ],
        },
      },
      // Calculate the total amount for each category
      {
        $addFields: {
          totalAmount: {
            $sum: {
              $cond: {
                if: { $gt: [{ $size: "$transactions" }, 0] },
                then: { $sum: "$transactions.amount" },
                else: 0,
              },
            },
          },
        },
      },
      // Optionally, project only the needed fields
      {
        $project: {
          _id: 1,
          name: 1,
          totalAmount: 1,
        },
      },
    ]);

    res.status(200).json(categoryExpenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
