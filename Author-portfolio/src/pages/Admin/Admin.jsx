import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaLock,
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaNewspaper,
  FaCog,
  FaPlus,
  FaTrash,
  FaPen,
} from "react-icons/fa";
import { api, getToken, setToken, resolveAsset } from "../../lib/api";
import baseBooks from "../../data/books";
import { BOOKS_UPDATED_EVENT } from "../../hooks/useBooks";

const formatPrice = (value) => new Intl.NumberFormat("fa-IR").format(value);
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });

const IMAGE_GALLERY = [
  "/uploads/articles/digital-goodnight.svg",
  "/uploads/articles/saying-no.svg",
  "/uploads/articles/effective-meetings.svg",
  "/uploads/articles/focus-productivity.svg",
  "/uploads/articles/growth-success.svg",
  "/uploads/articles/planning-calendar.svg",
];

/* ---------------------------- login ---------------------------- */

function LoginGate({ onSuccess }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token } = await api.login(username, password);
      setToken(token);
      onSuccess();
    } catch (err) {
      setError(err.message || "ورود ناموفق بود.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-500/5 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg ring-1 ring-black/5">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-xl text-brand-500">
          <FaLock />
        </div>
        <h1 className="mb-1 text-lg font-bold text-brand-700">ورود به پنل مدیریت</h1>
        <p className="mb-5 text-sm text-gray-500">نام کاربری و رمز عبور را وارد کنید.</p>

        <label className="mb-1 block text-xs text-gray-500">نام کاربری</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />

        <label className="mb-1 block text-xs text-gray-500">رمز عبور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />

        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-5 py-2.5 text-sm font-bold text-white shadow-md disabled:opacity-60"
        >
          {loading ? "در حال ورود…" : "ورود"}
        </button>
      </form>
    </div>
  );
}

/* ---------------------------- orders ---------------------------- */

