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

    // Do not call `login(token)` here — the AuthProvider restores session from localStorage
    // navigate after a short delay to allow AuthProvider restore effect to run
    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg">Signing you in...</div>
  );
}
