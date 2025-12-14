import express from "express";
import { register, login,socialLogin } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { updateProfile } from "../controllers/auth.controller.js";
import passport from "passport";
import { signToken } from "../utils/jwt.js";

import User from "../models/User.js"; // <-- ensure filename matches

const router = express.Router();
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = signToken(req.user._id);

    // redirect to frontend
    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);
router.post("/register", register);
router.post("/login", login);
router.post("/social", socialLogin);
router.put("/me", authMiddleware, updateProfile);
// ✅ PROTECTED ROUTE
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;



