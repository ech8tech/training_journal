import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9001/api",
  withCredentials: true,
});

export const apiRefreshToken = axios.create({
  baseURL: "http://localhost:9001/api",
  withCredentials: true,
});

// Define the structure of a retry queue item
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Refresh the access token
          const newAccessToken = await apiRefreshToken.post("/auth/refresh");

          // Update the request headers with the new access token
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry all requests in the queue with the new token
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            api
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });

          // Clear the queue
          refreshAndRetryQueue.length = 0;

          // Retry the original request
          return api(originalRequest);
        } catch (refreshError) {
          // Handle token refresh error
          // You can clear all storage and redirect the user to the login page
          // throw refreshError;
          window.location.href = "/sign_in";
          console.log(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Add the original request to the queue
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    // Return a Promise rejection if the status code is not 401
    return Promise.reject(error);
  },
);
