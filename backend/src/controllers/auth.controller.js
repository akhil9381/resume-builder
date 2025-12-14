import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
/* REGISTER */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({ name, email, password });

    const token = signToken(user._id);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

/* LOGIN */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user._id);

  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    await user.save();

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const socialLogin = async (req, res) => {
  try {
    const { provider, accessToken } = req.body;

    let profile;

    // 🔵 GOOGLE
    if (provider === "google") {
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      profile = {
        name: data.name,
        email: data.email,
      };
    }

    // ⚫ GITHUB
    if (provider === "github") {
      const { data } = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const emailRes = await axios.get(
        "https://api.github.com/user/emails",
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const email = emailRes.data.find((e) => e.primary)?.email;

      profile = {
        name: data.name || data.login,
        email,
      };
    }

    // 🔵 LINKEDIN
    if (provider === "linkedin") {
      // LinkedIn requires email + profile separately
      // Keep simple: we’ll add later if you want
      return res.status(501).json({ message: "LinkedIn coming next" });
    }

    // 🔵 FACEBOOK
    if (provider === "facebook") {
      const { data } = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
      );

      profile = {
        name: data.name,
        email: data.email,
      };
    }

    if (!profile?.email) {
      return res.status(400).json({ message: "Email not available" });
    }

    // 🔍 FIND OR CREATE USER
    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = await User.create({
        name: profile.name,
        email: profile.email,
        password: "social-login", // dummy
      });
    }

    const token = signToken(user._id);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Social login failed" });
  }
};
