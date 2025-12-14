import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../store/authContext";

export default function SocialLogin() {
  const { socialLogin } = useAuth();

  const buttons = [
    {
      icon: <FcGoogle size={26} />,
      label: "Google",
      onClick: () => {
  window.location.href = "http://localhost:5000/api/auth/google";
    }},
    {
      icon: <FaFacebook size={26} className="text-blue-500" />,
      label: "Facebook",
      onClick: () => handleSocial("facebook"),
    },
    {
      icon: <FaLinkedin size={26} className="text-blue-400" />,
      label: "LinkedIn",
      onClick: () => handleSocial("linkedin"),
    },
    {
      icon: <FaGithub size={26} className="text-[var(--text-main)]" />,
      label: "GitHub",
      onClick: () => handleSocial("github"),
    },
  ];

  async function handleSocial(provider) {
    try {
      // ⚠️ TEMP PLACEHOLDER
      // Next step we will replace this with real OAuth popup
      const fakeToken = "TEMP_TOKEN";

      await socialLogin(provider, fakeToken);
    } catch (err) {
      console.error("Social login failed", err);
    }
  }

  return (
    <div className="mt-6 flex justify-center gap-5">
      {buttons.map((b, i) => (
        <SocialIcon
          key={i}
          icon={b.icon}
          label={b.label}
          onClick={b.onClick}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                         🔥 PREMIUM SOCIAL ICON COMPONENT                    */
/* -------------------------------------------------------------------------- */

function SocialIcon({ icon, label, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.15, rotateX: 8, rotateY: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="relative cursor-pointer"
    >
      {/* Glow Ring */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.9, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="absolute inset-0 rounded-full bg-purple-500/40 blur-xl"
        />
      )}

      {/* Button */}
      <div
        className="
          relative w-12 h-12 flex items-center justify-center rounded-full
          bg-white/[0.08] backdrop-blur-xl
          border border-white/[0.12]
          transition
          shadow-lg hover:shadow-purple-500/20
        "
      >
        {icon}
      </div>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25 }}
          className="
            absolute left-1/2 -translate-x-1/2 mt-2
            bg-[var(--card-bg)] text-[var(--text-main)] text-xs
            px-2 py-1 rounded-md backdrop-blur-md
            border border-[var(--border)] whitespace-nowrap
          "
        >
          Continue with {label}
        </motion.div>
      )}
    </motion.div>
  );
}
