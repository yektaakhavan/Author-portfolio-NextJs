import { API_URL } from "@/lib/config";

const GENERIC_ERROR = "خطا در ارتباط با سرور.";

/**
 * Thin fetch wrapper for the Express API.
 * Resolves with the parsed JSON body (or null for empty responses) and
 * throws an Error carrying the server's message on non-2xx status codes.
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
  if (!res.ok) throw new Error(data?.error || GENERIC_ERROR);

  return data;
}
