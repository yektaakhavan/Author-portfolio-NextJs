/** Base URL of the PHP API. Same-origin deployments can set this to "/api"; a separate API host needs the full URL (e.g. https://api.example.com/api). */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "/api").replace(/\/$/, "");

/** Converts a backend-relative upload path (e.g. "/uploads/a.svg") to an absolute URL. Uploads live alongside the API code, so this is just API_URL + the path. */
export function resolveAsset(path) {
  if (!path || /^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
}
