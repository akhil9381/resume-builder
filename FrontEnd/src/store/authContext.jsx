import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     🔄 RESTORE SESSION
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  /* =========================
     ✅ LOGIN
  ========================= */
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid email or password";
      throw new Error(message);
    }
  };
  const socialLogin = async (provider, accessToken) => {
  const res = await api.post("/api/auth/social", {
    provider,
    accessToken,
  });

  localStorage.setItem("token", res.data.token);
  setUser(res.data.user);

  return res.data;
};

  /* =========================
     ✅ REGISTER
  ========================= */
  const register = async (name, email, password) => {
    try {
      const res = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      // auto login after register
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);

      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed";
      throw new Error(message);
    }
  };

  /* =========================
     ✅ UPDATE PROFILE
  ========================= */
  const updateProfile = async (name) => {
    try {
      const res = await api.put("/api/auth/me", { name });
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update profile";
      throw new Error(message);
    }
  };

  /* =========================
     ✅ LOGOUT
  ========================= */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        socialLogin,
        updateProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
