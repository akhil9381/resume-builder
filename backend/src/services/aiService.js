import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// 🤖 Generate AI suggestions for resume content
export const generateContentSuggestions = async (role, currentText) => {
  try {
    const prompt = `You are an expert resume writer. Generate 3-5 impactful bullet points for a resume section.

Role: ${role}
Current text: "${currentText}"

Provide 3-5 bullet points that are concise, action-oriented, and quantifiable where possible. Return only the bullet points, one per line, starting with a dash.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const suggestions = text
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => line.replace(/^[-•*]\s+/, "").trim());

    return {
      success: true,
      suggestions,
    };
  } catch (err) {
    console.error("❌ AI suggestion error:", err);
    return {
      success: false,
      error: err.message,
    };
  }
};

// 📊 Analyze resume for ATS compatibility
export const analyzeATS = async (resumeText) => {
  try {
    const prompt = `You are an ATS (Applicant Tracking System) expert. Analyze this resume for ATS compatibility.

Resume: ${resumeText}

Provide a JSON response with:
{
  "score": <0-100>,
  "issues": ["issue1", "issue2"],
  "suggestions": ["suggestion1", "suggestion2"],
  "keywordDensity": {}
}

Return ONLY valid JSON, no other text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    // Try to parse JSON from response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : {
          score: 75,
          issues: ["Could not parse detailed analysis"],
          suggestions: ["Add more specific keywords", "Use standard formatting"],
          keywordDensity: {},
        };

    return {
      success: true,
      analysis,
    };
  } catch (err) {
    console.error("❌ ATS analysis error:", err);
    return {
      success: false,
      error: err.message,
    };
  }
};

// 🎯 Match resume against job description
export const matchJobDescription = async (resumeText, jobDescription) => {
  try {
    const prompt = `You are a job matching expert. Compare this resume with the job description and provide matching analysis.

Resume: ${resumeText}

Job Description: ${jobDescription}

Provide a JSON response with:
{
  "matchScore": <0-100>,
  "missingKeywords": ["keyword1", "keyword2"],
  "presentKeywords": ["keyword1", "keyword2"],
  "recommendations": ["recommendation1", "recommendation2"]
}

Return ONLY valid JSON, no other text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const matchText = response.text();

    // Try to parse JSON from response
    const jsonMatch = matchText.match(/\{[\s\S]*\}/);
    const matching = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : {
          matchScore: 70,
          missingKeywords: [],
          presentKeywords: [],
          recommendations: ["Add relevant skills from job description"],
        };

    return {
      success: true,
      matching,
    };
  } catch (err) {
    console.error("❌ Job matching error:", err);
    return {
      success: false,
      error: err.message,
    };
  }
};
