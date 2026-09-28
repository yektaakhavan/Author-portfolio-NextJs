"use client";

import { useSyncExternalStore } from "react";

const subscribeToNothing = () => () => {};

/** True once the component has hydrated in the browser (always false on the server and during hydration). */
export const useIsHydrated = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
