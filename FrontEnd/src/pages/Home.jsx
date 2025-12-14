import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AuroraBackground from "../components/AuroraBackground";
import ResumeFloatingShapes from "../components/ResumeFloatingShapes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext";
export default function Home() {
    const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  if (loading) return null;
  return (<div className="relative min-h-screen overflow-hidden bg-transparent text-inherit">


      {/* Background Animations */}
      <AuroraBackground />
      <ResumeFloatingShapes />

      {/* HERO SECTION */}
      <section className="relative z-20 max-w-5xl mx-auto px-6 pt-40 pb-24 text-center">

        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-6xl font-extrabold leading-tight"
        >
          Create Stunning  
          <span className="text-purple-500"> AI-Powered Resumes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-6 text-lg text-[var(--text-muted)] max-w-3xl mx-auto"
        >
          A modern resume builder with AI suggestions, professional templates, 
          and an intuitive dashboard to help you stand out instantly.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {/* Dashboard */}
          <Link
            to="/dashboard"
            className="
              px-8 py-3 text-lg font-semibold rounded-xl 
              bg-purple-600 hover:bg-purple-700 transition-all 
              shadow-lg shadow-purple-600/30
            "
          >
            Go to Dashboard
          </Link>

          {/* Login */}
          <Link
            to="/login"
            className="
              px-8 py-3 text-lg font-semibold rounded-xl 
              bg-[var(--card-bg)] border border-[var(--border)] 
              hover:bg-[var(--card-bg)] backdrop-blur-md
              transition-all
            "
          >
            Login
          </Link>

          {/* REGISTER BUTTON (ADDED AS YOU SAID) */}
          <Link
            to="/register"
            className="
              px-8 py-3 text-lg font-semibold rounded-xl 
              bg-green-600 hover:bg-green-700 transition-all 
              shadow-lg shadow-green-600/30
            "
          >
            Register
          </Link>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 pb-40 grid md:grid-cols-3 gap-12 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl backdrop-blur-lg"
        >
          <h3 className="text-xl font-semibold mb-3">AI Suggestions</h3>
          <p className="text-[var(--text-muted)] text-sm">
            Improve resume content instantly with smart AI recommendations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl backdrop-blur-lg"
        >
          <h3 className="text-xl font-semibold mb-3">Modern Templates</h3>
          <p className="text-[var(--text-muted)] text-sm">
            Choose from professional, beautifully designed templates.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl backdrop-blur-lg"
        >
          <h3 className="text-xl font-semibold mb-3">Export as PDF</h3>
          <p className="text-[var(--text-muted)] text-sm">
            Download clean, ATS-friendly PDF resumes instantly.
          </p>
        </motion.div>

      </section>

    </div>
  );
}
