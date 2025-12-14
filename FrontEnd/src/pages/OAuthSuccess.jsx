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

    // save token + restore user
    localStorage.setItem("token", token);

    // fetch /auth/me via AuthContext restore logic
    window.location.href = "/dashboard";
  }, []);

  return null;
}
