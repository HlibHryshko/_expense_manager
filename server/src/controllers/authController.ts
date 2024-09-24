import { Request, Response } from "express";
import { IPerson, Person } from "../models/Person";
import bcrypt from "bcryptjs";
import { signJwt } from "../utils/jwt";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await Person.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IPerson = await Person.create({
      name,
      email,
      password: hashedPassword,
    });

    if (typeof newUser._id !== "string") {
      throw new Error("wrong id type");
    }
    const token = signJwt(newUser._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
