import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import resumeRoutes from "./routes/resume.routes.js";
import passport from "passport";
import "./config/passport.js";

const app = express();
app.use(passport.initialize())
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app"
    ], // frontend URL
    credentials: true,               // allow cookies / auth
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

app.use("/api/resumes", resumeRoutes);
export default app;
