import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Layers, Bookmark, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  const { pathname, hash } = useLocation();

  const menu = [
    {
      label: "Dashboard",
      href: "/dashboard",
      active: pathname === "/dashboard" && hash === "",
      icon: <LayoutDashboard size={20} />,
    },
    {
      label: "My Resumes",
      href: "/dashboard#resumes",
      active: hash === "#resumes",
      icon: <FileText size={20} />,
    },
    {
      label: "Templates",
      href: "/dashboard#templates",
      active: hash === "#templates",
      icon: <Layers size={20} />,
    },
    {
      label: "Saved",
      href: "/saved",
      active: pathname === "/saved",
      icon: <Bookmark size={20} />,
    },
    {
      label: "Settings",
      href: "/settings",
      active: pathname === "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside
      className="
        bg-white/[0.04] backdrop-blur-xl 
        border border-[var(--border)] 
        rounded-2xl 
        p-6 
        shadow-xl shadow-black/30
      "
    >
      <h2 className="text-xl font-bold mb-6">
        Menu
      </h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
              transition-all
              ${item.active
                ? "bg-purple-600 text-[var(--text-main)] shadow-md shadow-purple-600/30"
                : "text-[var(--text-muted)] hover:bg-[var(--card-bg)] hover:text-[var(--text-main)]"
              }
            `}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* FOOTER SECTION */}
      <div className="mt-8 pt-6 border-t border-[var(--border)]">
        <button
          className="
            flex items-center gap-3 
            text-red-400 hover:text-red-300
            hover:bg-red-500/10 
            px-4 py-3 rounded-xl w-full 
            transition
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
