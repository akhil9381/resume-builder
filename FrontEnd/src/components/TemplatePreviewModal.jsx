import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function TemplatePreviewModal({ open, template, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="
            bg-[var(--bg)] 
            p-6 
            rounded-2xl 
            border border-[var(--border)] 
            shadow-2xl 
            max-w-3xl 
            w-full 
            relative
          "
        >
          {/* CLOSE BTN */}
          <button
            className="absolute top-4 right-4 text-[var(--text-main)]/70 hover:text-[var(--text-main)]"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          {/* TITLE */}
          <h2 className="text-xl font-semibold mb-4">{template.name}</h2>

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={template.image}
              alt={template.name}
              className="max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
