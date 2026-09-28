/** Base URL of the Express API, without a trailing slash (e.g. http://localhost:4000/api). */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api").replace(/\/$/, "");

/** Origin that serves uploaded files: the API URL without its "/api" suffix. */
const UPLOADS_ORIGIN = API_URL.replace(/\/api$/, "");

/** Converts a backend-relative upload path (e.g. "/uploads/a.svg") to an absolute URL. */
export function resolveAsset(path) {
  if (!path || /^https?:\/\//.test(path)) return path;
  return `${UPLOADS_ORIGIN}${path}`;
}
