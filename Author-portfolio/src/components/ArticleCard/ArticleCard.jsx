import { Link } from "react-router-dom";
import PublishDate from "../PublishDate/PublishDate";
import { resolveAsset } from "../../lib/api";

function ArticleCard({ id, image, title, summary, showButton = true, showDate = true, publishedAt }) {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
      data-aos="zoom-in"
    >
      <div className="aspect-[4/3] overflow-hidden bg-brand-50">
        <img
          src={resolveAsset(image)}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {showDate && (
          <div className="text-xs text-brand-400/70">
            <PublishDate publishDate={publishedAt} />
          </div>
        )}
        <h3 className="text-lg font-bold text-brand-700">{title}</h3>
        <p className="line-clamp-3 flex-1 text-justify text-sm leading-7 text-gray-600">{summary}</p>
        {showButton && (
          <Link
            to={`/article/${id}`}
            className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-bold text-brand-500 hover:text-gold-500"
          >
            ادامه مطلب
            <span aria-hidden="true">‹</span>
          </Link>
        )}
      </div>
    </article>
  );
}

export default ArticleCard;
