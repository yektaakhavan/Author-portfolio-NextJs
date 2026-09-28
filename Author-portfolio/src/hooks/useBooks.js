import { useEffect, useState, useCallback } from "react";
import baseBooks from "../data/books";
import { api } from "../lib/api";

// Custom event so admin edits reflect immediately in already-open tabs
// of the same browser (e.g. the Books page open next to /admin).
export const BOOKS_UPDATED_EVENT = "books-updated";

function mergeOverrides(overrides) {
  return baseBooks.map((book) => {
    const override = overrides[book.id] || {};
    const stock = override.stock ?? null; // null = stock not tracked, always in-stock
    return {
      ...book,
      ...override,
      stock,
      inStock: stock === null ? true : stock > 0,
    };
  });
}

/** Book catalog merged with backend-managed overrides (price / stock). */
export function useBooks() {
  const [books, setBooks] = useState(() => mergeOverrides({}));

  const refresh = useCallback(() => {
    api
      .getBookOverrides()
      .then((overrides) => setBooks(mergeOverrides(overrides)))
      .catch(() => {
        /* keep base catalog if backend isn't reachable */
      });
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(BOOKS_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(BOOKS_UPDATED_EVENT, refresh);
  }, [refresh]);

  return books;
}
