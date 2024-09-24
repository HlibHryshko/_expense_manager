import { Router } from "express";
import { registerUser } from "../controllers/authController";

const router = Router();

router.post("/signUp", registerUser);

export default router;
