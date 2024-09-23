import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import connectToDB from "./config/db_configuration";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing JSON requests

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Expense Tracker API");
});

connectToDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
