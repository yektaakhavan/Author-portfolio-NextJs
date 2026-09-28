import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useArticle } from "../../hooks/useArticles";
import { resolveAsset } from "../../lib/api";

function ArticleDetail() {
  const { id } = useParams();
  const { article, others, loading, error } = useArticle(id);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" }));
  }, []);

  if (loading) {
    return (
      <Layout title="در حال بارگذاری…">
        <div className="container-app py-24 text-center text-sm text-gray-400">در حال بارگذاری مقاله…</div>
      </Layout>
    );
  }

  if (error || !article) return <Navigate to="/article" replace />;

  return (
    <Layout title={article.title} description={article.summary}>
      <div className="container-app py-12">
        <PageHeader title={article.title} type="articles" />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <article className="space-y-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <img
              src={resolveAsset(article.image)}
              alt={article.title}
              loading="lazy"
              className="w-full rounded-xl bg-brand-50"
            />
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
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <p className="text-sm text-gray-500">امروز</p>
              <p className="font-bold text-brand-700">{today}</p>
            </div>

            {others.length > 0 && (
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <h2 className="mb-4 text-sm font-bold text-brand-700">سایر نوشته‌ها</h2>
                <ul className="space-y-4">
                  {others.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <img
                        src={resolveAsset(item.image)}
                        alt={item.title}
                        loading="lazy"
                        className="h-14 w-14 shrink-0 rounded-lg bg-brand-50 object-cover"
                      />
                      <div>
                        <Link to={`/article/${item.id}`} className="text-sm font-bold text-brand-700 hover:text-brand-500">
                          {item.title}
                        </Link>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(item.publishedAt).toLocaleDateString("fa-IR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export default ArticleDetail;
