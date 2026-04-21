import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: `${API_BASE}/api/auth`,
  withCredentials: true,
});

export const authService = {
  // POST /api/auth/login
  login: (data) => api.post("/login", data),

  // POST /api/auth/signup
  signup: (data) => api.post("/signup", data),

  // Save token + user to localStorage
  saveSession: (token, user) => {
    localStorage.setItem("tt_token", token);
    localStorage.setItem("tt_user", JSON.stringify(user));
  },

  // Get current logged-in user
  getUser: () => {
    if (typeof window === "undefined") return null;
    const u = localStorage.getItem("tt_user");
    return u ? JSON.parse(u) : null;
  },

  // Get token
  getToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("tt_token");
  },

  // Logout
  logout: () => {
    localStorage.removeItem("tt_token");
    localStorage.removeItem("tt_user");
  },

  // Check if logged in
  isLoggedIn: () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("tt_token");
  },
};