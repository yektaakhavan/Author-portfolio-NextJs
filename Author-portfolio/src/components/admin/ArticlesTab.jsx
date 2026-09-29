"use client";

import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import ArticleForm from "@/components/admin/ArticleForm";
import { api } from "@/lib/api";
import { resolveAsset } from "@/lib/config";

export default function ArticlesTab() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | article object

  const load = () => api.getArticles().then(setArticles).finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("این مقاله حذف شود؟")) return;
    await api.deleteArticle(id);
    load();
  };

  if (editing) {
    return (
      <ArticleForm
        initial={editing === "new" ? null : editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setEditing("new")}
        className="flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-bold text-white"
      >
        <FaPlus /> مقاله جدید
      </button>

      {loading ? (
        <p className="text-center text-sm text-gray-400">در حال بارگذاری…</p>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div key={article.id} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size admin thumbnail */}
              <img src={resolveAsset(article.image)} alt="" className="h-14 w-14 rounded-lg bg-brand-50 object-cover" />
              <div className="flex-1">
                <p className="font-bold text-brand-700">{article.title}</p>
                <p className="line-clamp-1 text-xs text-gray-500">{article.summary}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(article)}
                aria-label="ویرایش"
                className="flex h-9 w-9 items-center justify-center rounded-full text-brand-500 hover:bg-brand-500/10"
              >
                <FaPen size={13} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(article.id)}
                aria-label="حذف"
                className="flex h-9 w-9 items-center justify-center rounded-full text-red-400 hover:bg-red-50 hover:text-red-500"
              >
                <FaTrash size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
