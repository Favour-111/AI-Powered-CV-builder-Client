import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import { api } from "../lib/api";
import { getCurrentUser, saveSession } from "../lib/session";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const redirectTo = location.state?.redirectTo || "/dashboard";
  const authMessage = location.state?.authMessage || "";

  useEffect(() => {
    if (user) {
      navigate(redirectTo);
    }
  }, [navigate, redirectTo, user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (mode === "register" && form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const { data } = await api.post(endpoint, {
        email: form.email,
        password: form.password,
      });

      saveSession(data);
      navigate(redirectTo);
    } catch (requestError) {
      setError(requestError.response?.data?.error || "Unable to authenticate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <AppHeader />

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="surface-panel rounded-[34px] p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--app-muted)]">
              Account Access
            </p>
            <h1 className="mt-3 text-5xl font-semibold leading-none text-[var(--app-ink)] md:text-6xl">
              Save, revisit, and manage every CV you build.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--app-muted)]">
              Logging in links generated resumes to your account, unlocks your
              saved CV dashboard, and lets you keep multiple versions for
              different roles.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                [
                  "Saved versions",
                  "Keep separate CVs for different applications.",
                ],
                [
                  "Quick reopen",
                  "Load any past CV directly into the result editor.",
                ],
                ["Persistent account", "Your resumes stay tied to your email."],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-black/10 bg-white/55 p-5"
                >
                  <h2 className="text-2xl font-semibold text-[var(--app-ink)]">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {authMessage && (
              <div className="mt-6 rounded-[24px] border border-[var(--app-accent)]/15 bg-white/55 px-5 py-4 text-sm text-[var(--app-muted)]">
                {authMessage}
              </div>
            )}
          </div>

          <div className="surface-panel rounded-[34px] p-6 md:p-8">
            <div className="mb-6 flex gap-3">
              {[
                ["login", "Login"],
                ["register", "Sign up"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setMode(value)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    mode === value ? "brand-button" : "secondary-button"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--app-muted)]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--app-muted)]">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                  required
                />
              </div>

              {mode === "register" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-[var(--app-muted)]">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                    required
                  />
                </div>
              )}

              {error && (
                <div className="rounded-2xl border border-[#9b5c2e]/20 bg-[#9b5c2e]/10 px-4 py-3 text-sm text-[#7e4c25]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="brand-button w-full rounded-2xl px-6 py-4 text-sm font-semibold disabled:cursor-not-allowed disabled:bg-[#8b7b6d]"
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                    ? "Login to your account"
                    : "Create account"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
