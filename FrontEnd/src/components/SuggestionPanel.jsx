import { useState } from "react";
import { getSuggestions } from "../services/aiService";

export default function SuggestionPanel({ role, currentText, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetSuggestions = async () => {
    if (!currentText.trim()) {
      setError("Please enter some text first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await getSuggestions(role, currentText);
      if (res.data.success) {
        setSuggestions(res.data.suggestions);
      } else {
        setError(res.data.error || "Failed to generate suggestions");
      }
    } catch (err) {
      setError("AI service unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-[var(--card-bg)] rounded-lg border border-purple-500/30">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          ✨ AI Suggestions
        </h3>
        <button
          onClick={handleGetSuggestions}
          disabled={loading}
          className="px-3 py-1 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50"
        >
          {loading ? "Generating..." : "Get Ideas"}
        </button>
      </div>

      {error && <p className="text-xs text-red-400 mb-2">{error}</p>}

      {suggestions.length > 0 && (
        <div className="space-y-2">
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="p-2 bg-purple-900/20 rounded text-xs cursor-pointer hover:bg-purple-900/40 transition"
              onClick={() => onSelect(suggestion)}
            >
              <p className="text-purple-200">{suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
