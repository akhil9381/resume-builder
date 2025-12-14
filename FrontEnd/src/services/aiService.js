import api from "./api";

// 🤖 Get content suggestions for a section
export const getSuggestions = (role, currentText) => {
  return api.post("/api/ai/suggest-content", {
    role,
    currentText,
  });
};

// 📊 Analyze ATS compatibility
export const analyzeATSScore = (resumeText) => {
  return api.post("/api/ai/ats-score", {
    resumeText,
  });
};

// 🎯 Match resume against job description
export const matchJob = (resumeText, jobDescription) => {
  return api.post("/api/ai/job-match", {
    resumeText,
    jobDescription,
  });
};
