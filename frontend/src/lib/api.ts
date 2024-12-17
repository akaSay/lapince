import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
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
