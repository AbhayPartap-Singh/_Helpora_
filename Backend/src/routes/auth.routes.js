import express from "express";
import passport from "passport";
import { googleCallback } from "../controllers/auth.controller.js";
const router = express.Router();

import {
  register,
  verifyOTP,
  login
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);

// protected test route
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});


// start google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);


export default router;