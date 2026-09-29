"use client";

import { useState } from "react";
import { FaBoxOpen, FaClipboardList, FaCog, FaNewspaper, FaSignOutAlt } from "react-icons/fa";
import ArticlesTab from "@/components/admin/ArticlesTab";
import CatalogTab from "@/components/admin/CatalogTab";
import OrdersTab from "@/components/admin/OrdersTab";
import SettingsTab from "@/components/admin/SettingsTab";

const TABS = [
  { key: "orders", label: "سفارش‌ها", icon: FaClipboardList, Component: OrdersTab },
  { key: "catalog", label: "مدیریت کتاب", icon: FaBoxOpen, Component: CatalogTab },
  { key: "articles", label: "مقالات", icon: FaNewspaper, Component: ArticlesTab },
  { key: "settings", label: "تنظیمات سایت", icon: FaCog, Component: SettingsTab },
];

export default function Dashboard({ onLogout }) {
  const [tab, setTab] = useState(TABS[0].key);
  const ActiveTab = TABS.find((t) => t.key === tab).Component;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="container-app flex h-16 items-center justify-between">
          <h1 className="font-bold text-brand-700">پنل مدیریت سایت</h1>
          <button type="button" onClick={onLogout} className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500">
            خروج <FaSignOutAlt />
          </button>
        </div>
      </header>

      <div className="container-app py-8">
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                tab === key ? "bg-brand-500 text-white" : "bg-white text-gray-600 ring-1 ring-black/5"
              }`}
            >
              <Icon /> {label}
            </button>
          ))}
        </div>

        <ActiveTab />
      </div>
    </div>
  );
}
