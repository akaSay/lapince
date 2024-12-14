import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
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
