import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-transparent text-inherit border-t border-[var(--border)]">

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold text-[var(--text-main)]">ResumeAI</h2>
        <p className="text-sm mt-2">
          Build stunning resumes effortlessly using AI.
        </p>

        <div className="flex gap-6 mt-6">
          <Link to="/dashboard" className="hover:text-[var(--text-main)]">Dashboard</Link>
          <Link to="/templates" className="hover:text-[var(--text-main)]">Templates</Link>
          <Link to="/about" className="hover:text-[var(--text-main)]">About</Link>
        </div>

        <div className="mt-10 text-sm text-center border-t border-[var(--border)] pt-4">
          © {new Date().getFullYear()} ResumeAI • All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
