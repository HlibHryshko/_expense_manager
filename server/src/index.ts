import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import connectToDB from "./config/db_configuration";
import cors from "cors";
import passport from "passport";
import session from "express-session";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing JSON requests

app.use(cors());

// Express session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key", // secret is required
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Cookies will only be sent over HTTPS in production
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/api/test", (req: Request, res: Response) => {
  res.status(200).send("Expense Tracker API is listening");
});

connectToDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
