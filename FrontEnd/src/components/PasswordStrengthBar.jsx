import { motion } from "framer-motion";

export default function PasswordStrengthBar({ strength }) {
  // strength: 0, 1, 2, 3, 4

  const colors = [
    "bg-red-500",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-500",
    "bg-purple-500",
  ];

  const labels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];

  return (
    <div className="mt-2 w-full">
      {/* Animated bar */}
      <div className="w-full h-2 bg-[var(--card-bg)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(strength / 4) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`h-full rounded-full ${colors[strength]}`}
        />
      </div>

      {/* Label */}
      <p className="text-xs mt-1 text-[var(--text-muted)] opacity-80">
        {labels[strength]}
      </p>
    </div>
  );
}
