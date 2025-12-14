import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchResumes } from "../services/api";

export default function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes()
      .then((res) => setResumes(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-[var(--text-muted)]">Loading resumes...</p>;
  }

  if (!resumes.length) {
    return (
      <p className="text-[var(--text-muted)]">
        No resumes yet. Create your first one 🚀
      </p>
    );
  }

  return resumes.map((r) => (
    <div
      key={r._id}
      onClick={() => navigate(`/editor/${r._id}`)}   // ✅ THIS IS THE FIX
      className="
        p-4 rounded-xl cursor-pointer
        bg-[var(--card-bg)]
        border border-[var(--border)]
        hover:scale-[1.02]
        hover:border-purple-400
        transition
      "
    >
      <h4 className="font-semibold text-[var(--text-main)]">
  {r.title || "Untitled Resume"}
</h4>


      <p className="text-sm text-[var(--text-muted)] mt-1">
        Template: {r.template}
      </p>

      <p className="text-xs text-[var(--text-muted)] mt-2">
        Updated: {new Date(r.updatedAt).toLocaleDateString()}
      </p>
    </div>
  ));
}
