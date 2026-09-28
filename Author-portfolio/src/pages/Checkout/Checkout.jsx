import { useState } from "react";
import { Navigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useCart } from "../../context/CartContext";
import { api } from "../../lib/api";

const formatPrice = (value) => new Intl.NumberFormat("fa-IR").format(value);

const CALL_TIME_OPTIONS = [
  "هر زمان",
  "صبح (۹ تا ۱۲)",
  "ظهر (۱۲ تا ۱۵)",
  "عصر (۱۵ تا ۱۸)",
  "شب (۱۸ تا ۲۱)",
];

const initialForm = {
  fullName: "",
  phone: "",
  city: "",
  address: "",
  postalCode: "",
  preferredCallTime: CALL_TIME_OPTIONS[0],
};

function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "نام و نام خانوادگی را وارد کنید.";
    if (!/^0?9\d{9}$/.test(form.phone.trim())) next.phone = "شماره موبایل معتبر نیست.";
    if (!form.city.trim()) next.city = "شهر را وارد کنید.";
    if (!form.address.trim()) next.address = "آدرس را وارد کنید.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // NOTE: there is no real payment gateway wired up yet (e.g. Zarinpal).
    // This is the integration point for one: after the order is created
    // below, redirect the user to the gateway's payment page instead of
    // showing the confirmation screen directly.
    setSubmitting(true);
    setSubmitError("");
    try {
      await api.createOrder({ customer: form, items: cartItems, total });
      setSubmitted(true);
      clearCart();
    } catch {
      setSubmitError("ثبت سفارش با خطا مواجه شد. لطفاً دوباره تلاش کنید یا با شماره پشتیبانی تماس بگیرید.");
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !submitted) {
    return <Navigate to="/cart" replace />;
  }

  if (submitted) {
    return (
      <Layout title="ثبت سفارش" description="سفارش شما ثبت شد">
        <div className="container-app flex flex-col items-center gap-4 py-20 text-center">
          <FaCheckCircle className="text-5xl text-green-500" />
          <h1 className="text-xl font-bold text-brand-700">سفارش شما با موفقیت ثبت شد</h1>

          <div className="mt-2 max-w-lg space-y-3 rounded-2xl bg-amber-50 p-5 text-right ring-1 ring-amber-200">
            <div className="flex items-center gap-2 text-amber-700">
              <FaExclamationTriangle />
              <span className="text-sm font-bold">پرداخت آنلاین موقتاً غیرفعال است</span>
            </div>
            <p className="text-sm leading-7 text-amber-800">
              درگاه پرداخت آنلاین سایت در حال حاضر به‌دلیل یک مشکل فنی در دسترس نیست، به همین دلیل امکان تکمیل
              خودکار پرداخت وجود ندارد. نگران نباشید — سفارش شما با موفقیت ثبت شد و همکاران ما{" "}
              <span className="font-bold">در بازه‌ی «{form.preferredCallTime}»</span> با شماره{" "}
              <span dir="ltr" className="font-bold">{form.phone}</span> با شما تماس می‌گیرند تا جزئیات سفارش را
              تأیید و روش پرداخت (واریز کارت‌به‌کارت یا پرداخت درب منزل) را هماهنگ کنند.
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
      </Layout>
    );
  }

  return (
    <Layout title="تکمیل خرید" description="اطلاعات ارسال سفارش خود را وارد کنید.">
      <div className="container-app py-12">
        <PageHeader title="تکمیل خرید" type="cart" />

        <div className="mb-6 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-700 ring-1 ring-amber-200">
          <FaExclamationTriangle className="mt-0.5 shrink-0" />
          <p>
            پرداخت آنلاین سایت موقتاً در دسترس نیست. پس از ثبت سفارش، همکاران ما در بازه‌ی زمانی انتخابی شما تماس
            می‌گیرند تا سفارش و روش پرداخت را هماهنگ کنند.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-2 text-lg font-bold text-brand-700">اطلاعات ارسال</h2>

            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-bold text-gray-700">
                نام و نام خانوادگی
              </label>
              <input
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-bold text-gray-700">
                شماره موبایل
              </label>
              <input
                id="phone"
                name="phone"
                dir="ltr"
                inputMode="numeric"
                value={form.phone}
                onChange={handleChange}
                placeholder="09xxxxxxxxx"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="preferredCallTime" className="mb-1 block text-sm font-bold text-gray-700">
                چه ساعتی با شما تماس بگیریم؟
              </label>
              <select
                id="preferredCallTime"
                name="preferredCallTime"
                value={form.preferredCallTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {CALL_TIME_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-bold text-gray-700">
                شهر
              </label>
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-bold text-gray-700">
                آدرس کامل
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={form.address}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="postalCode" className="mb-1 block text-sm font-bold text-gray-700">
                کد پستی
              </label>
              <input
                id="postalCode"
                name="postalCode"
                dir="ltr"
                inputMode="numeric"
                value={form.postalCode}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>

            {submitError && <p className="text-xs text-red-500">{submitError}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-5 py-3 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {submitting ? "در حال ثبت سفارش…" : "ثبت نهایی سفارش"}
            </button>
          </form>

          <aside className="h-fit space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-bold text-brand-700">سفارش شما</h2>
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="h-14 w-12 rounded-md object-cover" />
                  <div className="flex-1 text-sm">
                    <p className="font-bold text-brand-700">{item.title}</p>
                    <p className="text-gray-500">تعداد: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-brand-700">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between font-bold text-brand-700">
              <span>مبلغ قابل پرداخت</span>
              <span>{formatPrice(total)} تومان</span>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export default Checkout;
