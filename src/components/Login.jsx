import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.token);
      navigate("/admin/articles", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-300 to-green-700 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/90 p-8 shadow-2xl backdrop-blur-lg">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-800">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
            className="rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-green-600 p-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;