import { useState, useEffect, useRef } from "react";

export function useLocalResume(key = "rb_resume", initial = null) {
  const canUseStorage = typeof window !== "undefined" && !!window.localStorage;
  
  const [data, setData] = useState(() => {
    if (!canUseStorage) return initial;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch (err) {
      console.warn("localStorage blocked:", err);
      return initial;
    }
  });

  const deb = useRef(null);

  useEffect(() => {
    if (!canUseStorage) return;

    if (deb.current) clearTimeout(deb.current);

    deb.current = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        console.warn("localStorage write blocked:", err);
      }
    }, 800);

    return () => clearTimeout(deb.current);
  }, [data]);

  return [data, setData];
}
