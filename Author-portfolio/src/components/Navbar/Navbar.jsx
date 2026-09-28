import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaPen, FaBook, FaInfoCircle, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import logoImage from "../../assets/images/logo.webp";
import { useCart } from "../../context/CartContext";

const navItems = [
  { to: "/", label: "صفحه اصلی", icon: FaHome },
  { to: "/about", label: "درباره ما", icon: FaUser },
  { to: "/books", label: "کتاب‌ها", icon: FaBook },
  { to: "/article", label: "نوشته‌هایی از دل کتاب", icon: FaPen },
  { to: "/contact", label: "ارتباط با ما", icon: FaInfoCircle },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const solid = scrolled || !isHomePage || open;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-brand-500/10 text-brand-500"
        : solid
        ? "text-brand-700 hover:bg-brand-500/10 hover:text-brand-500"
        : "text-white hover:text-gold-400"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container-app flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2" aria-label="صفحه اصلی">
          <img
            src={logoImage}
            alt="لوگو اخوان صفائی"
            className={`transition-all duration-300 h-35 w-auto`}
          />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === "/"}>
              <item.icon className="text-base" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
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
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            className={`flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
              solid ? "text-brand-500" : "text-white"
            }`}
          >
            {open ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white shadow-lg transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="container-app flex flex-col gap-1 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                  isActive ? "bg-brand-500/10 text-brand-500" : "text-brand-700"
                }`
              }
            >
              <item.icon aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
