import type { AuthProvider } from "react-admin";
import { getAxiosInstance, setToken, clearToken, getToken, API_URL } from "./httpClient";

/**
 * authProvider — handles authentication & authorization.
 *
 * SECURITY NOTE — password handling:
 *  - The password typed by the user is sent ONCE, over HTTPS in production,
 *    directly to the backend's /auth/login endpoint.
 *  - It is NEVER written to localStorage, sessionStorage, cookies, or any
 *    client-side store, and never logged to the console.
 *  - Only the backend issues and verifies the password (hashed + salted,
 *    e.g. BCrypt). The frontend only ever stores the resulting JWT,
 *    which is short-lived and revocable, never the credential itself.
 *  - On the JS side the variable holding the password goes out of scope
 *    as soon as login() returns and is eligible for garbage collection.
 */

interface JwtPayload {
  sub: string;
  email?: string;
  role?: string;
  permissions?: string[];
  exp: number;
}

const decodeToken = (token: string): JwtPayload | null => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export const authProvider: AuthProvider = {
  // Called when the user submits the login form
  login: async ({ username, password }) => {
    const client = getAxiosInstance();

    // password is used here only, in this single request body,
    // and is not retained afterwards.
    const { data } = await client.post(`${API_URL}/auth/login`, {
      email: username,
      password,
    });

    if (!data?.token) {
      throw new Error("Invalid credentials");
    }

    setToken(data.token);
    return Promise.resolve();
  },

  // Called when the user clicks on the logout button
  logout: async () => {
    clearToken();
    return Promise.resolve();
  },

  // Called when the API returns an error (e.g. 401/403)
  checkError: async (error) => {
    const status = error?.status ?? error?.response?.status;
    if (status === 401 || status === 403) {
      clearToken();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Called when the user navigates to a new location, to check
  // for authentication
  checkAuth: async () => {
    const token = getToken();
    if (!token) return Promise.reject();

    const payload = decodeToken(token);
    if (!payload) return Promise.reject();

    // Reject if the JWT is expired
    if (payload.exp * 1000 < Date.now()) {
      clearToken();
      return Promise.reject();
    }

    return Promise.resolve();
  },

  // Called when the user navigates to a new location, to check
  // for permissions / roles
  getPermissions: async () => {
    const token = getToken();
    if (!token) return Promise.reject();

    const payload = decodeToken(token);
    return Promise.resolve(payload?.role ?? "user");
  },

  // Called to get the current user's identity for the UI
  getIdentity: async () => {
    const token = getToken();
    if (!token) return Promise.reject();

    const payload = decodeToken(token);
    return Promise.resolve({
      id: payload?.sub ?? "",
      fullName: payload?.email ?? "Unknown user",
    });
  },
};
