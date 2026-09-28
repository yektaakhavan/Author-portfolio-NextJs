const TOKEN_KEY = "admin-token";

/** Admin JWT persisted in the browser. Client-side only. */
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}
