import { motion } from "framer-motion";
import { PlusCircle, Upload, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Create New Resume",
      icon: <PlusCircle size={22} />,
      color: "from-purple-600 to-purple-500",
      hover: "hover:from-purple-500 hover:to-purple-400",
      onClick: () => navigate("/editor/new"),
    },
    {
      title: "Upload Resume",
      icon: <Upload size={22} />,
      color: "from-blue-600 to-blue-500",
      hover: "hover:from-blue-500 hover:to-blue-400",
      onClick: () => alert("Upload feature coming soon!"),
    },
    {
      title: "AI Generate Resume",
      icon: <Sparkles size={22} />,
      color: "from-pink-600 to-pink-500",
      hover: "hover:from-pink-500 hover:to-pink-400",
      onClick: () => alert("AI generator is coming soon!"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {actions.map((action, i) => (
        <motion.button
          key={action.title}
          onClick={action.onClick}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className={`
            w-full flex items-center gap-3 px-5 py-4 rounded-xl
            bg-gradient-to-r ${action.color} ${action.hover}
            text-[var(--text-main)] font-semibold shadow-lg shadow-black/30
          `}
        >
          {action.icon}
          {action.title}
        </motion.button>
      ))}
    </div>
  );
}
