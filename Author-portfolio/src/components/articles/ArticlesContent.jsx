"use client";

import ArticleCard from "@/components/articles/ArticleCard";
import PageHeader from "@/components/ui/PageHeader";
import { useApiData } from "@/hooks/useApiData";
import { api } from "@/lib/api";

const TITLE = "نوشته‌هایی از دل کتاب";

const fetchArticles = () => api.getArticles();

export default function ArticlesContent() {
  const { status, data: articles } = useApiData(fetchArticles);

  return (
    <div className="container-app py-12">
      <PageHeader title={TITLE} type="articles" />

      <p className="mx-auto mb-10 max-w-3xl text-justify leading-8 text-gray-600">
        در این بخش، منتخبی از بخش‌های کلیدی و محتوای مهم کتاب دیسیپلین کار در اختیار شما قرار گرفته است. هدف از
        ارائه‌ی این نوشته‌ها، آشنایی بیشتر مخاطبان گرامی با مفاهیم اصلی، دیدگاه‌های نویسنده، و رویکرد کلی کتاب در
        زمینه‌ی مدیریت، انضباط سازمانی و تعامل کارفرما با پرسنل است.
      </p>

      {status === "error" && (
        <p className="rounded-xl bg-red-50 p-4 text-center text-sm text-red-500">
          بارگذاری نوشته‌ها با خطا مواجه شد. لطفاً بعداً دوباره تلاش کنید.
        </p>
      )}

      {status === "success" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      )}
    </div>
  );
}
