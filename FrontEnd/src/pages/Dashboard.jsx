import { useEffect ,useState} from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuth } from "../store/authContext";

import QuickActions from "../components/QuickActions";
import ResumeList from "../components/ResumeList";
import TemplateGallery from "../components/TemplateGallery";

import AuroraBackground from "../components/AuroraBackground";
import ResumeFloatingShapes from "../components/ResumeFloatingShapes";
import { fetchResumes } from "../services/api";


export default function Dashboard() {
  const { user } = useAuth();
  const { hash } = useLocation();
const [resumes, setResumes] = useState([]);
const [loadingResumes, setLoadingResumes] = useState(true);
  useEffect(() => {
    fetchResumes()
      .then((res) => setResumes(res.data))
      .finally(() => setLoadingResumes(false));
  }, []);

  /* ---------- PAGE TITLE ---------- */
  useEffect(() => {
    document.title = "Dashboard • ResumeAI";
  }, []);

  /* ---------- HASH SCROLL ---------- */
  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-transparent text-inherit relative">
      <AuroraBackground />
      <ResumeFloatingShapes />

      {/* MAIN CONTENT */}
      <main className="pt-24 px-8 pb-20 max-w-6xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-14"
        >
          {/* ---------- HEADER ---------- */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-[var(--text-main)]">
                Welcome back{user?.name ? `, ${user.name}` : ""} 👋
              </h1>

              <p className="text-[var(--text-muted)] mt-1">
                Here's an overview of your resume activity.
              </p>
            </motion.div>

            {/* ---------- STATS ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Resumes",
                  value: loadingResumes ? "…" : resumes.length,
                  color: "from-purple-600 to-purple-500",
                },
                {
                  label: "Templates",
                  value: "4",
                  color: "from-blue-600 to-blue-500",
                },
                {
                  label: "AI Generated",
                  value: "—",
                  color: "from-pink-600 to-pink-500",
                },
                {
                  label: "Last Updated",
                  value: "Today",
                  color: "from-green-600 to-green-500",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="
                    p-5 rounded-xl
                    bg-[var(--card-bg)]
                    border border-[var(--border)]
                    backdrop-blur-xl
                    shadow-lg shadow-black/30
                  "
                >
                  <p className="text-sm text-[var(--text-muted)]">
                    {stat.label}
                  </p>

                  <h3 className="text-2xl font-bold text-[var(--text-main)] mt-1">
                    {stat.value}
                  </h3>

                  <div
                    className={`mt-3 w-full h-1.5 rounded-full bg-gradient-to-r ${stat.color}`}
                  />
                </motion.div>
              ))}
            </div>
          </section>

          {/* ---------- QUICK ACTIONS ---------- */}
          <QuickActions />

          {/* ---------- RESUMES ---------- */}
          <section id="resumes">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-main)]">
              Your Resumes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <ResumeList />
            </div>
          </section>

          {/* ---------- TEMPLATES ---------- */}
          <section id="templates">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-main)]">
              Templates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <TemplateGallery />
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}
