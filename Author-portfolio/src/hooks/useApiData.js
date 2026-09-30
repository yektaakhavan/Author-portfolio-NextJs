"use client";

import { useEffect, useState } from "react";

const LOADING = { status: "loading", data: null, error: null };

/**
 * Runs an async fetcher on mount (and whenever it changes) and tracks its
 * result as loading/success/error — the three states a page needs to render
 * correctly, unlike a plain useState which can't tell "still loading" apart
 * from "failed". `fetcher` must be a stable reference (a module-level function).
 */
export function useApiData(fetcher) {
  const [state, setState] = useState(LOADING);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((data) => !cancelled && setState({ status: "success", data, error: null }))
      .catch((error) => !cancelled && setState({ status: "error", data: null, error }));

    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return state;
}
