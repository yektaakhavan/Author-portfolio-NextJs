import CartView from "@/components/cart/CartView";

export const metadata = {
  title: "سبد خرید",
  description: "سبد خرید شما",
  robots: { index: false },
};

export default function CartPage() {
  return <CartView />;
}
