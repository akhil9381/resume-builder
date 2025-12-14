import { useState } from "react";
import GlowInput from "./GlowInput";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <GlowInput
        label={label}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      <motion.button
        type="button"
        whileTap={{ scale: 0.86 }}
        onClick={() => setShow(!show)}
        className="absolute right-3 top-[38px] text-[var(--text-muted)] hover:text-[var(--text-main)]"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </motion.button>
    </div>
  );
}
