import { motion } from "framer-motion";

export default function NeonCard({ children, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="relative z-10 w-[360px] md:w-[400px] px-8 py-8 
                 rounded-xl bg-white/[0.06] backdrop-blur-2xl 
                 border border-white/[0.08]
                 shadow-[0_0_40px_rgba(139,92,246,0.15)]"
    >
      <h2 className="text-xl font-semibold text-[var(--text-main)]">{title}</h2>
      <p className="text-sm text-[var(--text-muted)] mb-5">{subtitle}</p>

      {children}
    </motion.div>
  );
}
