import { Router } from "express";
import {
  createTransaction,
  getAllTransactions,
} from "../controllers/transactionController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createTransaction);
router.get("/", protect, getAllTransactions);

export default router;
