# سایت علیرضا اخوان صفائی

فرانت‌اند **Next.js 16** (به‌صورت static export — فقط HTML/CSS/JS خام،
بدون نیاز به Node.js روی سرور) + بک‌اند **PHP + MySQL** که برای هاست
اشتراکی معمولی (cPanel با phpMyAdmin) نوشته شده است.

> نسخه‌ی قبلی این پروژه React+Vite با بک‌اند Node/Express بود. چون هاست
> شما فقط PHP/MySQL دارد (بدون Node.js Selector)، هم فرانت‌اند و هم
> بک‌اند بازنویسی شدند. تاریخچه‌ی کامیت‌های گیت مراحل این کار را نشان
> می‌دهد.

## ساختار پروژه

```
Author-portfolio/   فرانت‌اند Next.js (static export)
backend/             API با PHP + کوئری‌های خام MySQL
```

## راه‌اندازی بک‌اند (PHP + MySQL)

۱. یک دیتابیس MySQL در cPanel بسازید (از بخش «MySQL Databases»؛ یک
   کاربر هم به آن دیتابیس متصل کنید و دسترسی کامل بدهید).

۲. اسکیما را وارد کنید: در phpMyAdmin، دیتابیس‌تان را باز کنید → تب
   **Import** → فایل `backend/schema.sql` را انتخاب کنید → Go.
   (این فایل فقط ساختار جدول‌ها و یک ردیف پیش‌فرض برای تنظیمات سایت را
   می‌سازد؛ هیچ داده‌ی واقعی مشتری در آن نیست.)

۳. فایل `backend/.env.example` را کپی کنید به `backend/.env` و مقادیر
   را پر کنید:

   ```
   DB_HOST=localhost
   DB_NAME=<نام دیتابیس شما>
   DB_USER=<کاربر دیتابیس>
   DB_PASS=<رمز دیتابیس>
   JWT_SECRET=<یک رشته‌ی تصادفی طولانی>
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD_HASH=<مرحله‌ی بعد>
   ```

۴. رمز ورود پنل مدیریت را بسازید (این مقدار هش‌شده در `.env` ذخیره
   می‌شود، نه رمز خام):
   - اگر به SSH/Terminal دسترسی دارید: `php bin/generate-password-hash.php "رمز-دلخواه"`
   - اگر ندارید: فایل `backend/bin/generate-password-hash.php` را
     موقتاً آپلود کنید و در مرورگر باز کنید:
     `https://yourdomain.com/api/bin/generate-password-hash.php?password=رمز-دلخواه`
     خروجی را کپی کنید، سپس **این فایل را حتماً پاک کنید** (نگه داشتنش
     روی سرور یعنی هر کسی می‌تواند هش رمز بسازد).

۵. **اگر داده‌ی واقعی قبلی دارید** (مقالات، سفارش‌ها، تنظیمات ذخیره‌شده
   در نسخه‌ی قبلی با `backend/data/db.json`)، یک‌بار این را اجرا کنید
   تا به MySQL منتقل شود:
   ```
   php bin/migrate-json-to-mysql.php /path/to/db.json
   ```

## راه‌اندازی فرانت‌اند (Next.js)

```bash
cd Author-portfolio
npm install
cp .env.example .env.local
```

در `.env.local`:
```
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

```bash
npm run build
```

خروجی در پوشه‌ی `Author-portfolio/out/` ساخته می‌شود — این همان چیزی
است که آپلود می‌کنید.

برای توسعه‌ی محلی: `npm run dev` (روی `localhost:3000`، به بک‌اند PHP
محلی‌تان با `NEXT_PUBLIC_API_URL=http://localhost:8080/api` وصل شوید).

## آپلود روی cPanel — نکته‌ی مهم درباره‌ی ساختار پوشه‌ها

هر دو بخش را زیر یک دامنه/ساب‌دامین، در **یک** `public_html` آپلود
کنید:

```
public_html/
├── (همه‌ی محتوای پوشه‌ی Author-portfolio/out/)   ← فرانت‌اند استاتیک
└── api/
    └── (همه‌ی محتوای پوشه‌ی backend/، شامل uploads/)
```

نکات حیاتی:
- **کل پوشه‌ی `backend/` — شامل فایل‌های نقطه‌دار مثل `.htaccess` و
  `.env`** — باید داخل `public_html/api/` برود. خیلی از کلاینت‌های FTP
  و دستور `cp -r dir/*` فایل‌های نقطه‌دار را جا می‌اندازند؛ حتماً چک
  کنید `.htaccess` و `.env` واقعاً آپلود شده‌اند، وگرنه API کار
  نمی‌کند.
- پوشه‌ی `backend/uploads/` باید **داخل همان `api/`** بماند (یعنی در
  `public_html/api/uploads/`)، نه در ریشه‌ی سایت — فرانت‌اند آدرس
  تصاویر را نسبت به همین مسیر می‌سازد.
- در ریشه‌ی `public_html` یک `.htaccess` با این محتوا بگذارید تا صفحه‌ی
  ۴۰۴ سفارشی کار کند:
  ```
  ErrorDocument 404 /404.html
  ```

بعد از آپلود، این آدرس‌ها را چک کنید:
- `https://yourdomain.com/api/health` باید `{"ok":true}` برگرداند
- `https://yourdomain.com/` باید سایت را نشان بدهد
- `https://yourdomain.com/admin/` باید صفحه‌ی ورود پنل مدیریت را نشان بدهد

## محدودیت‌های static export (نسبت به نسخه‌ی قبلی)

- آدرس مقالات از `/article/5` به `/article/view?id=5` تغییر کرد (چون
  هاست استاتیک نمی‌تواند صفحه‌ای برای مقاله‌ای که *بعداً* ساخته
  می‌شود از قبل بسازد).
- عنوان و توضیح هر مقاله برای موتورهای جستجو دیگر اختصاصی نیست (چون
  رندر HTML اولیه دیگر سمت سرور نیست)؛ صفحه‌ی لیست مقالات همچنان به
  همه‌ی آن‌ها لینک می‌دهد و قابل ایندکس است.
- همه‌ی صفحات دیگر (خانه، کتاب‌ها، تماس با ما) محتوای زنده را بعد از
  بارگذاری اولیه از API می‌گیرند — یعنی تغییرات پنل مدیریت بدون نیاز
  به build مجدد دیده می‌شوند، اما یک لحظه‌ی کوتاه لودینگ دارند.

## متغیرهای محیطی فرانت‌اند (`.env.local`)

| متغیر | توضیح |
|---|---|
| `NEXT_PUBLIC_API_URL` | معمولاً `/api` (هم‌دامنه، بدون نیاز به CORS) |
| `NEXT_PUBLIC_SITE_URL` | آدرس عمومی سایت، برای sitemap و canonical URLها |

## متغیرهای محیطی بک‌اند (`backend/.env`)

| متغیر | توضیح |
|---|---|
| `DB_HOST` / `DB_NAME` / `DB_USER` / `DB_PASS` | اطلاعات اتصال به MySQL |
| `JWT_SECRET` | کلید امضای توکن ادمین — یک مقدار طولانی و تصادفی |
| `ADMIN_USERNAME` | نام کاربری ورود پنل مدیریت |
| `ADMIN_PASSWORD_HASH` | هش bcrypt رمز عبور (با `bin/generate-password-hash.php` بسازید) |
| `ALLOWED_ORIGIN` | معمولاً `*` کافی است (چون از توکن استفاده می‌شود، نه کوکی) |
