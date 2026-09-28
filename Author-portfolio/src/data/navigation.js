import { FaBook, FaHome, FaInfoCircle, FaPen, FaUser } from "react-icons/fa";

/** Main navigation, shared by the navbar and the footer. */
export const NAV_ITEMS = [
  { href: "/", label: "صفحه اصلی", icon: FaHome },
  { href: "/about", label: "درباره ما", icon: FaUser },
  { href: "/books", label: "کتاب‌ها", icon: FaBook },
  { href: "/article", label: "نوشته‌هایی از دل کتاب", icon: FaPen },
  { href: "/contact", label: "ارتباط با ما", icon: FaInfoCircle },
];
