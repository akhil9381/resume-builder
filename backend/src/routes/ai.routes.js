import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  generateContentSuggestions,
  analyzeATS,
  matchJobDescription,
} from "../services/aiService.js";

const router = express.Router();

// Check if OpenAI API is configured
const hasOpenAI = () => !!process.env.OPENAI_API_KEY;

// 🤖 Generate content suggestions
router.post("/suggest-content", authMiddleware, async (req, res) => {
  try {
    if (!hasOpenAI()) {
      return res.status(503).json({
        success: false,
        error: "AI service not available",
        message: "OpenAI API key not configured",
      });
    }

    const { role, currentText } = req.body;

    if (!role || !currentText) {
      return res.status(400).json({
        error: "Missing required fields: role, currentText",
      });
    }

    const result = await generateContentSuggestions(role, currentText);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    console.error("❌ Suggestion endpoint error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// 📊 Analyze ATS compatibility
router.post("/ats-score", authMiddleware, async (req, res) => {
  try {
    if (!hasOpenAI()) {
      return res.status(503).json({
        success: false,
        error: "AI service not available",
        message: "OpenAI API key not configured",
      });
    }

    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        error: "Missing required field: resumeText",
      });
    }

    const result = await analyzeATS(resumeText);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    console.error("❌ ATS score endpoint error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// 🎯 Match job description
router.post("/job-match", authMiddleware, async (req, res) => {
  try {
    if (!hasOpenAI()) {
      return res.status(503).json({
        success: false,
        error: "AI service not available",
        message: "OpenAI API key not configured",
      });
    }

    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: "Missing required fields: resumeText, jobDescription",
      });
    }

    const result = await matchJobDescription(resumeText, jobDescription);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (err) {
    console.error("❌ Job match endpoint error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
