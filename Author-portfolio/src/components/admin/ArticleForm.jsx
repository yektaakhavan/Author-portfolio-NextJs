"use client";

import { useState } from "react";
import ImagePromptHelper from "@/components/admin/ImagePromptHelper";
import { IMAGE_GALLERY } from "@/data/adminImageGallery";
import { api } from "@/lib/api";
import { resolveAsset } from "@/lib/config";

const emptyArticleForm = { title: "", summary: "", content1: "", content2: "", image: IMAGE_GALLERY[3] };

export default function ArticleForm({ initial, onCancel, onSaved }) {
  const [form, setForm] = useState(initial || emptyArticleForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.summary.trim() || !form.content1.trim()) {
      setError("عنوان، خلاصه و متن اصلی الزامی است.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (form.id) {
        await api.updateArticle(form.id, form);
      } else {
        await api.createArticle(form);
      }
      onSaved();
    } catch (err) {
      setError(err.message || "ذخیره‌سازی با خطا مواجه شد.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h3 className="font-bold text-brand-700">{form.id ? "ویرایش مقاله" : "مقاله جدید"}</h3>

      <div>
        <label className="mb-1 block text-xs text-gray-500">عنوان</label>
        <input
          value={form.title}
          onChange={handleChange("title")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">خلاصه (روی کارت نمایش داده می‌شود)</label>
        <textarea
          rows={2}
          value={form.summary}
          onChange={handleChange("summary")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">متن اصلی</label>
        <textarea
          rows={4}
          value={form.content1}
          onChange={handleChange("content1")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">
          ادامه متن (اختیاری — می‌تواند شامل تگ‌های ساده HTML مثل &lt;h4&gt;، &lt;ul&gt;، &lt;li&gt; باشد)
        </label>
        <textarea
          rows={5}
          value={form.content2}
          onChange={handleChange("content2")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-xs focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs text-gray-500">تصویر مقاله — از گالری آماده انتخاب کنید</label>
        <div className="flex flex-wrap gap-2">
          {IMAGE_GALLERY.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setForm((f) => ({ ...f, image: src }))}
              className={`h-16 w-20 overflow-hidden rounded-lg ring-2 transition-all ${
                form.image === src ? "ring-brand-500" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small fixed-size gallery thumbnail from the backend */}
              <img src={resolveAsset(src)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        <label className="mt-3 mb-1 block text-xs text-gray-500">یا آدرس یک تصویر سفارشی (بعد از ساخت با پرامپت زیر)</label>
        <input
          dir="ltr"
          value={form.image}
          onChange={handleChange("image")}
          placeholder="https://..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none"
        />
      </div>

      <ImagePromptHelper />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-5 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          {saving ? "در حال ذخیره…" : "ذخیره"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-full px-5 py-2 text-sm text-gray-500 hover:bg-gray-100">
          انصراف
        </button>
      </div>
    </form>
  );
}
