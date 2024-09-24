import { Router } from "express";
import { signInUser, signUpUser } from "../controllers/authController";

const router = Router();

router.post("/signUp", signUpUser);
router.get("/signIn", signInUser);

export default router;
