"use client";

import { useEffect, useState } from "react";

/**
 * Starts from data captured at build time and refreshes it from the API once
 * the page is open in the browser. The static HTML stays useful (and indexable)
 * while content edited in the admin panel still shows up without a rebuild.
 *
 * `fetcher` must be a stable reference (a module-level function). If the
 * request fails, the build-time data is kept.
 */
export function useLiveData(fetcher, initialData) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((fresh) => {
        if (!cancelled) setData(fresh);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return data;
}
