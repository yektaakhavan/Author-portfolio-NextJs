"use client";

import { useEffect, useState } from "react";
import baseBooks from "@/data/books";
import { api } from "@/lib/api";

export default function CatalogTab() {
  const [overrides, setOverrides] = useState({});
  const [loading, setLoading] = useState(true);

  const load = () => api.getBookOverrides().then(setOverrides).finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const handleSave = async (bookId, field, value) => {
    await api.updateBookOverride(bookId, { [field]: value });
    load();
  };

  if (loading) return <p className="text-center text-sm text-gray-400">در حال بارگذاری…</p>;

  return (
    <div className="space-y-4">
      {baseBooks.map((book) => {
        const price = overrides[book.id]?.price ?? book.price;
        const stock = overrides[book.id]?.stock;
        const stockValue = stock === undefined || stock === null ? "" : stock;

        return (
          <div key={book.id} className="flex flex-wrap items-center gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size admin thumbnail, not worth next/image here */}
            <img src={book.image} alt={book.title} className="h-16 w-14 rounded-lg object-cover" />
            <div className="min-w-[140px] flex-1">
              <p className="font-bold text-brand-700">{book.title}</p>
              <p className="text-xs text-gray-500">{book.author}</p>
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-500">قیمت (تومان)</label>
              <input
                type="number"
                defaultValue={price}
                onBlur={(e) => handleSave(book.id, "price", Number(e.target.value) || 0)}
                className="w-32 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-500">موجودی (تعداد)</label>
              <input
                type="number"
                min="0"
                placeholder="نامحدود"
                defaultValue={stockValue}
                onBlur={(e) => handleSave(book.id, "stock", e.target.value === "" ? null : Math.max(0, Number(e.target.value)))}
                className="w-32 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>

            <span className="text-xs text-gray-400">
              {stockValue === "" ? "موجودی رهگیری نمی‌شود (همیشه موجود)" : stockValue > 0 ? `${stockValue} عدد در انبار` : "ناموجود"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
