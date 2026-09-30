import Image from "next/image";
import Link from "next/link";
import PublishDate from "@/components/articles/PublishDate";
import { resolveAsset } from "@/lib/config";

export default function ArticleCard({ id, image, title, summary, publishedAt, showButton = true, showDate = true }) {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
      data-aos="zoom-in"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
        <Image
          src={resolveAsset(image)}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          unoptimized // backend-hosted SVG/remote files bypass the image optimizer
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {showDate && (
          <div className="text-xs text-brand-400/70">
            <PublishDate date={publishedAt} />
          </div>
        )}
        <h3 className="text-lg font-bold text-brand-700">{title}</h3>
        <p className="line-clamp-3 flex-1 text-justify text-sm leading-7 text-gray-600">{summary}</p>
        {showButton && (
          <Link
            href={`/article/view?id=${id}`}
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
