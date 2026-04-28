import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { user, token, login, register, logout, isAuthenticated } =
    useAuthStore();
  return { user, token, login, register, logout, isAuthenticated };
}
