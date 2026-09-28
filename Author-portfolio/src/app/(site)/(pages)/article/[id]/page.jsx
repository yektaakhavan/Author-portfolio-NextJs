import Image from "next/image";
import { notFound } from "next/navigation";
import OtherArticles from "@/components/articles/OtherArticles";
import TodayCard from "@/components/articles/TodayCard";
import PageHeader from "@/components/ui/PageHeader";
import { resolveAsset } from "@/lib/config";
import { getArticle, getArticles } from "@/lib/content";

const SIDEBAR_ARTICLE_COUNT = 5;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = await getArticle(id);

  return article ? { title: article.title, description: article.summary } : {};
}

export default async function ArticleDetailPage({ params }) {
  const { id } = await params;
  const [article, allArticles] = await Promise.all([getArticle(id), getArticles().catch(() => [])]);

  if (!article) notFound();

  const otherArticles = allArticles.filter((item) => String(item.id) !== String(id)).slice(0, SIDEBAR_ARTICLE_COUNT);

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
