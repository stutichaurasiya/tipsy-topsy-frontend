"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { authService } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  // "login" | "signup"
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  // Page fade-in — same as Home.js
  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    // Agar already logged in hai to redirect karo
    if (authService.isLoggedIn()) router.push("/admin/dashboard");
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (mode === "login") {
        // ── LOGIN ──
        const res = await authService.login({
          email: form.email,
          password: form.password,
        });

        if (res.data.success) {
          authService.saveSession(res.data.token, res.data.data);
          setSuccess("Login ho gaya! Redirect ho raha hai...");
          setTimeout(() => router.push("/admin/dashboard"), 1000);
        }

      } else {
        // ── SIGNUP ──
        if (!form.name || !form.email || !form.password) {
          setError("Naam, email aur password zaroori hain.");
          setLoading(false);
          return;
        }

        const res = await authService.signup({
          name:     form.name,
          email:    form.email,
          password: form.password,
          phone:    form.phone,
        });

        if (res.data.success) {
          authService.saveSession(res.data.token, res.data.data);
          setSuccess("Account ban gaya! Redirect ho raha hai...");
          setTimeout(() => router.push("/"), 1000);
        }
      }
    } catch (err) {
      // Backend se aayi error message dikhao
      setError(err.response?.data?.message || "Kuch galat hua, dobara try karo.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setSuccess("");
    setForm({ name: "", email: "", password: "", phone: "" });
  };

  return (
    <div className={`${styles.page} ${visible ? styles.visible : ""}`}>

      {/* Background decoration */}
      <div className={styles.bg} />

      <div className={styles.container}>

        {/* ── Logo / Brand ── */}
        <div className={styles.brand}>
          <span className={styles.brandEmoji}>🎂</span>
          <p className={styles.brandName}>Tipsy Topsy</p>
          <p className={styles.brandSub}>Lucknow's Favourite Cake Studio</p>
        </div>

        {/* ── Card ── */}
        <div className={styles.card}>

          {/* ── Tab Toggle: Login / Signup ── */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${mode === "login" ? styles.tabActive : ""}`}
              onClick={() => switchMode("login")}
            >
              Login
            </button>
            <button
              className={`${styles.tab} ${mode === "signup" ? styles.tabActive : ""}`}
              onClick={() => switchMode("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* ── Heading ── */}
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>
              {mode === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className={styles.subtitle}>
              {mode === "login"
                ? "Login karke apne orders track karo"
                : "Join karo aur apna pehla cake order karo"}
            </p>
          </div>

          {/* ── Form ── */}
          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            {/* Name — signup only */}
            {mode === "signup" && (
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Naam</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={styles.input}
                  placeholder="Aapka poora naam"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            )}

            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={styles.input}
                placeholder="aap@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className={styles.input}
                placeholder={mode === "login" ? "Apna password daalo" : "Kam se kam 6 characters"}
                value={form.password}
                onChange={handleChange}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
              />
            </div>

            {/* Phone — signup only */}
            {mode === "signup" && (
              <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">
                  Phone <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={styles.input}
                  placeholder="10 digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
              </div>
            )}

            {/* Forgot password — login only */}
            {mode === "login" && (
              <div className={styles.forgot}>
                <a href="/forgot-password" className={styles.forgotLink}>
                  Password bhool gaye?
                </a>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className={styles.errorBox}>
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className={styles.successBox}>
                <span>✅</span> {success}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading
                ? (mode === "login" ? "Login ho raha hai..." : "Account ban raha hai...")
                : (mode === "login" ? "Login Karo 🎂" : "Account Banao 🎉")}
            </button>

          </form>

          {/* ── Switch mode link ── */}
          <p className={styles.switchText}>
            {mode === "login" ? "Abhi account nahi hai? " : "Pehle se account hai? "}
            <button
              className={styles.switchLink}
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Sign Up karo" : "Login karo"}
            </button>
          </p>

        </div>

        {/* Back to home */}
        <a href="/" className={styles.backHome}>
          ← Wapas Home pe jao
        </a>

      </div>
    </div>
  );
}