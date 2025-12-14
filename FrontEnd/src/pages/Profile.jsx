import { useState } from "react";
import { useAuth } from "../store/authContext";
import api from "../services/api";

export default function Profile() {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <p className="mt-20 text-center">Please login again.</p>;
  }

  const save = async () => {
    try {
      setLoading(true);
      const res = await api.put("/auth/me", { name });
      setMsg("Profile updated successfully");
    } catch {
      setMsg("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-[var(--card-bg)] rounded-xl border">
      <h2 className="text-xl font-bold mb-4">Profile</h2>

      <label className="text-sm">Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mt-1 mb-3 px-3 py-2 rounded border bg-transparent"
      />

      <label className="text-sm">Email</label>
      <input
        value={user.email}
        disabled
        className="w-full mt-1 mb-4 px-3 py-2 rounded border opacity-70"
      />

      <button
        onClick={save}
        disabled={loading}
        className="w-full py-2 bg-purple-600 rounded text-white"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
