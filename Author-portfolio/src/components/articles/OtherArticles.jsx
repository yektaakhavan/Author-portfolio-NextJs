import Image from "next/image";
import Link from "next/link";
import PublishDate from "@/components/articles/PublishDate";
import { resolveAsset } from "@/lib/config";

/** Sidebar list linking to other articles. */
export default function OtherArticles({ articles }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h2 className="mb-4 text-sm font-bold text-brand-700">سایر نوشته‌ها</h2>
      <ul className="space-y-4">
        {articles.map(({ id, image, title, publishedAt }) => (
          <li key={id} className="flex gap-3">
            <Image
              src={resolveAsset(image)}
              alt={title}
              width={56}
              height={56}
              unoptimized
              className="h-14 w-14 shrink-0 rounded-lg bg-brand-50 object-cover"
            />
            <div>
              <Link href={`/article/${id}`} className="text-sm font-bold text-brand-700 hover:text-brand-500">
                {title}
              </Link>
              <p className="mt-1 text-xs text-gray-500">
                <PublishDate date={publishedAt} />
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
