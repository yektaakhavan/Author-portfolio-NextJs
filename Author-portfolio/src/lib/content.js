import "server-only";

import baseBooks from "@/data/books";
import defaultSettings from "@/data/defaultSettings";
import { ApiError, request } from "@/lib/http";

// Server-side data access for Server Components.
// Content that admins edit is re-fetched at most once per minute.
const REVALIDATE_SECONDS = 60;
const cached = { next: { revalidate: REVALIDATE_SECONDS } };

/** All articles, freshest first. Throws when the API is unreachable. */
export const getArticles = () => request("/articles", cached);

/** A single article, or null when it doesn't exist. Other failures still throw. */
export async function getArticle(id) {
  try {
    return await request(`/articles/${id}`, cached);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

/** Editable site-wide text (contact info, socials), falling back to defaults. */
export async function getSettings() {
  try {
    return { ...defaultSettings, ...(await request("/settings", cached)) };
  } catch {
    return defaultSettings;
  }
}

/**
 * Book catalog merged with the admin-managed overrides (price / stock).
 * Never cached, so price and availability are always current at checkout.
 * Falls back to the static catalog when the API is unreachable.
 */
export async function getBooks() {
  const overrides = await request("/books", { cache: "no-store" }).catch(() => ({}));

  return baseBooks.map((book) => {
    const override = overrides[book.id] ?? {};
    const stock = override.stock ?? null; // null = stock isn't tracked, always available
    return { ...book, ...override, stock, inStock: stock === null || stock > 0 };
  });
}
