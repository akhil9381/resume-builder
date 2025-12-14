import { motion } from "framer-motion";

export default function ResumeFloatingShapes() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-64 h-64 bg-purple-600/10 blur-3xl rounded-full top-20 left-10"
      />

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-64 h-64 bg-blue-600/10 blur-3xl rounded-full bottom-20 right-10"
      />
    </div>
  );
}
