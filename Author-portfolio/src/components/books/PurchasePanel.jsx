"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";

const LOW_STOCK_THRESHOLD = 5;
const ADDED_FEEDBACK_MS = 2000;

/** Price, stock status and the add-to-cart / buy-now controls for one book. */
export default function PurchasePanel({ book, phone }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const maxQuantity = book.stock ?? Infinity; // null stock = not tracked
  const lowStock = book.inStock && book.stock !== null && book.stock <= LOW_STOCK_THRESHOLD;

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), ADDED_FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [justAdded]);

  const addBookToCart = () =>
    addToCart({ id: book.id, title: book.title, price: book.price, image: book.image }, quantity);

  const handleAddToCart = () => {
    addBookToCart();
    setJustAdded(true);
  };

  const handleBuyNow = () => {
    addBookToCart();
    router.push("/checkout");
  };

  return (
    <>
      <div className="mt-5 flex items-center gap-3">
        <span className="text-2xl font-extrabold text-brand-700">
          {formatPrice(book.price)} <span className="text-sm font-normal">تومان</span>
        </span>
        {!book.inStock && (
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">ناموجود</span>
        )}
        {lowStock && (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
            فقط {book.stock} عدد باقی مانده
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex items-center rounded-full border border-brand-500/20">
          <button
            type="button"
            aria-label="کاهش تعداد"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-9 w-9 items-center justify-center text-brand-500"
          >
            <FaMinus size={12} />
          </button>
          <span className="w-8 text-center text-sm font-bold">{quantity}</span>
          <button
            type="button"
            aria-label="افزایش تعداد"
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
            className="flex h-9 w-9 items-center justify-center text-brand-500"
          >
            <FaPlus size={12} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!book.inStock}
          className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-emerald-500 px-4 py-2.5 text-sm font-bold text-emerald-600 transition-all duration-200 hover:bg-emerald-500 hover:text-white hover:shadow-md disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent"
        >
          {justAdded ? <FaCheckCircle className="shrink-0" /> : <FaShoppingCart className="shrink-0" />}
          {justAdded ? "افزوده شد" : "افزودن به سبد"}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={!book.inStock}
          className="inline-flex min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-l from-emerald-600 to-emerald-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300 disabled:hover:translate-y-0"
        >
          {book.inStock ? "خرید سریع" : "ناموجود"}
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        یا جهت خرید تلفنی با شماره{" "}
        <a href={`tel:${phone}`} dir="ltr" className="font-bold text-brand-500">
          {phone}
        </a>{" "}
        تماس بگیرید.
      </p>
    </>
  );
}
