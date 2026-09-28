import { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import IntroCard from "../../components/BookCard/IntroCard";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import GradientButton from "../../components/GradientButton/GradientButton";
import homeIntro from "../../data/homeIntro";
import { useArticles } from "../../hooks/useArticles";
import { useSettings } from "../../hooks/useSettings";

import akhlaghmadariImage from "../../assets/images/banners/akhlagh-madari.webp";
import barnamehriziImage from "../../assets/images/banners/barname-rizi.webp";
import adabsalamImage from "../../assets/images/banners/adab-salam.webp";
import akhlaghmadariImageMobile from "../../assets/images/banners/akhlagh-madari-mobile.webp";
import barnamehriziImageMobile from "../../assets/images/banners/barname-rizi-mobile.webp";
import adabsalamImageMobile from "../../assets/images/banners/adab-salam-mobile.webp";

const slides = [
  { src: akhlaghmadariImage, mobile: akhlaghmadariImageMobile, alt: "اخلاق‌مداری" },
  { src: barnamehriziImage, mobile: barnamehriziImageMobile, alt: "برنامه‌ریزی" },
  { src: adabsalamImage, mobile: adabsalamImageMobile, alt: "آداب سلام" },
];

/** Lightweight, dependency-free auto-advancing hero carousel. */
function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
      {slides.map((slide, i) => (
        <picture key={slide.alt}>
          <source media="(max-width: 768px)" srcSet={slide.mobile} />
          <img
            src={slide.src}
            alt={slide.alt}
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
      ))}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.alt}
            type="button"
            aria-label={`اسلاید ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Home() {
  const { articles, loading: articlesLoading } = useArticles();
  const settings = useSettings();

  return (
    <Layout
      title="صفحه اصلی"
      description="سایت رسمی علیرضا اخوان صفائی، نویسنده کتاب دیسیپلین کار — بیوگرافی، نوشته‌ها و خرید آنلاین کتاب."
      noTopPadding
    >
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
          {articlesLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="aspect-[4/3] animate-pulse rounded-2xl bg-brand-500/10" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} {...article} showButton={false} />
              ))}
            </div>
          )}
          <div className="mt-8 text-center">
            <GradientButton to="/article" text="مطالعه کامل نوشته‌ها" />
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
    </Layout>
  );
}

export default Home;
