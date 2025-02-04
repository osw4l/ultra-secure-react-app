import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

import { useAuthStore, useCategoriesStore } from "@/stores";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

// Flag to indicate if token refresh is in progress
let isRefreshing = false;

// Queue to hold requests while token is being refreshed
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      // @ts-ignore
      prom.config.headers["Authorization"] = token;
      http(prom.config).then(prom.resolve).catch(prom.reject);
    }
  });

  failedQueue = [];
};

http.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
      _retryCount?: number;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Initialize _retryCount if not present
      originalRequest._retryCount = originalRequest._retryCount || 0;

      if (originalRequest._retryCount >= 3) {
        // If we've retried 3 times, reject the request
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      originalRequest._retryCount += 1;

      if (isRefreshing) {
        // If refresh is already in progress, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      const { refresh } = useAuthStore.getState();

      return new Promise((resolve, reject) => {
        // @ts-ignore
        axios
          .post(`${import.meta.env.VITE_BASE_API_URL}/auth/refresh/`, {
            refresh,
          })
          .then(({ data }) => {
            const newToken = data.access;

            // Update tokens in auth store
            useAuthStore.getState().setToken(newToken);
            // Update the authorization header
            http.defaults.headers.common["Authorization"] =
              `Bearer ${newToken}`;
            // @ts-ignore
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            processQueue(null, `Bearer ${newToken}`);

            // Retry the original request
            resolve(http(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);

            // Optionally, clear tokens and redirect to log in
            useAuthStore.getState().setToken("");
            useAuthStore.getState().setRefresh("");
            useCategoriesStore.getState().clearCategories();
            // Redirect to login page or show a message
            window.location.href = "/login";

            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);
export default http;
