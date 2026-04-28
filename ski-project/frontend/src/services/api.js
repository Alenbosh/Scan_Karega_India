import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  timeout: 30000,
});

// Attach JWT on every request
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("ski-auth");
  if (raw) {
    const { state } = JSON.parse(raw);
    if (state?.token) config.headers.Authorization = `Bearer ${state.token}`;
  }
  return config;
});

// Global 401 handler
api.interceptors.response.use(
  (res) => res.data, // unwrap .data so callers get payload directly
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("ski-auth");
      window.location.href = "/login";
    }
    return Promise.reject(err.response?.data || err);
  },
);

export default api;
