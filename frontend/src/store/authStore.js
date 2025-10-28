import { create } from "zustand";
import api from "../lib/api";


export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  signup: async (formData) => {
    try {
      set({ loading: true });
      const res = await api.post("/api/auth/register", formData);
      set({ loading: false, error: null });
      return res.data;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Signup failed" });
    }
  },

  login: async (formData) => {
    try {
      set({ loading: true });
      const res = await api.post("/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      set({ user: res.data.user, token: res.data.token, loading: false, error: null });
      return true;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Login failed" });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    set({ user: null, token: null });
  },
}));
