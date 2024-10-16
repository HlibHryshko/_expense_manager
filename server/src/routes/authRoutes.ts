import { Router } from "express";
import {
  registerUser,
  loginUser,
  loginOauthUser,
} from "../controllers/authController";
import passport from "passport";

const router = Router();

// Route to start the Google OAuth process
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route for Google to redirect to after the user authenticates
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // On success, redirect to the frontend
    res.redirect("http://localhost:5173/dashboard");
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/oauth/google", loginOauthUser);

export default router;
