"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

const SOCIAL_FIELDS = [
  { field: "social_instagram", label: "اینستاگرام", placeholder: "https://instagram.com/..." },
  { field: "social_telegram", label: "تلگرام", placeholder: "https://t.me/..." },
  { field: "social_whatsapp", label: "واتساپ", placeholder: "https://wa.me/98..." },
  { field: "social_eitaa", label: "ایتا", placeholder: "https://eitaa.com/..." },
];

export default function SettingsTab() {
  const [settings, setSettings] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  const handleChange = (field) => (e) => {
    setSettings((s) => ({ ...s, [field]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await api.updateSettings(settings);
    setSaved(true);
  };

  if (!settings) return <p className="text-center text-sm text-gray-400">در حال بارگذاری…</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h3 className="font-bold text-brand-700">اطلاعات تماس سایت</h3>

      <div>
        <label className="mb-1 block text-xs text-gray-500">شماره تماس</label>
        <input
          dir="ltr"
          value={settings.contact_phone}
          onChange={handleChange("contact_phone")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">ایمیل</label>
        <input
          dir="ltr"
          value={settings.contact_email}
          onChange={handleChange("contact_email")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">متن پشتیبانی (صفحه ارتباط با ما)</label>
        <textarea
          rows={3}
          value={settings.support_note}
          onChange={handleChange("support_note")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <h3 className="pt-2 font-bold text-brand-700">شبکه‌های اجتماعی</h3>

      {SOCIAL_FIELDS.map(({ field, label, placeholder }) => (
        <div key={field}>
          <label className="mb-1 block text-xs text-gray-500">{label}</label>
          <input
            dir="ltr"
            value={settings[field] || ""}
            onChange={handleChange(field)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
      ))}

      <div className="flex items-center gap-3">
        <button type="submit" className="rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-5 py-2 text-sm font-bold text-white">
          ذخیره تغییرات
        </button>
        {saved && <span className="text-xs text-green-600">ذخیره شد.</span>}
      </div>
    </form>
  );
}
