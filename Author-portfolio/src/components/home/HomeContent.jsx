"use client";

import ArticleCard from "@/components/articles/ArticleCard";
import HeroCarousel from "@/components/home/HeroCarousel";
import IntroCard from "@/components/home/IntroCard";
import GradientButton from "@/components/ui/GradientButton";
import { useSettings } from "@/components/providers/SettingsProvider";
import homeIntro from "@/data/homeIntro";
import { useApiData } from "@/hooks/useApiData";
import { api } from "@/lib/api";

const LATEST_ARTICLES_COUNT = 3;

// Defined once so useApiData gets a stable fetcher reference.
const fetchLatestArticles = () => api.getArticles();

export default function HomeContent() {
  const settings = useSettings();
  const { data: articles } = useApiData(fetchLatestArticles);
  const latestArticles = articles ?? [];

  return (
    <>
      <HeroCarousel />

      <div className="container-app">
        <h1 className="mt-10 text-center text-xl font-bold text-brand-700 md:text-2xl">
          وب‌سایت علیرضا اخوان صفائی، نویسنده کتاب دیسیپلین کار
        </h1>

        {homeIntro.map((card) => (
          <IntroCard key={card.id} {...card} reverse={card.id === "book"} />
        ))}

        <section className="py-10">
          <h2 className="mb-8 text-center text-2xl font-bold text-brand-700">نوشته‌هایی از دل کتاب</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.slice(0, LATEST_ARTICLES_COUNT).map((article) => (
              <ArticleCard key={article.id} {...article} showButton={false} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <GradientButton href="/article">مطالعه کامل نوشته‌ها</GradientButton>
          </div>
        </section>

        <section className="rounded-2xl bg-brand-500/5 px-6 py-10 text-center">
          <h2 className="mb-4 text-2xl font-bold text-brand-700">ارتباط با ما</h2>
          <p className="mx-auto max-w-xl text-gray-600">
            جهت ارتباط با موسسه ما و درخواست همکاری می‌توانید از طریق شماره زیر یا ارسال ایمیل ارتباط برقرار کنید.
          </p>
          <div className="mt-4 flex flex-col items-center gap-1 text-sm">
            <span>
              تلفن تماس:{" "}
              <a href={`tel:${settings.contact_phone}`} className="font-bold text-brand-500" dir="ltr">
                {settings.contact_phone}
              </a>
            </span>
            <span>
              ایمیل:{" "}
              <a href={`mailto:${settings.contact_email}`} className="font-bold text-brand-500">
                {settings.contact_email}
              </a>
            </span>
          </div>
        </section>
      </div>
    </>
  );
}
