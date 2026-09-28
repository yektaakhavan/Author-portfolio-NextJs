import { API_URL } from "@/lib/config";

const GENERIC_ERROR = "خطا در ارتباط با سرور.";

/** Error for non-2xx API responses; `status` lets callers tell "not found" from real failures. */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Thin fetch wrapper for the Express API.
 * Resolves with the parsed JSON body (or null for empty responses) and
 * throws an ApiError carrying the server's message on non-2xx status codes.
 * Extra fetch options (e.g. `next.revalidate`) are passed through untouched.
 */
export async function request(path, { method = "GET", body, token, ...fetchOptions } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...fetchOptions,
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(data?.error || GENERIC_ERROR, res.status);

  return data;
}
