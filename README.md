# 📖 Author Portfolio — The-Work-Discipline

An author portfolio and book store built with Next.js 16, featuring a public
storefront, a shopping cart, checkout, and a full admin dashboard — backed by
a custom PHP REST API and MySQL database, designed to run on plain shared
hosting with no Node.js server required in production.

[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![UI](https://img.shields.io/badge/UI-React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Backend](https://img.shields.io/badge/Backend-PHP%208-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![Database](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

---

## Overview

This project is the official site for author Alireza Akhavan Safaei and his
book *Discipline of Work* (دیسیپلین کار) — a RTL-first Persian site
combining an author portfolio, a blog of excerpts, and a small online store
for the book itself.

The project includes two main areas:

- **Public storefront** — home, about, articles, book page, cart, and
  checkout, all reading live data from the API.
- **Admin dashboard** — a single-page panel for managing articles, book
  price/stock, orders, and site-wide settings (contact info, social links),
  with no page reload required.

Unlike a static mockup, the frontend is a genuine **static export**: it
builds down to plain HTML/CSS/JS with zero Node.js dependency at runtime,
while still staying fully dynamic by fetching live content from the PHP API
in the browser. This was a deliberate architecture choice to fit a real
constraint — the target hosting environment is a plain shared cPanel account
with phpMyAdmin and no Node.js runtime available.

---

## Features

### Public Storefront

- Static shell with client-side live data — no stale content after admin
  edits, no rebuild required
- Responsive home, about, articles, article detail, book, cart, and checkout
  pages
- Persistent shopping cart (localStorage-backed, synced across tabs)
- Checkout with client-side validation and order submission
- RTL layout with a self-hosted variable Persian font (Vazir)
- Auto-rotating hero carousel with per-breakpoint art direction
- SEO essentials: sitemap, robots.txt, per-page metadata

### Admin Dashboard

- JWT-based login (custom, dependency-free token implementation)
- Article management (create, edit, delete) with an image gallery picker
- Book price & stock overrides, reflected on the storefront instantly
- Order list with status updates
- Site settings editor (contact info, social links)
- Every tab built as an independent client component, no full-page reloads

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Routing, static export build pipeline |
| React 19 | UI development |
| Tailwind CSS 4 | Styling and responsive UI |
| next/font (local) | Self-hosted Vazir variable font |
| AOS | Scroll animations |
| react-icons | Icons |

### Backend

| Technology | Purpose |
|---|---|
| PHP 8 | Backend runtime, zero Composer dependencies |
| MySQL | Relational database |
| Custom JWT (HMAC-SHA256) | Stateless admin authentication |
| bcrypt (`password_hash`) | Admin password hashing |
| Apache + `.htaccess` | Routing and static file serving |

---

## Project Structure

```text
Author-portfolio/              Next.js frontend (static export)
├── src/
│   ├── app/                   App Router pages & layouts
│   ├── components/
│   │   ├── admin/             Admin dashboard tabs
│   │   ├── articles/          Article cards, list, detail view
│   │   ├── books/              Book product page, purchase panel
│   │   ├── cart/ · checkout/
│   │   ├── layout/            Navbar, Footer, site shell
│   │   └── providers/         Settings context
│   ├── hooks/                 useCart, useApiData, useIsHydrated…
│   ├── lib/                   API client, formatting, config
│   └── data/                  Static content (nav, hero slides…)
│
backend/                        PHP API + MySQL schema
├── index.php                  Front controller / router
├── src/                        Auth, Database, Request, Response, Token
├── routes/                     articles · auth · books · orders · settings
├── bin/                        Password-hash & data-migration CLI scripts
└── schema.sql                  Database schema
```

---

## Key Implementation Details

### Static Export + Live Data

The frontend builds to static files (`output: "export"`), so there's no
Node.js process running in production. Pages that need current data (home,
articles, books, contact, cart, checkout, admin) fetch it from the PHP API
client-side through a small `useApiData` hook that tracks loading/success/
error state — so admin edits appear on the live site without a rebuild.

### Dependency-Free Admin Auth

Rather than pulling in a JWT library via Composer (often unavailable on
shared hosts), the backend implements a minimal HS256 token (`src/Token.php`)
by hand — issue, sign, and verify, with no external dependencies.

### Server-Side Price Integrity

Book prices and stock are stored and served from MySQL, not trusted from the
client. Admin edits to price/stock go through an authenticated endpoint and
are reflected everywhere immediately.

### Data Migration Path

A CLI script (`bin/migrate-json-to-mysql.php`) imports content from the
project's earlier JSON-file-based backend into MySQL — articles, orders,
overrides, and settings — without ever committing real customer data to the
repository.

---

## Getting Started

### Prerequisites

- Node.js (frontend)
- PHP 8+ and MySQL (backend) — e.g. via XAMPP for local development

### Backend setup

```bash
cd backend
cp .env.example .env          # fill in DB credentials, JWT secret
php bin/generate-password-hash.php "your-password"   # paste into .env
# import schema.sql into your MySQL database via phpMyAdmin
```

### Frontend setup

```bash
cd Author-portfolio
npm install
cp .env.example .env.local    # set NEXT_PUBLIC_API_URL
npm run dev
```

The app will be available at:

```text
http://localhost:3000
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the static export (output in `out/`) |
| `npm run lint` | Run ESLint |

---

## Deployment

Built for plain PHP shared hosting (e.g. cPanel): upload the static export
and the `backend/` folder under the same domain, with the backend at `/api`.
See the deployment notes in this repo's README history / docs for the two
easy-to-miss pitfalls — dotfiles not being copied, and the uploads folder
needing to stay inside `api/` rather than the site root.

---

## Roadmap

- [ ] Online payment gateway integration
- [ ] Direct image upload in the admin panel (currently gallery + URL)
- [ ] English translation of the storefront

<img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png" width="100%" alt="section divider" />

## 👨‍💻 Author

**Yekta Akhavan**

<p align="center">
  <a href="mailto:yekta.akhavan.dev@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-yekta.akhavan.dev%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0D1117" alt="Email" />
  </a>
  &nbsp;
  <a href="https://www.linkedin.com/in/yekta-akhavan/">
    <img src="https://img.shields.io/badge/LinkedIn-Yekta%20Akhavan-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0D1117" alt="LinkedIn" />
  </a>
  &nbsp;
  <a href="https://www.instagram.com/yektaakhavan.dev?igsi=d2Vya2RqazhqZ2Z2">
    <img src="https://img.shields.io/badge/Instagram-yekta--akhavan-E4405F?style=for-the-badge&logo=instagram&logoColor=white&labelColor=0D1117" alt="Instagram" />
  </a>
  &nbsp;
  <a href="https://yekta-akhavan.vercel.app/">
    <img src="https://img.shields.io/badge/Portfolio-yekta--akhavan.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=0D1117" alt="Portfolio" />
  </a>
</p>
