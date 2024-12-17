import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://lapince-api.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Intercepteur pour les requêtes
api.interceptors.request.use(async (config) => {
  // Log pour le débogage
  console.log("Request config:", {
    url: config.url,
    method: config.method,
    withCredentials: config.withCredentials,
    headers: config.headers,
  });
  return config;
});

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
