const TOKEN_KEY = "admin-token";

const listeners = new Set();

/** Admin JWT persisted in the browser. Client-side only. */
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
  listeners.forEach((listener) => listener());
}

/** Subscribes to login/logout, for useSyncExternalStore (see useIsAdminAuthed). */
export function subscribeToToken(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
