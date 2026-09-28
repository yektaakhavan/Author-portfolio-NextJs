"use client";

import { useIsHydrated } from "@/hooks/useIsHydrated";
import { formatDate } from "@/lib/format";

/**
 * Sidebar card with today's date. Rendered in the browser only, because the
 * article page itself is cached and would otherwise show a stale date.
 */
export default function TodayCard() {
  const isHydrated = useIsHydrated();

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <p className="text-sm text-gray-500">امروز</p>
      <p className="min-h-6 font-bold text-brand-700">{isHydrated ? formatDate(new Date()) : ""}</p>
    </div>
  );
}
