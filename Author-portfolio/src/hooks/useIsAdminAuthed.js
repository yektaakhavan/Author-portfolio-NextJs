"use client";

import { useSyncExternalStore } from "react";
import { getToken, subscribeToToken } from "@/lib/auth-token";

/** Whether an admin token is stored. Always false on the server (and during hydration). */
export const useIsAdminAuthed = () =>
  useSyncExternalStore(
    subscribeToToken,
    () => Boolean(getToken()),
    () => false,
  );
