import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Intercepteur - Token trouvé:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Intercepteur - Headers configurés:", config.headers);
  } else {
    console.log("Intercepteur - Pas de token trouvé");
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("Réponse API réussie:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("Erreur API:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
);

export default api;
