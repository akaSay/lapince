import axios from "axios";

const BASE_URL = import.meta.env.PROD
  ? "https://lapince-api.onrender.com"
  : "http://localhost:3001/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Log pour déboguer
console.log("API Base URL:", BASE_URL);

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    // Log pour le débogage
    console.log("Response:", {
      status: response.status,
      headers: response.headers,
      cookies: document.cookie,
    });
    return response;
  },
  async (error) => {
    console.error("Response error:", error.response);
    return Promise.reject(error);
  }
);

export default api;
