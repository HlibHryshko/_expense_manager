import { Router, RequestHandler } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createCategory,
  getAllCategories,
  getCategoryExpenses,
} from "../controllers/categoryController";

const router = Router();

router.post("/", protect as RequestHandler, createCategory);
router.get("/", protect as RequestHandler, getAllCategories);
router.get("/expenses", protect as RequestHandler, getCategoryExpenses);

export default router;
