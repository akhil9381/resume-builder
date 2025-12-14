import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Home,
  LayoutDashboard,
  Layers,
  FileText,
  LogIn,
  UserPlus,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../store/themeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
import { use } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { pathname, hash } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const navigate=useNavigate();
  const {user,logout}=useAuth();

  const menu = [
  { label: "Home", icon: <Home size={18} />, href: user?"/dashboard":"/", active: pathname === "/" },

  ...(user
    ? [
        {
          label: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          href: "/dashboard",
          active: pathname === "/dashboard" && hash === "",
        },
        {
          label: "My Resumes",
          icon: <FileText size={18} />,
          href: "/dashboard#resumes",
          active: hash === "#resumes",
        },
        {
          label: "Templates",
          icon: <Layers size={18} />,
          href: "/dashboard#templates",
          active: hash === "#templates",
        },
      ]
    : [
        {
          label: "Login",
          icon: <LogIn size={18} />,
          href: "/login",
          active: pathname === "/login",
        },
        {
          label: "Register",
          icon: <UserPlus size={18} />,
          href: "/register",
          active: pathname === "/register",
        },
      ]),
];


  /* ---------------- CLOSE ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  /* ---------------- CLOSE ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  return (
    <motion.nav
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="
        fixed top-0 left-0 right-0 z-50
        h-16 flex items-center justify-between
        px-8
        bg-[var(--bg)]/60 backdrop-blur-xl
        border-b border-[var(--border)]
        shadow-lg shadow-black/30
      "
    >
      {/* LOGO */}
      <button
  onClick={() => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }}
  className="text-2xl font-extrabold tracking-tight text-[var(--text-main)] cursor-pointer"
>
  Resume<span className="text-purple-500">AI</span>
</button>


      {/* RIGHT CONTROLS */}
      <div className="flex items-center gap-3 relative">
        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="
            p-2 rounded-lg
            bg-[var(--card-bg)]
            border border-[var(--border)]
            hover:brightness-110
            transition
            cursor-pointer
          "
          title="Toggle theme"
        >
          {theme === "neon" ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-purple-400" />
          )}
        </button>

        {/* MENU BUTTON */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="
            px-4 py-2 rounded-lg
            bg-[var(--card-bg)]
            text-[var(--text-main)]
            border border-[var(--border)]
            hover:brightness-110
            transition
            cursor-pointer
          "
        >
          Menu
        </button>

        {/* DROPDOWN */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="
                absolute right-0 top-full mt-2 w-52 z-50
                bg-[var(--bg)]/90 backdrop-blur-xl
                border border-[var(--border)]
                rounded-xl
                shadow-xl shadow-black/40
                p-2
              "
            >
              {/* MENU ITEMS */}
              {menu.map((m) => (
                <Link
                  key={m.label}
                  to={m.href}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg
                    transition
                    ${
                      m.active
                        ? "bg-purple-600/30 text-[var(--text-main)] font-semibold border border-purple-400/30"
                        : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--card-bg)]"
                    }
                  `}
                >
                  {m.icon}
                  {m.label}
                </Link>
              ))}
              {user && (
  <Link
    to="/profile"
    onClick={() => setOpen(false)}
    className="
      flex items-center gap-3 px-3 py-2 rounded-lg
      text-[var(--text-muted)]
      hover:text-[var(--text-main)]
      hover:bg-[var(--card-bg)]
    "
  >
    👤 Profile
  </Link>
)}


              {/* LOGOUT */}
         {user && (
  <button
    onClick={() => {
      logout();
      setOpen(false);
      navigate("/login");
    }}
    className="
      w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-lg
      text-red-400 hover:text-red-300
      hover:bg-red-500/10 transition
    "
  >
    <LogOut size={18} />
    Logout
  </button>
)}


            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
