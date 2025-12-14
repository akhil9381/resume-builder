import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";

import AuroraBackground from "../../components/AuroraBackground";
import ResumeFloatingShapes from "../../components/ResumeFloatingShapes";
import NeonCard from "../../components/NeonCard";
import GlowInput from "../../components/GlowInput";
import Button from "../../components/Button";
import PasswordInput from "../../components/PasswordInput";
import PasswordStrengthBar from "../../components/PasswordStrengthBar";
import SocialLogin from "../../components/SocialLogin";

export default function Register() {
  const { register, user, loading } = useAuth(); // ✅ FIX
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const [err, setErr] = useState("");

  // 🔁 Redirect if already logged in
  useEffect(() => {
    if (user) {
      nav("/dashboard");
    }
  }, [user, nav]);

  function calculateStrength(pw) {
    let s = 0;
    if (!pw) return 0;
    if (pw.length >= 6) s++;
    if (pw.length >= 10) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return Math.min(s, 4);
  }

  async function submit(e) {
    e.preventDefault();
    setErr("");

    if (password !== cpass) {
      setErr("Passwords do not match");
      return;
    }

    try {
      await register(name, email, password); // ✅ FIX
      nav("/login"); // ✅ FIX
    } catch (e) {
      setErr(e.message || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden z-10">
      <AuroraBackground />
      <ResumeFloatingShapes />

      <NeonCard
        title="Create your account"
        subtitle="Start building modern resumes effortlessly"
      >
        <form onSubmit={submit}>
          {err && <p className="text-red-500 text-sm mb-2">{err}</p>}

          <GlowInput
            label="Full Name"
            value={name}
            onChange={setName}
            placeholder="Akhil Sharma"
          />

          <GlowInput
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="you@mail.com"
          />

          <div className="mt-2">
            <PasswordInput
              label="Password"
              value={password}
              onChange={setPassword}
              placeholder="Enter password"
            />
            <PasswordStrengthBar strength={calculateStrength(password)} />
          </div>

          <PasswordInput
            label="Confirm Password"
            value={cpass}
            onChange={setCpass}
            placeholder="Re-enter password"
          />

          <Button type="submit">
            {loading ? "Creating account..." : "Register"}
          </Button>

          <SocialLogin
            onGoogle={() => console.log("Google signup")}
            onFacebook={() => console.log("Facebook signup")}
            onLinkedIn={() => console.log("LinkedIn signup")}
            onGithub={() => console.log("GitHub signup")}
          />

          <p className="text-sm text-[var(--text-muted)] mt-5 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-300 font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </NeonCard>
    </div>
  );
}
