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

// Simplifier l'intercepteur pour le débogage
api.interceptors.request.use((config) => {
  console.log("Request:", {
    method: config.method?.toUpperCase(),
    url: config.url,
  });
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Error response:", error.response);
    return Promise.reject(error);
  }
);

export default api;
