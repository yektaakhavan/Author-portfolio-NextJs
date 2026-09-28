import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useCart } from "../../context/CartContext";
import { useBooks } from "../../hooks/useBooks";

const formatPrice = (value) => new Intl.NumberFormat("fa-IR").format(value);

function BookProduct({ book }) {
  const specsRef = useRef(null);
  const tocRef = useRef(null);
  const introRef = useRef(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const scrollToSection = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop - 100, behavior: "smooth" });
  };

  const maxQty = book.stock === null ? Infinity : book.stock;

  const handleAddToCart = () => {
    addToCart(
      { id: book.id, title: book.title, price: book.price, image: book.image },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(
      { id: book.id, title: book.title, price: book.price, image: book.image },
      qty,
    );
    navigate("/checkout");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      {/* sidebar TOC (nav) */}
      <aside className="order-2 lg:order-1">
        <div className="sticky top-24 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-3 text-sm font-bold text-brand-700">فهرست مطالب</h2>
          <ul className="space-y-2 text-sm">
            {[
              ["مشخصات کتاب", specsRef],
              ["فهرست کتاب", tocRef],
              ["معرفی کتاب", introRef],
            ].map(([label, ref]) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => scrollToSection(ref)}
                  className="text-gray-600 transition-colors hover:text-brand-500"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="order-1 space-y-8 lg:order-2">
        {/* product header */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <img
              src={book.image}
              alt={book.title}
              className="mx-auto aspect-[3/4] w-full max-w-xs rounded-xl object-cover shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-brand-700">
                {book.title}
              </h1>
              <p className="mt-1 text-gray-500">{book.subtitle}</p>

              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex gap-2">
                  <dt className="font-bold text-brand-700">نویسنده:</dt>
                  <dd className="text-gray-600">{book.author}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-bold text-brand-700">دسته‌بندی:</dt>
                  <dd className="text-gray-600">{book.category}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-bold text-brand-700">ناشر:</dt>
                  <dd className="text-gray-600">{book.publisher}</dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-2xl font-extrabold text-brand-700">
                  {formatPrice(book.price)}{" "}
                  <span className="text-sm font-normal">تومان</span>
                </span>
                {book.inStock === false && (
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
                    ناموجود
                  </span>
                )}
                {book.inStock !== false &&
                  book.stock !== null &&
                  book.stock <= 5 && (
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
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-9 w-9 items-center justify-center text-brand-500"
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label="افزایش تعداد"
                    onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                    className="flex h-9 w-9 items-center justify-center text-brand-500"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={book.inStock === false}
                  className="inline-flex min-w-0 flex-1 items-center justify-center gap-2
    whitespace-nowrap rounded-full border-2 border-emerald-500
    px-4 py-2.5 text-sm font-bold text-emerald-600
    transition-all duration-200
    hover:bg-emerald-500 hover:text-white hover:shadow-md
    disabled:cursor-not-allowed disabled:border-gray-300
    disabled:text-gray-400 disabled:hover:bg-transparent"
                >
                  {added ? (
                    <FaCheckCircle className="shrink-0" />
                  ) : (
                    <FaShoppingCart className="shrink-0" />
                  )}

                  <span className="whitespace-nowrap">
                    {added ? "افزوده شد" : "افزودن به سبد"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={book.inStock === false}
                  className="inline-flex min-w-0 flex-1 items-center justify-center
    whitespace-nowrap rounded-full
    bg-gradient-to-l from-emerald-600 to-emerald-500
    px-4 py-2.5 text-sm font-bold text-white shadow-md
    transition-all duration-200
    hover:-translate-y-0.5 hover:shadow-lg
    disabled:cursor-not-allowed disabled:from-gray-300
    disabled:to-gray-300 disabled:hover:translate-y-0"
                >
                  {book.inStock === false ? "ناموجود" : "خرید سریع"}
                </button>
              </div>
              {/* <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={book.inStock === false}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2
                   border-brand-500 px-5 py-2.5 text-sm font-bold text-brand-500
                    transition-colors hover:bg-brand-500 hover:text-white disabled:cursor-not-allowed
                     disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent"
                >
                  {added ? <FaCheckCircle /> : <FaShoppingCart />}
                  {added ? "افزوده شد" : "افزودن به سبد"}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={book.inStock === false}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300 disabled:hover:translate-y-0"
                >
                  {book.inStock === false ? "ناموجود" : "خرید سریع"}
                </button> */}

              <p className="mt-3 text-xs text-gray-500">
                یا جهت خرید تلفنی با شماره{" "}
                <a
                  href="tel:09108083995"
                  dir="ltr"
                  className="font-bold text-brand-500"
                >
                  0910 808 3995
                </a>{" "}
                تماس بگیرید.
              </p>
            </div>
          </div>
        </div>

        {/* specs */}
        <div
          ref={specsRef}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
        >
          <h2 className="mb-4 text-lg font-bold text-brand-700">مشخصات فنی</h2>
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {book.specs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-lg bg-brand-500/5 px-3 py-2 text-sm"
              >
                <dt className="text-gray-500">{spec.label}</dt>
                <dd className="font-bold text-brand-700">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* table of contents */}
        <div
          ref={tocRef}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
        >
          <h2 className="mb-4 text-lg font-bold text-brand-700">فهرست مطالب</h2>
          <ul className="space-y-3">
            {book.tableOfContents.map((chapter) => (
              <li key={chapter.title}>
                <span className="font-bold text-brand-700">
                  {chapter.title}
                </span>
                {chapter.children && (
                  <ul className="mt-1 mr-5 list-inside list-disc space-y-1 text-sm text-gray-600">
                    {chapter.children.map((child) => (
                      <li key={child}>{child}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* description */}
        <div
          ref={introRef}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
        >
          <h2 className="mb-4 text-lg font-bold text-brand-700">معرفی کتاب</h2>
          <div className="space-y-3 text-justify leading-8 text-gray-700">
            {book.description.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <h3 className="mt-5 mb-2 font-bold text-brand-700">
            ویژگی‌های کلیدی کتاب:
          </h3>
          <ul className="space-y-2">
            {book.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <FaCheckCircle className="text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Books() {
  const books = useBooks();

  return (
    <Layout
      title="کتاب‌ها"
      description="خرید آنلاین کتاب دیسیپلین کار، اثر علیرضا اخوان صفائی."
    >
      <div className="container-app py-12">
        <PageHeader title="کتاب‌ها" type="books" />
        <div className="space-y-16">
          {books.map((book) => (
            <BookProduct key={book.id} book={book} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Books;
