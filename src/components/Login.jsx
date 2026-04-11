import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import LanguageSwitcher from "./LanguageSwitcher";

function Login() {
  const { t } = useTranslation();
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
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate(`/${response.user._id}/articles`, { replace: true });
    } catch (err) {
      setError(err.message || t('auth.failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-r from-green-300 to-green-700 px-4">
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div className="w-full max-w-md rounded-3xl border border-white/30 bg-white/90 p-8 shadow-2xl backdrop-blur-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.email_placeholder')}
            className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 shadow-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.password_placeholder')}
            className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 shadow-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {error && <p className="text-sm font-semibold text-red-600 px-1">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-xl bg-green-600 p-4 font-bold text-white shadow-md transition-all duration-200 hover:bg-green-700 hover:shadow-lg disabled:opacity-70 active:scale-95"
          >
            {loading ? t('auth.logging_in') : t('auth.login_button')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;