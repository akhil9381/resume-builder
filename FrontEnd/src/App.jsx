import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import ResumeEditor from "./pages/ResumeEditor";
import ProtectedRoute from "./components/ProtectedRoute";
import { useTheme } from "./store/themeContext";
import PublicRoute from "./routes/PublicRoute";
import Profile from "./pages/Profile";
import OAuthSuccess from "./pages/OAuthSuccess";

export default function App() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        theme === "neon" ? "theme-neon" : "theme-light"
      }`}
    >
      <Navbar />

      <div className="flex-1 pt-16">
        <Routes>
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/" element={<Home />} />
          <Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>

<Route
  path="/register"
  element={
    <PublicRoute>
      <Register />
    </PublicRoute>
  }
/>
          <Route path="/forgot" element={<Forgot />} />

          {/* 🔒 PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editor/:id"
            element={
              <ProtectedRoute>
                <ResumeEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
