import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createCategory,
  getAllCategories,
} from "../controllers/categoryController";

const router = Router();

router.post("/", protect, createCategory);
router.get("/", protect, getAllCategories);

export default router;
