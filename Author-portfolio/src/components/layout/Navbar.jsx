"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import logo from "@/assets/images/logo.webp";
import { NAV_ITEMS } from "@/data/navigation";
import { useCart } from "@/hooks/useCart";

const SCROLL_THRESHOLD = 50;

const isActivePath = (pathname, href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The home page shows a transparent bar over the hero until the user scrolls.
  const solid = scrolled || menuOpen || pathname !== "/";

  const desktopLinkClass = (active) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? "bg-brand-500/10 text-brand-500"
        : solid
          ? "text-brand-700 hover:bg-brand-500/10 hover:text-brand-500"
          : "text-white hover:text-gold-400"
    }`;

  const mobileLinkClass = (active) =>
    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
      active ? "bg-brand-500/10 text-brand-500" : "text-brand-700"
    }`;

  const iconButtonTone = solid ? "text-brand-500" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container-app flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2" aria-label="صفحه اصلی">
          <Image src={logo} alt="لوگو اخوان صفائی" className="h-35 w-auto" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={desktopLinkClass(isActivePath(pathname, href))}>
              <Icon className="text-base" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label="سبد خرید"
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              solid ? "text-brand-500 hover:bg-brand-500/10" : "text-white hover:text-gold-400"
            }`}
          >
            <FaShoppingCart className="text-lg" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -left-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={menuOpen}
            className={`flex h-10 w-10 items-center justify-center rounded-full md:hidden ${iconButtonTone}`}
          >
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden bg-white shadow-lg transition-[max-height] duration-300 md:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container-app flex flex-col gap-1 py-3">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={mobileLinkClass(isActivePath(pathname, href))}
            >
              <Icon aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
