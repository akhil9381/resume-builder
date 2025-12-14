import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import api from "../../services/api";
import AuroraBackground from "../../components/AuroraBackground";
import ResumeFloatingShapes from "../../components/ResumeFloatingShapes";
import NeonCard from "../../components/NeonCard";
import GlowInput from "../../components/GlowInput";
import Button from "../../components/Button";
import PasswordInput from "../../components/PasswordInput";
import SocialLogin from "../../components/SocialLogin";

export default function Login() {
  const { login, loading } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { user } = useAuth();

useEffect(() => {
  if (user) {
    nav("/dashboard");
  }
}, [user]);
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
    window.location.href = "/dashboard";
  }
}, []);

  async function submit(e) {
  e.preventDefault();
  setErr("");

  try {
    await login(email, password); // ✅ CORRECT
    nav("/dashboard");
  } catch (e) {
    setErr("Invalid email or password");
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden z-10">

      <AuroraBackground />
      <ResumeFloatingShapes />

      <NeonCard
        title="Welcome Back"
        subtitle="Login to continue building your resumes"
      >
        <form onSubmit={submit}>

          {err && <p className="text-red-500 text-sm mb-2">{err}</p>}

          <GlowInput
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="you@mail.com"
          />

          <PasswordInput
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
          />

          <div className="flex justify-end text-sm mt-2 mb-3">
            <Link className="text-purple-300 hover:text-purple-200" to="/forgot">
              Forgot password?
            </Link>
          </div>

          <Button type="submit">
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <SocialLogin
            onGoogle={() => console.log("Google login")}
            onFacebook={() => console.log("Facebook login")}
            onLinkedIn={() => console.log("LinkedIn login")}
            onGithub={() => console.log("GitHub login")}
          />

          <p className="text-sm text-[var(--text-muted)] mt-5 text-center">
            New here?{" "}
            <Link to="/register" className="text-purple-300 font-medium">
              Create an account
            </Link>
          </p>

        </form>
      </NeonCard>
    </div>
  );
}
