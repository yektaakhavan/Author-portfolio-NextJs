import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash, FaShoppingBag } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/PageHeader/PageHeader";
import GradientButton from "../../components/GradientButton/GradientButton";
import { useCart } from "../../context/CartContext";

const formatPrice = (value) => new Intl.NumberFormat("fa-IR").format(value);

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();

  if (cartItems.length === 0) {
    return (
      <Layout title="سبد خرید" description="سبد خرید شما">
        <div className="container-app flex flex-col items-center gap-4 py-20 text-center">
          <FaShoppingBag className="text-5xl text-brand-500/30" />
          <h1 className="text-xl font-bold text-brand-700">سبد خرید شما خالی است</h1>
          <p className="text-sm text-gray-500">هنوز کتابی به سبد خرید خود اضافه نکرده‌اید.</p>
          <GradientButton to="/books" text="مشاهده کتاب‌ها" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="سبد خرید" description="سبد خرید شما">
      <div className="container-app py-12">
        <PageHeader title="سبد خرید" type="cart" />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:flex-row"
              >
                <img src={item.image} alt={item.title} className="h-24 w-20 rounded-lg object-cover" />
                <div className="flex-1 text-center sm:text-right">
                  <h2 className="font-bold text-brand-700">{item.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatPrice(item.price)} تومان
                  </p>
                </div>

                <div className="flex items-center rounded-full border border-brand-500/20">
                  <button
                    type="button"
                    aria-label="کاهش تعداد"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-9 w-9 items-center justify-center text-brand-500"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label="افزایش تعداد"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                  onClick={() => removeFromCart(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-red-400 hover:bg-red-50 hover:text-red-500"
                >
                  <FaTrash size={14} />
                </button>
              </li>
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
              to="/checkout"
              className="mt-6 flex items-center justify-center rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-5 py-3 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              ادامه فرآیند خرید
            </Link>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
