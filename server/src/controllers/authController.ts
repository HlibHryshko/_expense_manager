import { Request, Response } from "express";
import { IPerson, Person } from "../models/Person";
import bcrypt from "bcryptjs";
import { signJwt } from "../utils/jwt";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as RegisterRequest;
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
    const token = signJwt(newUser._id!.toString());
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginRequest;
  try {
    // Check if the user exists
    const user: IPerson | null = await Person.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = signJwt(user._id!.toString());

    // Respond with the token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
