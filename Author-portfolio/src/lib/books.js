import baseBooks from "@/data/books";

/**
 * Merges the static catalog with the admin-managed overrides (price / stock).
 * `stock: null` means stock isn't tracked, so the book is always available.
 */
export function applyBookOverrides(overrides = {}) {
  return baseBooks.map((book) => {
    const override = overrides[book.id] ?? {};
    const stock = override.stock ?? null;
    return { ...book, ...override, stock, inStock: stock === null || stock > 0 };
  });
}
