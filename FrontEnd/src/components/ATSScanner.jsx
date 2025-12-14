import { useState } from "react";
import { analyzeATSScore } from "../../services/aiService";

export default function ATSScanner({ resumeText }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScan = async () => {
    if (!resumeText.trim()) {
      setError("Please create resume content first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await analyzeATSScore(resumeText);
      if (res.data.success) {
        setAnalysis(res.data.analysis);
      } else {
        setError(res.data.error || "Failed to analyze resume");
      }
    } catch (err) {
      setError("ATS scanner unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 bg-[var(--card-bg)] rounded-lg border border-blue-500/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          📊 ATS Compatibility Score
        </h3>
        <button
          onClick={handleScan}
          disabled={loading}
          className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
        >
          {loading ? "Scanning..." : "Scan Resume"}
        </button>
      </div>

      {error && <p className="text-xs text-red-400 mb-2">{error}</p>}

      {analysis && (
        <div className="space-y-3">
          {/* Score */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-semibold">ATS Score</span>
              <span className="text-xs font-bold text-blue-400">
                {analysis.score || 75}/100
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${analysis.score || 75}%` }}
              />
            </div>
          </div>

          {/* Issues */}
          {analysis.issues && analysis.issues.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-red-400 mb-1">
                Issues Found:
              </p>
              <ul className="text-xs text-gray-300 space-y-1">
                {analysis.issues.map((issue, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span>•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {analysis.suggestions && analysis.suggestions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-green-400 mb-1">
                Suggestions:
              </p>
              <ul className="text-xs text-gray-300 space-y-1">
                {analysis.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span>✓</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
