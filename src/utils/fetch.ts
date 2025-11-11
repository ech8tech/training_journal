import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { ApiError } from "@typings/api";

export const apiConf = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

export const apiConfRefreshToken = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

// Define the structure of a retry queue item
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: InternalAxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

// Flag to track if refresh has failed (no valid refresh token)
let refreshHasFailed = false;

// Helper function to redirect to login if not already there
const redirectToLogin = () => {
  if (window.location.pathname !== "/sign_in") {
    window.location.href = "/sign_in";
  }
};

// Function to reset refresh failed flag (call this after successful login)
export const resetRefreshFailed = () => {
  refreshHasFailed = false;
};

// Interceptor for refresh token requests
// If refresh token request fails with 401, it means refresh token is also expired/missing
// In this case, redirect to login immediately without retrying
apiConfRefreshToken.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ error: ApiError }>) => {
    // If refresh token request fails with 401, refresh token is expired/missing
    if (error.response?.status === 401) {
      refreshHasFailed = true;

      // Reject all queued requests
      refreshAndRetryQueue.forEach(({ reject }) => {
        reject(error);
      });
      refreshAndRetryQueue.length = 0;
      isRefreshing = false;

      // Redirect to login page only if not already there
      redirectToLogin();
    }
    return Promise.reject(error);
  },
);

// Extended AxiosRequestConfig with retry flag
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

apiConf.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ error: ApiError }>) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // Check if error is 401 and request hasn't been retried yet
    // Don't try to refresh if refresh has already failed (no valid refresh token)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !refreshHasFailed
    ) {
      // Don't try to refresh if we're already on the sign_in page
      if (window.location.pathname === "/sign_in") {
        return Promise.reject(error?.response?.data?.error || error);
      }

      if (!isRefreshing) {
        // Mark that we're refreshing to prevent multiple refresh calls
        isRefreshing = true;
        originalRequest._retry = true;

        try {
          // Refresh the access token
          // Token will be set in httpOnly cookie by the backend
          await apiConfRefreshToken.post("auth/refresh");

          // Reset refresh failed flag on success
          refreshHasFailed = false;

          // Retry all requests in the queue with the new token
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            // Ensure retry flag is set to prevent infinite refresh loops
            (config as ExtendedAxiosRequestConfig)._retry = true;
            apiConf
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });

          // Clear the queue
          refreshAndRetryQueue.length = 0;

          // Retry the original request
          return apiConf(originalRequest);
        } catch (refreshError) {
          // If refresh fails, reject all queued requests
          refreshAndRetryQueue.forEach(({ reject }) => {
            reject(refreshError);
          });

          // Clear the queue
          refreshAndRetryQueue.length = 0;
          isRefreshing = false;

          // Handle token refresh error - redirect to login
          // Note: If refresh token request returned 401, the redirect
          // is already handled by apiConfRefreshToken interceptor
          if ((refreshError as AxiosError)?.response?.status !== 401) {
            redirectToLogin();
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // If refresh is in progress, add request to queue
        // Mark request as retry to prevent infinite loop
        originalRequest._retry = true;
        return new Promise((resolve, reject) => {
          refreshAndRetryQueue.push({
            config: originalRequest,
            resolve,
            reject,
          });
        });
      }
    }

    // If refresh has failed, don't retry - just reject immediately
    if (refreshHasFailed && error.response?.status === 401) {
      return Promise.reject(error?.response?.data?.error || error);
    }

    // For non-401 errors, return formatted error
    return Promise.reject(error?.response?.data?.error || error);
  },
);
