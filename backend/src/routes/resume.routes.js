import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createResume,
  getMyResumes,
  getResume,
  updateResume,
  deleteResume,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createResume);
router.get("/", getMyResumes);
router.get("/:id", getResume);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);

export default router;
