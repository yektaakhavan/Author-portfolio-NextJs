import { SITE_URL } from "@/lib/site";
import { getArticles } from "@/lib/content";

const STATIC_PATHS = ["", "/about", "/books", "/article", "/contact"];

export default async function sitemap() {
  const now = new Date();
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));

  const articles = await getArticles().catch(() => []);
  const articleEntries = articles.map((article) => ({
    url: `${SITE_URL}/article/${article.id}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
  }));

  return [...staticEntries, ...articleEntries];
}
