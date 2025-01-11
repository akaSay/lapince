import axios from "axios";

const BASE_URL = import.meta.env.PROD
  ? "https://lapince-api.onrender.com"
  : "http://localhost:3001/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  async (response) => {
    if (response.data?.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }
    if (response.data?.refresh_token) {
      localStorage.setItem("refresh_token", response.data.refresh_token);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
