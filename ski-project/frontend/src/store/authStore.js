import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/services/authService";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        const data = await authService.login({ email, password });
        set({ token: data.access_token, user: data.user });
      },

      register: async (payload) => {
        const data = await authService.register(payload);
        set({ token: data.access_token, user: data.user });
      },

      logout: () => set({ user: null, token: null }),

      isAuthenticated: () => !!get().token,
    }),
    { name: "ski-auth" }, // matches the key read in api.js interceptor
  ),
);