function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => api.getOrders().then(setOrders).finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id, status) => {
    await api.updateOrderStatus(id, status);
    load();
  };

  if (loading) return <p className="text-center text-sm text-gray-400">در حال بارگذاری…</p>;
  if (orders.length === 0) {
    return (
      <p className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 ring-1 ring-black/5">
        هنوز سفارشی ثبت نشده است.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div key={order.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-sm font-bold text-brand-700">{order.customer.fullName}</span>
              <span dir="ltr" className="mr-2 text-xs text-gray-500">
                {order.customer.phone}
              </span>
            </div>
            <span className="text-xs text-gray-400">{formatDate(order.createdAt)}</span>
          </div>

          <p className="mt-2 text-xs text-gray-500">
            {order.customer.city} — {order.customer.address}
          </p>
          {order.customer.preferredCallTime && (
            <p className="mt-1 text-xs text-brand-500">
              ساعت ترجیحی تماس: <span className="font-bold">{order.customer.preferredCallTime}</span>
            </p>
          )}

          <ul className="mt-3 space-y-1 border-t border-dashed border-gray-200 pt-3 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-600">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)} تومان</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center justify-between border-t border-dashed border-gray-200 pt-3">
            <span className="font-bold text-brand-700">{formatPrice(order.total)} تومان</span>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs focus:outline-none"
            >
              <option>در انتظار تماس</option>
              <option>در حال پردازش</option>
              <option>ارسال شده</option>
              <option>تکمیل شده</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------- catalog (books) ---------------------------- */

function CatalogTab() {
  const [overrides, setOverrides] = useState({});
  const [loading, setLoading] = useState(true);

  const load = () => api.getBookOverrides().then(setOverrides).finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const handleSave = async (bookId, field, value) => {
    await api.updateBookOverride(bookId, { [field]: value });
    load();
    window.dispatchEvent(new Event(BOOKS_UPDATED_EVENT));
  };

  if (loading) return <p className="text-center text-sm text-gray-400">در حال بارگذاری…</p>;

  return (
    <div className="space-y-4">
      {baseBooks.map((book) => {
        const price = overrides[book.id]?.price ?? book.price;
        const stock = overrides[book.id]?.stock;
        const stockValue = stock === undefined || stock === null ? "" : stock;
        return (
          <div key={book.id} className="flex flex-wrap items-center gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <img src={book.image} alt={book.title} className="h-16 w-14 rounded-lg object-cover" />
            <div className="min-w-[140px] flex-1">
              <p className="font-bold text-brand-700">{book.title}</p>
              <p className="text-xs text-gray-500">{book.author}</p>
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-500">قیمت (تومان)</label>
              <input
                type="number"
                defaultValue={price}
                onBlur={(e) => handleSave(book.id, "price", Number(e.target.value) || 0)}
                className="w-32 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-500">موجودی (تعداد)</label>
              <input
                type="number"
                min="0"
                placeholder="نامحدود"
                defaultValue={stockValue}
                onBlur={(e) => handleSave(book.id, "stock", e.target.value === "" ? null : Math.max(0, Number(e.target.value)))}
                className="w-32 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none"
              />
            </div>

            <span className="text-xs text-gray-400">
              {stockValue === "" ? "موجودی رهگیری نمی‌شود (همیشه موجود)" : stockValue > 0 ? `${stockValue} عدد در انبار` : "ناموجود"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------- articles ---------------------------- */

const IMAGE_STYLE_PROMPT = `Flat vector illustration, minimalist and modern corporate style (similar to premium SaaS/onboarding illustrations).
Rounded, simplified character(s): circular head, no detailed facial features beyond simple dot eyes and a soft closed-mouth smile, warm gold skin tone (#e0b25a).
Strict color palette only — deep navy (#0f1258, #2f3690, #090b35), warm gold (#c8952f, #e0b25a), very light lavender background (#eef0fb, #d7dbf3), plus white.
Soft rounded geometric shapes, subtle gradients allowed, no harsh black outlines, no photorealism, no 3D render, no text/typography in the image, no busy background clutter.
A single soft ellipse drop-shadow beneath grounded objects/characters. Clean, friendly, professional business/self-improvement tone. 4:3 aspect ratio.
Subject of this specific illustration: [موضوع یا خلاصه‌ی مقاله را اینجا بنویسید]`;

function ImagePromptHelper() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(IMAGE_STYLE_PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <details className="rounded-xl bg-brand-500/5 p-4 text-sm">
      <summary className="cursor-pointer font-bold text-brand-700">
        راهنما: ساخت تصویر جدید هم‌استایل با گالری (با هوش مصنوعی)
      </summary>
      <div className="mt-3 space-y-2 text-xs text-gray-600">
        <p>
          این متن را کپی کنید، جای براکت را با موضوع مقاله عوض کنید و در یک ابزار تولید تصویر هوش مصنوعی (مثل
          ChatGPT/DALL·E، Midjourney یا مشابه) وارد کنید. تصویر ساخته‌شده را جایی آپلود کنید (مثلاً یک هاست تصویر)
          و لینکش را در قسمت «آدرس تصویر سفارشی» بالا وارد کنید.
        </p>
        <pre className="whitespace-pre-wrap rounded-lg bg-white p-3 font-mono text-[11px] leading-6 text-gray-700 ring-1 ring-black/5">
          {IMAGE_STYLE_PROMPT}
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-brand-500 px-4 py-1.5 text-xs font-bold text-white"
        >
          {copied ? "کپی شد ✓" : "کپی پرامپت"}
        </button>
      </div>
    </details>
  );
}

const emptyArticleForm = { title: "", summary: "", content1: "", content2: "", image: IMAGE_GALLERY[3] };

function ArticleForm({ initial, onCancel, onSaved }) {
  const [form, setForm] = useState(initial || emptyArticleForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.summary.trim() || !form.content1.trim()) {
      setError("عنوان، خلاصه و متن اصلی الزامی است.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (form.id) {
        await api.updateArticle(form.id, form);
      } else {
        await api.createArticle(form);
      }
      onSaved();
    } catch (err) {
      setError(err.message || "ذخیره‌سازی با خطا مواجه شد.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h3 className="font-bold text-brand-700">{form.id ? "ویرایش مقاله" : "مقاله جدید"}</h3>

      <div>
        <label className="mb-1 block text-xs text-gray-500">عنوان</label>
        <input
          value={form.title}
          onChange={handleChange("title")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">خلاصه (روی کارت نمایش داده می‌شود)</label>
        <textarea
          rows={2}
          value={form.summary}
          onChange={handleChange("summary")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">متن اصلی</label>
        <textarea
          rows={4}
          value={form.content1}
          onChange={handleChange("content1")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">
          ادامه متن (اختیاری — می‌تواند شامل تگ‌های ساده HTML مثل &lt;h4&gt;، &lt;ul&gt;، &lt;li&gt; باشد)
        </label>
        <textarea
          rows={5}
          value={form.content2}
          onChange={handleChange("content2")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-xs focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs text-gray-500">تصویر مقاله — از گالری آماده انتخاب کنید</label>
        <div className="flex flex-wrap gap-2">
          {IMAGE_GALLERY.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setForm((f) => ({ ...f, image: src }))}
              className={`h-16 w-20 overflow-hidden rounded-lg ring-2 transition-all ${
                form.image === src ? "ring-brand-500" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={resolveAsset(src)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        <label className="mt-3 mb-1 block text-xs text-gray-500">یا آدرس یک تصویر سفارشی (بعد از ساخت با پرامپت زیر)</label>
        <input
          dir="ltr"
          value={form.image}
          onChange={handleChange("image")}
          placeholder="https://..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:border-brand-500 focus:outline-none"
        />
      </div>

      <ImagePromptHelper />

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-5 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          {saving ? "در حال ذخیره…" : "ذخیره"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-full px-5 py-2 text-sm text-gray-500 hover:bg-gray-100">
          انصراف
        </button>
      </div>
    </form>
  );
}

function ArticlesTab() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | article object

  const load = () => api.getArticles().then(setArticles).finally(() => setLoading(false));
  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("این مقاله حذف شود؟")) return;
    await api.deleteArticle(id);
    load();
  };

  if (editing) {
    return (
      <ArticleForm
        initial={editing === "new" ? null : editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setEditing("new")}
        className="flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-bold text-white"
      >
        <FaPlus /> مقاله جدید
      </button>

      {loading ? (
        <p className="text-center text-sm text-gray-400">در حال بارگذاری…</p>
      ) : (
        <div className="space-y-3">
          {articles.map((article) => (
            <div key={article.id} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              <img src={resolveAsset(article.image)} alt="" className="h-14 w-14 rounded-lg bg-brand-50 object-cover" />
              <div className="flex-1">
                <p className="font-bold text-brand-700">{article.title}</p>
                <p className="line-clamp-1 text-xs text-gray-500">{article.summary}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(article)}
                aria-label="ویرایش"
                className="flex h-9 w-9 items-center justify-center rounded-full text-brand-500 hover:bg-brand-500/10"
              >
                <FaPen size={13} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(article.id)}
                aria-label="حذف"
                className="flex h-9 w-9 items-center justify-center rounded-full text-red-400 hover:bg-red-50 hover:text-red-500"
              >
                <FaTrash size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------- settings ---------------------------- */

function SettingsTab() {
  const [settings, setSettings] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  const handleChange = (field) => (e) => {
    setSettings((s) => ({ ...s, [field]: e.target.value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.updateSettings(settings);
    setSaved(true);
  };

  if (!settings) return <p className="text-center text-sm text-gray-400">در حال بارگذاری…</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h3 className="font-bold text-brand-700">اطلاعات تماس سایت</h3>

      <div>
        <label className="mb-1 block text-xs text-gray-500">شماره تماس</label>
        <input
          dir="ltr"
          value={settings.contact_phone}
          onChange={handleChange("contact_phone")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">ایمیل</label>
        <input
          dir="ltr"
          value={settings.contact_email}
          onChange={handleChange("contact_email")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">متن پشتیبانی (صفحه ارتباط با ما)</label>
        <textarea
          rows={3}
          value={settings.support_note}
          onChange={handleChange("support_note")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <h3 className="pt-2 font-bold text-brand-700">شبکه‌های اجتماعی</h3>

      <div>
        <label className="mb-1 block text-xs text-gray-500">اینستاگرام</label>
        <input
          dir="ltr"
          value={settings.social_instagram || ""}
          onChange={handleChange("social_instagram")}
          placeholder="https://instagram.com/..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">تلگرام</label>
        <input
          dir="ltr"
          value={settings.social_telegram || ""}
          onChange={handleChange("social_telegram")}
          placeholder="https://t.me/..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">واتساپ</label>
        <input
          dir="ltr"
          value={settings.social_whatsapp || ""}
          onChange={handleChange("social_whatsapp")}
          placeholder="https://wa.me/98..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-500">ایتا</label>
        <input
          dir="ltr"
          value={settings.social_eitaa || ""}
          onChange={handleChange("social_eitaa")}
          placeholder="https://eitaa.com/..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-5 py-2 text-sm font-bold text-white">
          ذخیره تغییرات
        </button>
        {saved && <span className="text-xs text-green-600">ذخیره شد.</span>}
      </div>
    </form>
  );
}

/* ---------------------------- dashboard shell ---------------------------- */

const TABS = [
  { key: "orders", label: "سفارش‌ها", icon: FaClipboardList },
  { key: "catalog", label: "مدیریت کتاب", icon: FaBoxOpen },
  { key: "articles", label: "مقالات", icon: FaNewspaper },
  { key: "settings", label: "تنظیمات سایت", icon: FaCog },
];

function Dashboard({ onLogout }) {
  const [tab, setTab] = useState("orders");

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>پنل مدیریت | علیرضا اخوان صفائی</title>
      </Helmet>

      <header className="border-b border-gray-200 bg-white">
        <div className="container-app flex h-16 items-center justify-between">
          <h1 className="font-bold text-brand-700">پنل مدیریت سایت</h1>
          <button type="button" onClick={onLogout} className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500">
            خروج <FaSignOutAlt />
          </button>
        </div>
      </header>

      <div className="container-app py-8">
        <div className="mb-6 flex gap-2 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                tab === t.key ? "bg-brand-500 text-white" : "bg-white text-gray-600 ring-1 ring-black/5"
              }`}
            >
              <t.icon /> {t.label}
            </button>
          ))}
        </div>

        {tab === "orders" && <OrdersTab />}
        {tab === "catalog" && <CatalogTab />}
        {tab === "articles" && <ArticlesTab />}
        {tab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}

function Admin() {
  const [authed, setAuthed] = useState(Boolean(getToken()));

  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;
  return (
    <Dashboard
      onLogout={() => {
        setToken(null);
        setAuthed(false);
      }}
    />
  );
}

export default Admin;
