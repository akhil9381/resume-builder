import { Navigate } from "react-router-dom";
import { useAuth } from "../store/authContext";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or loader

  // 🚫 If logged in → dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ If not logged in → allow page
  return children;
}
