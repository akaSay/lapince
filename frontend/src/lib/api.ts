import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://lapince-api.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  xsrfCookieName: "vercel_jwt",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

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
