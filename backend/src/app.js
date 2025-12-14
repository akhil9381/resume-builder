import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import resumeRoutes from "./routes/resume.routes.js";
import passport from "passport";
import "./config/passport.js";

const app = express();
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

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

app.use("/api/resumes", resumeRoutes);
export default app;
