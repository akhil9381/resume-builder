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
  (req, res, next) => {
    // Debug log
    console.log("🔵 Google OAuth request - CLIENT_ID:", !!process.env.GOOGLE_CLIENT_ID);
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/api/auth/google/failure" }),
  (req, res) => {
    try {
      console.log("✅ Google callback - user authenticated:", req.user?.email);
      const token = signToken(req.user._id);
      
      // Redirect to frontend with token
      const redirectUrl = `${process.env.CLIENT_URL}/oauth-success?token=${token}`;
      console.log("📤 Redirecting to:", redirectUrl);
      res.redirect(redirectUrl);
    } catch (err) {
      console.error("❌ Google callback error:", err);
      res.status(500).json({ error: "Authentication failed" });
    }
  }
);

// OAuth failure handler
router.get("/google/failure", (req, res) => {
  res.status(401).json({ 
    error: "Google authentication failed",
    message: "Failed to authenticate with Google"
  });
});
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



