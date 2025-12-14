import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import resumeRoutes from "./routes/resume.routes.js";
import passport from "passport";
import "./config/passport.js";

const app = express();

// Initialize passport BEFORE CORS
app.use(passport.initialize());

// CORS config - allow both localhost and deployed frontend
const corsOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
  "https://resume-builder-1-u4k3.onrender.com" // Your actual frontend domain
].filter(Boolean);

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);

app.use(express.json());

// ✅ HEALTH CHECK endpoint
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend is running", timestamp: new Date() });
});

// ✅ API health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    google_configured: !!process.env.GOOGLE_CLIENT_ID,
    mongo_uri: !!process.env.MONGO_URI,
    server_url: process.env.SERVER_URL,
    client_url: process.env.CLIENT_URL
  });
});

// Mount auth routes
app.use("/api/auth", authRoutes);

// Resume routes
app.use("/api/resumes", resumeRoutes);

// Error middleware (must be last)
app.use(errorMiddleware);
export default app;
