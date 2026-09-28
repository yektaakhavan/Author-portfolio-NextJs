import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata = {
  title: "تکمیل خرید",
  description: "اطلاعات ارسال سفارش خود را وارد کنید.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
