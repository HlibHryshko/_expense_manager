import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createCategory,
  getAllCategories,
  getCategoryExpenses,
} from "../controllers/categoryController";

const router = Router();

router.post("/", protect, createCategory);
router.get("/", protect, getAllCategories);
router.get("/expenses", protect, getCategoryExpenses);

export default router;
