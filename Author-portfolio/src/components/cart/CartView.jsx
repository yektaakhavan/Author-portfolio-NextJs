"use client";

import Image from "next/image";
import Link from "next/link";
import { FaMinus, FaPlus, FaShoppingBag, FaTrash } from "react-icons/fa";
import GradientButton from "@/components/ui/GradientButton";
import PageHeader from "@/components/ui/PageHeader";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";

function EmptyCart() {
  return (
    <div className="container-app flex flex-col items-center gap-4 py-20 text-center">
      <FaShoppingBag className="text-5xl text-brand-500/30" />
      <h1 className="text-xl font-bold text-brand-700">سبد خرید شما خالی است</h1>
      <p className="text-sm text-gray-500">هنوز کتابی به سبد خرید خود اضافه نکرده‌اید.</p>
      <GradientButton href="/books">مشاهده کتاب‌ها</GradientButton>
    </div>
  );
}

function CartItemRow({ item, onQuantityChange, onRemove }) {
  return (
    <li className="flex flex-col items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:flex-row">
      <Image src={item.image} alt={item.title} width={80} height={96} className="h-24 w-20 rounded-lg object-cover" />

      <div className="flex-1 text-center sm:text-right">
        <h2 className="font-bold text-brand-700">{item.title}</h2>
        <p className="mt-1 text-sm text-gray-500">{formatPrice(item.price)} تومان</p>
      </div>

      <div className="flex items-center rounded-full border border-brand-500/20">
        <button
          type="button"
          aria-label="کاهش تعداد"
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          className="flex h-9 w-9 items-center justify-center text-brand-500"
        >
          <FaMinus size={12} />
        </button>
        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
        <button
          type="button"
          aria-label="افزایش تعداد"
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          className="flex h-9 w-9 items-center justify-center text-brand-500"
        >
          <FaPlus size={12} />
        </button>
      </div>

      <div className="w-24 text-center font-bold text-brand-700 sm:text-left">
        {formatPrice(item.price * item.quantity)}
      </div>

      <button
        type="button"
        aria-label="حذف از سبد"
        onClick={() => onRemove(item.id)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-red-400 hover:bg-red-50 hover:text-red-500"
      >
        <FaTrash size={14} />
      </button>
    </li>
  );
}

export default function CartView() {
  const { cartItems, isReady, total, updateQuantity, removeFromCart } = useCart();

  // The saved cart is only known in the browser; avoid flashing the empty state.
  if (!isReady) return <div className="min-h-[60vh]" />;
  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="container-app py-12">
      <PageHeader title="سبد خرید" type="cart" />

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <CartItemRow key={item.id} item={item} onQuantityChange={updateQuantity} onRemove={removeFromCart} />
          ))}
        </ul>

        <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-4 text-lg font-bold text-brand-700">خلاصه سفارش</h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>جمع کل</span>
            <span>{formatPrice(total)} تومان</span>
          </div>
          <div className="my-4 border-t border-dashed border-gray-200" />
          <div className="flex justify-between font-bold text-brand-700">
            <span>مبلغ قابل پرداخت</span>
            <span>{formatPrice(total)} تومان</span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 flex items-center justify-center rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-5 py-3 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
          >
            ادامه فرآیند خرید
          </Link>
        </aside>
      </div>
    </div>
  );
}
