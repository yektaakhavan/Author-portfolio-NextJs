"use client";

/** Shown when a page fails to load (e.g. the API is unreachable). */
export default function PageError({ reset }) {
  return (
    <div className="container-app flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-xl font-bold text-brand-700">مشکلی در بارگذاری صفحه پیش آمد</h1>
      <p className="text-sm text-gray-500">لطفاً چند لحظه دیگر دوباره تلاش کنید.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-8 py-3 text-sm font-bold text-white shadow-md"
      >
        تلاش مجدد
      </button>
    </div>
  );
}
