import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../store/authContext";

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // save token
    localStorage.setItem("token", token);

    // Call login to restore user context
    try {
      login(token);
    } catch (err) {
      console.error("Failed to restore session:", err);
    }

    // navigate after a short delay to ensure context updates
    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg">Signing you in...</div>
  );
}
