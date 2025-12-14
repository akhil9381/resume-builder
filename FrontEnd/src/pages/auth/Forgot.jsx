import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../store/authContext";

import AuroraBackground from "../../components/AuroraBackground";
import ResumeFloatingShapes from "../../components/ResumeFloatingShapes";
import NeonCard from "../../components/NeonCard";
import GlowInput from "../../components/GlowInput";
import Button from "../../components/Button";

export default function Forgot() {
  const { forgotPassword, loading } = useAuth(); 
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setMsg("");

    try {
      console.log("Reset link sent to:", email);
      setMsg("Password reset link sent to your email.");
    } catch (e) {
      setErr(e.message || "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden z-10">

      <AuroraBackground />
      <ResumeFloatingShapes />

      <NeonCard
        title="Reset Your Password"
        subtitle="Enter your email to receive a reset link"
      >
        <form onSubmit={submit}>

          {err && <p className="text-red-500 text-sm mb-2">{err}</p>}
          {msg && <p className="text-green-400 text-sm mb-2">{msg}</p>}

          <GlowInput
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="you@mail.com"
          />

          <Button type="submit">
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          <p className="text-sm text-[var(--text-muted)] mt-5 text-center">
            Remember your password?{" "}
            <Link to="/login" className="text-purple-300 font-medium">
              Go back to Login
            </Link>
          </p>

        </form>
      </NeonCard>
    </div>
  );
}
