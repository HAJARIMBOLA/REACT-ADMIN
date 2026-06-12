import type { AuthProvider } from "react-admin";

/**
 * authProvider — authentification locale via json-server (/users).
 *
 * json-server supporte le filtrage par query params nativement :
 *   GET /users?email=admin@company.com&password=admin123
 * → retourne le tableau des utilisateurs correspondants.
 *
 * Comptes (définis dans db.json) :
 *   admin@company.com / admin123  → rôle "admin"
 *   user@company.com  / user123   → rôle "user"
 */

const JSON_SERVER_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3002";

const STORAGE_KEY = "auth_user";

interface StoredUser {
  id: number;
  email: string;
  role: string;
}

const saveUser = (user: StoredUser) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));

const loadUser = (): StoredUser | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const clearUser = () => localStorage.removeItem(STORAGE_KEY);

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const url = `${JSON_SERVER_URL}/users?email=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Erreur réseau — json-server est-il démarré sur le port 3002 ?");

    const users: StoredUser[] = await res.json();

    if (!users || users.length === 0) {
      throw new Error("Email ou mot de passe invalide");
    }

    saveUser(users[0]);
    return Promise.resolve();
  },

  logout: async () => {
    clearUser();
    return Promise.resolve();
  },

  checkAuth: async () => {
    const user = loadUser();
    return user ? Promise.resolve() : Promise.reject();
  },

  checkError: async (error) => {
    const status = error?.status ?? error?.response?.status;
    if (status === 401 || status === 403) {
      clearUser();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: async () => {
    const user = loadUser();
    return Promise.resolve(user?.role ?? "user");
  },

  getIdentity: async () => {
    const user = loadUser();
    return Promise.resolve({
      id: user?.id ?? 0,
      fullName: user?.email ?? "Inconnu",
    });
  },
};
