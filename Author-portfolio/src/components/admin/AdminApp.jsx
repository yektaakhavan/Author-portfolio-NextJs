"use client";

import Dashboard from "@/components/admin/Dashboard";
import LoginGate from "@/components/admin/LoginGate";
import { useIsAdminAuthed } from "@/hooks/useIsAdminAuthed";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { setToken } from "@/lib/auth-token";

export default function AdminApp() {
  const isHydrated = useIsHydrated();
  const authed = useIsAdminAuthed();

  // The token lives in localStorage, so the logged-in state is only known
  // after hydration; render nothing for that one render instead of
  // flashing the login form for admins who are already signed in.
  if (!isHydrated) return null;
  if (!authed) return <LoginGate />;

  return <Dashboard onLogout={() => setToken(null)} />;
}
