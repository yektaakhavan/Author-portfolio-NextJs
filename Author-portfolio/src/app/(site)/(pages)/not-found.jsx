import GradientButton from "@/components/ui/GradientButton";

export const metadata = { title: "صفحه پیدا نشد" };

export default function NotFound() {
  return (
    <div className="container-app flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-6xl font-black text-brand-500/20">۴۰۴</h1>
      <h2 className="text-xl font-bold text-brand-700">صفحه مورد نظر پیدا نشد</h2>
      <p className="text-sm text-gray-500">لینکی که دنبال کردید ممکن است حذف یا جابه‌جا شده باشد.</p>
      <GradientButton href="/">بازگشت به صفحه اصلی</GradientButton>
    </div>
  );
}
