import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://lapince-api.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = [];
};

api.interceptors.request.use((request) => {
  console.log("Sending request to:", request.url);
  return request;
});

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (originalRequest?.url === "/auth/login") {
      return Promise.reject(error);
    }

    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest?.url === "/auth/refresh" ||
      !originalRequest
    ) {
      return Promise.reject(error);
    }

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const { data } = await api.post("/auth/refresh");
        isRefreshing = false;
        onRefreshed(data.access_token);
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        window.dispatchEvent(new CustomEvent("auth:expired"));
        return Promise.reject(refreshError);
      }
    }

    return new Promise((resolve) => {
      subscribeTokenRefresh(() => {
        resolve(api(originalRequest));
      });
    });
  }
);

export default api;
