import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

/** Shown after an order is saved; explains the manual payment follow-up call. */
export default function OrderConfirmation({ callTime, phone }) {
  return (
    <div className="container-app flex flex-col items-center gap-4 py-20 text-center">
      <FaCheckCircle className="text-5xl text-green-500" />
      <h1 className="text-xl font-bold text-brand-700">سفارش شما با موفقیت ثبت شد</h1>

      <div className="mt-2 max-w-lg space-y-3 rounded-2xl bg-amber-50 p-5 text-right ring-1 ring-amber-200">
        <div className="flex items-center gap-2 text-amber-700">
          <FaExclamationTriangle />
          <span className="text-sm font-bold">پرداخت آنلاین موقتاً غیرفعال است</span>
        </div>
        <p className="text-sm leading-7 text-amber-800">
          درگاه پرداخت آنلاین سایت در حال حاضر به‌دلیل یک مشکل فنی در دسترس نیست، به همین دلیل امکان تکمیل خودکار
          پرداخت وجود ندارد. نگران نباشید — سفارش شما با موفقیت ثبت شد و همکاران ما{" "}
          <span className="font-bold">در بازه‌ی «{callTime}»</span> با شماره{" "}
          <span dir="ltr" className="font-bold">
            {phone}
          </span>{" "}
          با شما تماس می‌گیرند تا جزئیات سفارش را تأیید و روش پرداخت (واریز کارت‌به‌کارت یا پرداخت درب منزل) را
          هماهنگ کنند.
        </p>
      </div>

      <p className="max-w-md text-xs text-gray-400">
        در صورتی که تماس دریافت نکردید، می‌توانید مستقیماً از طریق صفحه‌ی{" "}
        <a href="/contact" className="font-bold text-brand-500 hover:underline">
          ارتباط با ما
        </a>{" "}
        پیگیری کنید.
      </p>
    </div>
  );
}
