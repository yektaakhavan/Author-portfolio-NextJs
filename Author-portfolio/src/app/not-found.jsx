import Link from "next/link";

export const metadata = { title: "صفحه پیدا نشد" };

/**
 * Static export writes this page to 404.html at the site root — the file a
 * plain Apache host should show for any unmatched path (see .htaccess).
 * It renders outside the (site) route group, so no navbar/footer here.
 */
export default function NotFound() {
  return (
    <div className="container-app flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-black text-brand-500/20">۴۰۴</h1>
      <h2 className="text-xl font-bold text-brand-700">صفحه مورد نظر پیدا نشد</h2>
      <p className="text-sm text-gray-500">لینکی که دنبال کردید ممکن است حذف یا جابه‌جا شده باشد.</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-8 py-3 text-sm font-bold text-white shadow-md shadow-brand-500/20 transition-transform hover:-translate-y-0.5 hover:shadow-lg"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
