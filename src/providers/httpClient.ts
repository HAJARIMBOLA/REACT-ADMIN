import axios, { type AxiosInstance } from "axios";

/**
 * Base URL of the backend API.
 * Override with VITE_API_URL in a .env file:
 *   VITE_API_URL=https://api.example.com
 */
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

const TOKEN_KEY = "auth_token";

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string): void =>
  localStorage.setItem(TOKEN_KEY, token);
export const clearToken = (): void => localStorage.removeItem(TOKEN_KEY);

let axiosInstance: AxiosInstance | null = null;

/**
 * Returns a singleton Axios instance pre-configured with:
 *  - the API base URL
 *  - automatic "Authorization: Bearer <token>" header injection
 *  - a global 401 interceptor that clears the session
 *
 * Used by both the dataProvider (CRUD calls) and the authProvider (login).
 */
export const getAxiosInstance = (): AxiosInstance => {
  if (axiosInstance) return axiosInstance;

  axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Attach the bearer token on every outgoing request
  axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Global error handling: on 401, drop the stale token so
  // authProvider.checkAuth() / checkError() can redirect to /login
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        clearToken();
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
