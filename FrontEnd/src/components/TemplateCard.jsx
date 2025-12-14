// src/components/TemplateCard.jsx
import { motion } from "framer-motion";

export default function TemplateCard({ template, onPreview }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 12, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      onClick={onPreview}
      className="
        w-full max-w-[260px] rounded-xl overflow-hidden bg-white/[0.05]
        border border-white/[0.1] backdrop-blur-xl shadow-lg cursor-pointer flex flex-col
      "
    >
      <div className="w-full h-[220px] bg-white/[0.06] overflow-hidden relative">
        <img src={template.image} alt={template.name} className="absolute inset-0 w-full h-full object-cover transition-all duration-300" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-[var(--text-main)] truncate">{template.name}</h3>
        <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-3">{template.description}</p>
        <button className="mt-auto text-xs px-3 py-1 rounded bg-purple-600/30 hover:bg-purple-600/40 transition">Use template</button>
      </div>
    </motion.div>
  );
}
