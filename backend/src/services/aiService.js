import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🤖 Generate AI suggestions for resume content
export const generateContentSuggestions = async (role, currentText) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Generate 3-5 impactful bullet points for a resume section.",
        },
        {
          role: "user",
          content: `Generate professional bullet points for a ${role} role. Current text: "${currentText}". Provide 3-5 bullet points that are concise, action-oriented, and quantifiable where possible.`,
        },
      ],
      temperature: 0.7,
    });

    const suggestions = response.choices[0].message.content
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
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an ATS (Applicant Tracking System) expert. Analyze resumes for ATS compatibility.",
        },
        {
          role: "user",
          content: `Analyze this resume for ATS compatibility and provide a JSON response with: { score: (0-100), issues: [...], suggestions: [...], keywordDensity: {...} }. Resume: ${resumeText}`,
        },
      ],
      temperature: 0.7,
    });

    const analysisText = response.choices[0].message.content;
    
    // Try to parse JSON from response
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {
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
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a job matching expert. Analyze how well a resume matches a job description.",
        },
        {
          role: "user",
          content: `Compare this resume with the job description and provide a JSON response with: { matchScore: (0-100), missingKeywords: [...], presentKeywords: [...], recommendations: [...] }. 
          
Resume: ${resumeText}

Job Description: ${jobDescription}`,
        },
      ],
      temperature: 0.7,
    });

    const matchText = response.choices[0].message.content;
    
    // Try to parse JSON from response
    const jsonMatch = matchText.match(/\{[\s\S]*\}/);
    const matching = jsonMatch ? JSON.parse(jsonMatch[0]) : {
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
