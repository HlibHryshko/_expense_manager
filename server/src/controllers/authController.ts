import { Request, Response } from "express";
import { IPerson, Person } from "../models/Person";
import bcrypt from "bcryptjs";
import { signJwt } from "../utils/jwt";
import { OAuth2Client } from "google-auth-library";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    if (!user.password) {
      return res
        .status(400)
        .json({ message: "This user is registered through Google Account" });
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

export const loginOauthUser = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    // Verify the token using Google OAuth2 client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure this matches your frontend client ID
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res
        .status(400)
        .json({ error: "Google token verification failed" });
    }

    const { email, sub: googleId, name } = payload;

    // Check if a user with this Google ID already exists
    let user = await Person.findOne({ googleId });

    if (!user) {
      // If not, check if a user with this email exists
      user = await Person.findOne({ email });

      if (user) {
        // Link Google account to existing user by adding googleId
        user.googleId = googleId;
      } else {
        // If no user exists, create a new one
        user = new Person({ email, googleId, name });
      }

      await user.save();
    }

    // Generate JWT
    const jwtToken = signJwt(user._id!.toString());
    return res.json({ token: jwtToken, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
