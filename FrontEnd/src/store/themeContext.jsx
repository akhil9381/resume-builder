import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "neon";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "neon" ? "light" : "neon"));
  };

  // 🔑 APPLY THEME GLOBALLY
  useEffect(() => {
    document.documentElement.classList.remove("neon", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
