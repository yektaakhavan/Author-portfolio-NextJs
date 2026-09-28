import { Link } from "react-router-dom";
import { FaHome, FaUser, FaPen, FaBook, FaInfoCircle, FaInstagram, FaWhatsapp, FaTelegram } from "react-icons/fa";
import enemad from "../../assets/images/icons/enemad.webp";
import eitaaIcon from "../../assets/images/icons/eitaa.webp";
import { useSettings } from "../../hooks/useSettings";

const menuItems = [
  { icon: FaHome, label: "صفحه اصلی", path: "/" },
  { icon: FaUser, label: "درباره ما", path: "/about" },
  { icon: FaBook, label: "کتاب‌ها", path: "/books" },
  { icon: FaPen, label: "نوشته‌هایی از دل کتاب", path: "/article" },
  { icon: FaInfoCircle, label: "ارتباط با ما", path: "/contact" },
];

function Footer() {
  const settings = useSettings();

  const socialItems = [
    { icon: FaInstagram, label: "اینستاگرام", url: settings.social_instagram },
    { icon: FaWhatsapp, label: "واتساپ", url: settings.social_whatsapp },
    { icon: FaTelegram, label: "تلگرام", url: settings.social_telegram },
  ].filter((item) => item.url);

  return (
    <footer className="mt-16 bg-brand-500 text-white">
      <div className="container-app grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-lg font-bold text-gold-400">دسترسی سریع</h3>
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center gap-2 text-sm text-brand-100 transition-colors hover:text-gold-400"
                >
                  <item.icon aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-gold-400">شبکه‌های اجتماعی</h3>
          <div className="flex items-center gap-3">
            {socialItems.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg transition-colors hover:bg-gold-500 hover:text-brand-700"
              >
                <item.icon />
              </a>
            ))}
            {settings.social_eitaa && (
              <a
                href={settings.social_eitaa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ایتا"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold-500"
              >
                <img src={eitaaIcon} alt="" className="h-5 w-5 rounded-full" loading="lazy" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-gold-400">نماد اعتماد</h3>
          <img src={enemad} alt="نماد اعتماد الکترونیکی" className="h-20 w-20 rounded-lg bg-white p-1" loading="lazy" />
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-brand-100">
        © تمامی حقوق این وب‌سایت متعلق به تیم اخوان صفائی می‌باشد.
      </div>
    </footer>
  );
}

export default Footer;
