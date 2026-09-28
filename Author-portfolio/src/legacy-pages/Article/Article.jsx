import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/PageHeader/PageHeader";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { useArticles } from "../../hooks/useArticles";

function Article() {
  const { articles, loading, error } = useArticles();

  return (
    <Layout
      title="نوشته‌هایی از دل کتاب"
      description="منتخبی از مفاهیم کلیدی کتاب دیسیپلین کار در قالب نوشته‌های کوتاه."
    >
      <div className="container-app py-12">
        <PageHeader title="نوشته‌هایی از دل کتاب" type="articles" />

        <p className="mx-auto mb-10 max-w-3xl text-justify leading-8 text-gray-600">
          در این بخش، منتخبی از بخش‌های کلیدی و محتوای مهم کتاب دیسیپلین کار در اختیار شما قرار گرفته است. هدف از
          ارائه‌ی این نوشته‌ها، آشنایی بیشتر مخاطبان گرامی با مفاهیم اصلی، دیدگاه‌های نویسنده، و رویکرد کلی کتاب در
          زمینه‌ی مدیریت، انضباط سازمانی و تعامل کارفرما با پرسنل است.
        </p>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="aspect-[4/3] animate-pulse rounded-2xl bg-brand-500/10" />
            ))}
          </div>
        )}

        {error && (
          <p className="rounded-xl bg-red-50 p-4 text-center text-sm text-red-500">
            بارگذاری نوشته‌ها با خطا مواجه شد. لطفاً بعداً دوباره تلاش کنید.
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Article;
