import axios from "axios";

const api = axios.create({
  baseURL: "https://resume-builder-oopi.onrender.com",
  withCredentials: false,
});
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
export const fetchProfile = () => api.get("/auth/me");

export default api;
