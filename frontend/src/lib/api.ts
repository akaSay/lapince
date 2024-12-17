import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://lapince-api.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle responses and errors
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status, response.data);
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    // Don't retry these requests
    if (
      !originalRequest ||
      originalRequest.url === "/api/auth/login" ||
      originalRequest.url === "/api/auth/refresh" ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      originalRequest._retry = true;
      try {
        await api.post("/api/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        window.dispatchEvent(new CustomEvent("auth:expired"));
        return Promise.reject(refreshError);
      }
    }

    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      url: originalRequest?.url,
    });
    return Promise.reject(error);
  }
);

export default api;
