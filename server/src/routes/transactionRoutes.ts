import { Router } from "express";
import { createTransaction } from "../controllers/transactionController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createTransaction);

export default router;
