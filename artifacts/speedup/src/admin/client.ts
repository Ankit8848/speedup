/**
 * Admin API client. Holds the session token in localStorage and attaches it
 * as a Bearer header on every request. Shared by the auth context and the
 * content / media / users admin screens.
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";
const TOKEN_KEY = "speedup_admin_token";

export type Role = "super_admin" | "editor";

export interface AdminUser {
  id: number;
  email: string;
  displayName: string;
  role: Role;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MediaAsset {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  createdAt: string;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers);
  if (token) headers.set("authorization", `Bearer ${token}`);
  if (init.body && !(init.body instanceof FormData)) {
    headers.set("content-type", "application/json");
  }
  headers.set("accept", "application/json");

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  const payload = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = payload?.error ?? `Request failed (${res.status})`;
    throw new ApiError(res.status, message);
  }
  return payload as T;
}

export const adminApi = {
  // ── auth ──
  login: (email: string, password: string) =>
    request<{ token: string; user: AdminUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => request<AdminUser>("/auth/me"),
  logout: () => request("/auth/logout", { method: "POST" }),

  // ── content ──
  getContent: () => request<Record<string, Record<string, unknown>>>("/content"),
  saveContent: (key: string, data: unknown) =>
    request<{ key: string; data: unknown }>(`/content/${key}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    }),

  // ── media ──
  listMedia: () => request<MediaAsset[]>("/media"),
  uploadMedia: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return request<MediaAsset>("/media", { method: "POST", body: form });
  },
  deleteMedia: (id: number) =>
    request<{ ok: true }>(`/media/${id}`, { method: "DELETE" }),

  // ── users ──
  listUsers: () => request<AdminUser[]>("/users"),
  createUser: (input: {
    email: string;
    password: string;
    displayName: string;
    role: Role;
  }) => request<AdminUser>("/users", { method: "POST", body: JSON.stringify(input) }),
  updateUser: (
    id: number,
    input: Partial<{
      email: string;
      password: string;
      displayName: string;
      role: Role;
      active: boolean;
    }>,
  ) => request<AdminUser>(`/users/${id}`, { method: "PATCH", body: JSON.stringify(input) }),
  deleteUser: (id: number) =>
    request<{ ok: true }>(`/users/${id}`, { method: "DELETE" }),
};

export { ApiError };
