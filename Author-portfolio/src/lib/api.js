"use client";

import { request } from "@/lib/http";
import { getToken } from "@/lib/auth-token";

// Browser-side API used by the checkout form and the admin panel.
// Requests are never cached; admin calls attach the stored JWT.
const send = (path, options = {}) => request(path, { cache: "no-store", ...options });
const sendAuthed = (path, options = {}) => send(path, { ...options, token: getToken() });

export const api = {
  login: (username, password) => send("/auth/login", { method: "POST", body: { username, password } }),

  getArticles: () => send("/articles"),
  getArticle: (id) => send(`/articles/${id}`),
  createArticle: (article) => sendAuthed("/articles", { method: "POST", body: article }),
  updateArticle: (id, article) => sendAuthed(`/articles/${id}`, { method: "PUT", body: article }),
  deleteArticle: (id) => sendAuthed(`/articles/${id}`, { method: "DELETE" }),

  getBookOverrides: () => send("/books"),
  updateBookOverride: (id, override) => sendAuthed(`/books/${id}`, { method: "PUT", body: override }),

  createOrder: (order) => send("/orders", { method: "POST", body: order }),
  getOrders: () => sendAuthed("/orders"),
  updateOrderStatus: (id, status) => sendAuthed(`/orders/${id}/status`, { method: "PATCH", body: { status } }),

  getSettings: () => send("/settings"),
  updateSettings: (settings) => sendAuthed("/settings", { method: "PUT", body: settings }),
};
