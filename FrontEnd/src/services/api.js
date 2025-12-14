import axios from "axios";

// Use env variable or fallback to hardcoded backend URL
const backendURL = import.meta.env.VITE_BACKEND_URL || "https://resume-builder-oopi.onrender.com";

const api = axios.create({
  baseURL: backendURL,
  withCredentials: false,
});

console.log("API baseURL configured to:", backendURL);
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchResumes = () => {
  return api.get("/resumes");
};
export const fetchProfile = () => api.get("/api/auth/me");

export default api;
