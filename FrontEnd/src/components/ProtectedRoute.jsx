import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Wait until auth check completes
  if (loading) return null;

  // 🚫 Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return children;
}
