import { Suspense } from "react";
import ArticleView from "@/components/articles/ArticleView";

export const metadata = {
  title: "نوشته",
  description: "یکی از نوشته‌های برگرفته از کتاب دیسیپلین کار.",
};

// useSearchParams (reading ?id=) requires a Suspense boundary for static export.
export default function ArticleViewPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <ArticleView />
    </Suspense>
  );
}
