"use client";

import { useState } from "react";
import { IMAGE_STYLE_PROMPT } from "@/data/adminImageGallery";

const COPIED_FEEDBACK_MS = 2000;

export default function ImagePromptHelper() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(IMAGE_STYLE_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — the prompt can still be selected manually.
    }
  };

  return (
    <details className="rounded-xl bg-brand-500/5 p-4 text-sm">
      <summary className="cursor-pointer font-bold text-brand-700">
        راهنما: ساخت تصویر جدید هم‌استایل با گالری (با هوش مصنوعی)
      </summary>
      <div className="mt-3 space-y-2 text-xs text-gray-600">
        <p>
          این متن را کپی کنید، جای براکت را با موضوع مقاله عوض کنید و در یک ابزار تولید تصویر هوش مصنوعی (مثل
          ChatGPT/DALL·E، Midjourney یا مشابه) وارد کنید. تصویر ساخته‌شده را جایی آپلود کنید (مثلاً یک هاست تصویر) و
          لینکش را در قسمت «آدرس تصویر سفارشی» بالا وارد کنید.
        </p>
        <pre className="whitespace-pre-wrap rounded-lg bg-white p-3 font-mono text-[11px] leading-6 text-gray-700 ring-1 ring-black/5">
          {IMAGE_STYLE_PROMPT}
        </pre>
        <button type="button" onClick={handleCopy} className="rounded-full bg-brand-500 px-4 py-1.5 text-xs font-bold text-white">
          {copied ? "کپی شد ✓" : "کپی پرامپت"}
        </button>
      </div>
    </details>
  );
}
