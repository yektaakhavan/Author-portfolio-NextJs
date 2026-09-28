const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const TOKEN_KEY = "admin-token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* empty response */
  }

  if (!res.ok) {
    throw new Error(data?.error || "خطا در ارتباط با سرور.");
  }

  return data;
}

export const api = {
  login: (username, password) => request("/auth/login", { method: "POST", body: { username, password } }),

  getArticles: () => request("/articles"),
  getArticle: (id) => request(`/articles/${id}`),
  createArticle: (article) => request("/articles", { method: "POST", body: article, auth: true }),
  updateArticle: (id, article) => request(`/articles/${id}`, { method: "PUT", body: article, auth: true }),
  deleteArticle: (id) => request(`/articles/${id}`, { method: "DELETE", auth: true }),

  getBookOverrides: () => request("/books"),
  updateBookOverride: (id, override) => request(`/books/${id}`, { method: "PUT", body: override, auth: true }),

  createOrder: (order) => request("/orders", { method: "POST", body: order }),
  getOrders: () => request("/orders", { auth: true }),
  updateOrderStatus: (id, status) => request(`/orders/${id}/status`, { method: "PATCH", body: { status }, auth: true }),

  getSettings: () => request("/settings"),
  updateSettings: (settings) => request("/settings", { method: "PUT", body: settings, auth: true }),
};

export const UPLOADS_BASE = API_URL.replace(/\/api$/, "");

export function resolveAsset(path) {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  return `${UPLOADS_BASE}${path}`;
}
