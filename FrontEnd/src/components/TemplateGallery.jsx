import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getTemplates } from "../services/mockApi";

export default function TemplateGallery() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getTemplates();
      setTemplates(data);
    }
    load();
  }, []);

  if (!templates.length) {
    return <p className="text-[var(--text-muted)]">Loading templates...</p>;
  }

  return (
    <>
      {templates.map((tpl, i) => (
        <motion.div
          key={tpl.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={tpl.image}
            alt={tpl.name}
            className="w-full h-56 object-cover"
          />

          <div className="p-4">
            <h4 className="text-lg font-semibold">{tpl.name}</h4>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              {tpl.description}
            </p>

            <button
              onClick={() => {
                console.log("Clicked Template:", tpl.id);
                navigate(`/editor/new?template=${tpl.id}`);
              }}
              className="mt-4 w-full py-2 bg-purple-600 hover:bg-purple-500 rounded-lg"
            >
              Use Template
            </button>
          </div>
        </motion.div>
      ))}
    </>
  );
}
