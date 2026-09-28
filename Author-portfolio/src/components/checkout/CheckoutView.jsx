"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle } from "react-icons/fa";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import FormField, { inputClass } from "@/components/ui/FormField";
import PageHeader from "@/components/ui/PageHeader";
import { useCart } from "@/hooks/useCart";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/format";

const CALL_TIME_OPTIONS = ["هر زمان", "صبح (۹ تا ۱۲)", "ظهر (۱۲ تا ۱۵)", "عصر (۱۵ تا ۱۸)", "شب (۱۸ تا ۲۱)"];

const INITIAL_FORM = {
  fullName: "",
  phone: "",
  city: "",
  address: "",
  postalCode: "",
  preferredCallTime: CALL_TIME_OPTIONS[0],
};

// Iranian mobile number, with or without the leading zero.
const MOBILE_PATTERN = /^0?9\d{9}$/;

/** Returns a map of field name to error message; empty when the form is valid. */
function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = "نام و نام خانوادگی را وارد کنید.";
  if (!MOBILE_PATTERN.test(form.phone.trim())) errors.phone = "شماره موبایل معتبر نیست.";
  if (!form.city.trim()) errors.city = "شهر را وارد کنید.";
  if (!form.address.trim()) errors.address = "آدرس را وارد کنید.";
  return errors;
}

export default function CheckoutView() {
  const router = useRouter();
  const { cartItems, isReady, total, clearCart } = useCart();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const cartIsEmpty = isReady && cartItems.length === 0;

  useEffect(() => {
    if (cartIsEmpty && !submitted) router.replace("/cart");
  }, [cartIsEmpty, submitted, router]);

  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // No payment gateway is wired up yet (e.g. Zarinpal). To add one, redirect
    // the user to the gateway right after the order is created below, instead
    // of showing the confirmation screen.
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

  if (submitted) return <OrderConfirmation callTime={form.preferredCallTime} phone={form.phone} />;
  if (!isReady || cartIsEmpty) return <div className="min-h-[60vh]" />;

  return (
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
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
        >
          <h2 className="mb-2 text-lg font-bold text-brand-700">اطلاعات ارسال</h2>

          <FormField id="fullName" label="نام و نام خانوادگی" error={errors.fullName}>
            <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} className={inputClass} />
          </FormField>

          <FormField id="phone" label="شماره موبایل" error={errors.phone}>
            <input
              id="phone"
              name="phone"
              dir="ltr"
              inputMode="numeric"
              value={form.phone}
              onChange={handleChange}
              placeholder="09xxxxxxxxx"
              className={inputClass}
            />
          </FormField>

          <FormField id="preferredCallTime" label="چه ساعتی با شما تماس بگیریم؟">
            <select
              id="preferredCallTime"
              name="preferredCallTime"
              value={form.preferredCallTime}
              onChange={handleChange}
              className={`${inputClass} bg-white`}
            >
              {CALL_TIME_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="city" label="شهر" error={errors.city}>
            <input id="city" name="city" value={form.city} onChange={handleChange} className={inputClass} />
          </FormField>

          <FormField id="address" label="آدرس کامل" error={errors.address}>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={form.address}
              onChange={handleChange}
              className={inputClass}
            />
          </FormField>

          <FormField id="postalCode" label="کد پستی">
            <input
              id="postalCode"
              name="postalCode"
              dir="ltr"
              inputMode="numeric"
              value={form.postalCode}
              onChange={handleChange}
              className={inputClass}
            />
          </FormField>

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
                <Image src={item.image} alt={item.title} width={48} height={56} className="h-14 w-12 rounded-md object-cover" />
                <div className="flex-1 text-sm">
                  <p className="font-bold text-brand-700">{item.title}</p>
                  <p className="text-gray-500">تعداد: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold text-brand-700">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-dashed border-gray-200 pt-3 font-bold text-brand-700">
            <span>مبلغ قابل پرداخت</span>
            <span>{formatPrice(total)} تومان</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
