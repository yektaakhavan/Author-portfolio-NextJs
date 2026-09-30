"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import OtherArticles from "@/components/articles/OtherArticles";
import TodayCard from "@/components/articles/TodayCard";
import PageHeader from "@/components/ui/PageHeader";
import { useApiData } from "@/hooks/useApiData";
import { api } from "@/lib/api";
import { resolveAsset } from "@/lib/config";

const SIDEBAR_ARTICLE_COUNT = 5;

// Note: with no server, the browser tab only gets this per-article title
// after the JS runs — search engines still see the generic page title.
function useDocumentTitle(title) {
  useEffect(() => {
    if (title) document.title = `${title} | علیرضا اخوان صفائی`;
  }, [title]);
}

export default function ArticleView() {
  const id = useSearchParams().get("id");

  const fetchArticle = () => api.getArticle(id);
  const fetchOthers = () => api.getArticles().catch(() => []);
  const { status, data: article } = useApiData(fetchArticle);
  const { data: allArticles } = useApiData(fetchOthers);

  useDocumentTitle(article?.title);

  if (status === "loading") return <div className="min-h-[60vh]" />;

  if (status === "error" || !article) {
    return (
      <div className="container-app flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-xl font-bold text-brand-700">مقاله پیدا نشد</h1>
        <p className="text-sm text-gray-500">این مقاله حذف شده یا آدرس آن اشتباه است.</p>
      </div>
    );
  }

  const otherArticles = (allArticles ?? [])
    .filter((item) => String(item.id) !== String(id))
    .slice(0, SIDEBAR_ARTICLE_COUNT);

  return (
    <div className="container-app py-12">
      <PageHeader title={article.title} type="articles" />

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-50">
            <Image
              src={resolveAsset(article.image)}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              unoptimized
              className="object-contain"
            />
          </div>

          {/* The HTML below is authored by the site admin in the admin panel. */}
          <div
            className="prose prose-p:text-justify prose-p:leading-8 max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.content1 }}
          />
          {article.content2 && (
            <div
              className="prose prose-p:text-justify prose-p:leading-8 prose-li:text-gray-700 max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: article.content2 }}
            />
          )}
        </article>

        <aside className="space-y-6">
          <TodayCard />
          {otherArticles.length > 0 && <OtherArticles articles={otherArticles} />}
        </aside>
      </div>
    </div>
  );
}
