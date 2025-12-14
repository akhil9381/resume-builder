import { useState } from "react";
import { matchJob } from "../services/aiService";

export default function JobMatcher({ resumeText }) {
  const [jobDesc, setJobDesc] = useState("");
  const [matching, setMatching] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleMatch = async () => {
    if (!resumeText.trim()) {
      setError("Please create resume content first");
      return;
    }
    if (!jobDesc.trim()) {
      setError("Please paste a job description");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await matchJob(resumeText, jobDesc);
      if (res.data.success) {
        setMatching(res.data.matching);
      } else {
        setError(res.data.error || "Failed to match job");
      }
    } catch (err) {
      setError("Job matcher unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold flex items-center justify-between"
      >
        🎯 Job Matcher
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-[var(--card-bg)] rounded-lg border border-green-500/30 space-y-3">
          <div>
            <label className="text-xs font-semibold block mb-2">
              Paste Job Description:
            </label>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-32 p-2 bg-gray-900 text-white rounded border border-gray-700 text-xs focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            onClick={handleMatch}
            disabled={loading}
            className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Match Resume to Job"}
          </button>

          {error && <p className="text-xs text-red-400">{error}</p>}

          {matching && (
            <div className="space-y-3 mt-3 p-3 bg-green-900/20 rounded">
              {/* Match Score */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-semibold">Match Score</span>
                  <span className="text-xs font-bold text-green-400">
                    {matching.matchScore || 70}/100
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${matching.matchScore || 70}%` }}
                  />
                </div>
              </div>

              {/* Present Keywords */}
              {matching.presentKeywords && matching.presentKeywords.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-green-400 mb-1">
                    ✓ Keywords You Have:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {matching.presentKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Keywords */}
              {matching.missingKeywords && matching.missingKeywords.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-red-400 mb-1">
                    ✗ Missing Keywords:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {matching.missingKeywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-red-900/50 text-red-300 text-xs rounded"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {matching.recommendations && matching.recommendations.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-blue-400 mb-1">
                    💡 Recommendations:
                  </p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    {matching.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span>→</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
