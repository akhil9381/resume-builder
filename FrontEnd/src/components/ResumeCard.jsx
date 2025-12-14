// src/components/ResumeCard.jsx
import { motion } from "framer-motion";
import { Eye, Edit, Trash } from "lucide-react";

export default function ResumeCard({ resume }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-[var(--text-main)]">{resume.title}</h4>
          <p className="text-xs text-[var(--text-muted)]">{resume.updatedAt}</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md bg-white/[0.02] hover:bg-white/[0.04]">
            <Eye size={16} />
          </button>
          <button className="p-2 rounded-md bg-white/[0.02] hover:bg-white/[0.04]">
            <Edit size={16} />
          </button>
          <button className="p-2 rounded-md bg-white/[0.02] hover:bg-white/[0.04]">
            <Trash size={16} />
          </button>
        </div>
      </div>

      <div className="mt-3 text-sm text-[var(--text-muted)]">
        <p>{resume.summary}</p>
      </div>

      <div className="mt-4 text-xs text-[var(--text-muted)] flex gap-2">
        <span className="px-2 py-1 bg-white/[0.03] rounded">{resume.type}</span>
        <span className="px-2 py-1 bg-white/[0.03] rounded">{resume.experience}</span>
      </div>
    </motion.div>
  );
}
