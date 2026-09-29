# سایت علیرضا اخوان صفائی

فرانت‌اند با **Next.js 16 (App Router)**، React 19 و Tailwind CSS 4. بک‌اند یک سرور
Express جدا در پوشه‌ی `backend/` است و تغییری نکرده.

> این نسخه‌ی فرانت‌اند از React + Vite به Next.js مهاجرت داده شده. تاریخچه‌ی کامیت‌ها
> مراحل مهاجرت را قدم‌به‌قدم نشان می‌دهد.

## ساختار پروژه

```
Author-portfolio/   فرانت‌اند Next.js
backend/             API با Express (بدون تغییر)
```

## اجرا در محیط توسعه

بک‌اند:

```bash
cd backend
npm install
cp .env.example .env   # مقادیر واقعی JWT_SECRET و رمز ادمین را جایگزین کنید
npm run dev
```

فرانت‌اند:

```bash
cd Author-portfolio
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL را به آدرس بک‌اند بدهید
npm run dev
```

سایت روی `http://localhost:3000` بالا می‌آید. پنل مدیریت در `/admin` است.

## دیپلوی روی هاست

Next.js با App Router برای رندر سمت سرور به یک runtime جاوااسکریپت (Node.js) نیاز
دارد؛ یک هاست اشتراکی PHP معمولی به‌تنهایی کافی نیست. دو گزینه‌ی رایج:

1. **اگر cPanel شما گزینه‌ی «Setup Node.js App» (Node.js Selector) دارد:**
   می‌توانید همین پروژه را مستقیماً روی همان هاست اجرا کنید — `npm run build`
   و سپس `npm run start` را از طریق همان ابزار cPanel تنظیم کنید. بک‌اند Express
   هم به همین ترتیب (یا به‌صورت یک اپ Node جدا) روی همان هاست بالا می‌آید.
2. **اگر هاست فقط PHP دارد و Node.js Selector ندارد:** ساده‌ترین راه این است که
   خروجی فرانت‌اند را به‌صورت استاتیک بگیرید (`output: "export"` در
   `next.config.mjs`) و فایل‌های استاتیک را روی همان هاست PHP آپلود کنید؛ در این
   حالت صفحاتی که به‌صورت زنده از API می‌خوانند (کتاب‌ها، سبد خرید) باید کاملاً
   سمت کلاینت کار کنند، و بک‌اند Express باید جایی دیگر (یک سرویس Node، مثل
   Railway یا Render) میزبانی شود چون PHP نمی‌تواند آن را اجرا کند. اگر این مسیر
   را می‌خواهید، بگویید تا تنظیمات لازم را برایتان انجام بدهم.

## متغیرهای محیطی فرانت‌اند (`.env.local`)

| متغیر | توضیح |
|---|---|
| `NEXT_PUBLIC_API_URL` | آدرس API بک‌اند، با پسوند `/api` |
| `NEXT_PUBLIC_SITE_URL` | آدرس عمومی سایت، برای sitemap و canonical URLها |

## متغیرهای محیطی بک‌اند (`backend/.env`)

| متغیر | توضیح |
|---|---|
| `PORT` | پورت سرور Express |
| `JWT_SECRET` | کلید امضای توکن ادمین — حتماً یک مقدار طولانی و تصادفی بگذارید |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | اطلاعات ورود پنل مدیریت |
