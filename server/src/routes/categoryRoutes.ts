import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import { createCategory } from "../controllers/categoryController";

const router = Router();

router.post("/", protect, createCategory);

export default router;
