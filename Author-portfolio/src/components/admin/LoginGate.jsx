"use client";

import { useState } from "react";
import { FaLock } from "react-icons/fa";
import FormField, { inputClass } from "@/components/ui/FormField";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth-token";

export default function LoginGate() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token } = await api.login(username, password);
      setToken(token);
    } catch (err) {
      setError(err.message || "ورود ناموفق بود.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-500/5 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg ring-1 ring-black/5">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-xl text-brand-500">
          <FaLock />
        </div>
        <h1 className="mb-1 text-lg font-bold text-brand-700">ورود به پنل مدیریت</h1>
        <p className="mb-5 text-sm text-gray-500">نام کاربری و رمز عبور را وارد کنید.</p>

        <div className="mb-3">
          <FormField id="username" label="نام کاربری">
            <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} />
          </FormField>
        </div>

        <FormField id="password" label="رمز عبور">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className={inputClass}
          />
        </FormField>

        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-5 py-2.5 text-sm font-bold text-white shadow-md disabled:opacity-60"
        >
          {loading ? "در حال ورود…" : "ورود"}
        </button>
      </form>
    </div>
  );
}
