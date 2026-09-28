import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";
import eitaaIcon from "@/assets/images/icons/eitaa.webp";
import enemad from "@/assets/images/icons/enemad.webp";
import { NAV_ITEMS } from "@/data/navigation";
import { getSettings } from "@/lib/content";

const SOCIAL_LINK_CLASS =
  "flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-gold-500";

export default async function Footer() {
  const settings = await getSettings();

  const socialLinks = [
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
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 text-sm text-brand-100 transition-colors hover:text-gold-400"
                >
                  <Icon aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-gold-400">شبکه‌های اجتماعی</h3>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`${SOCIAL_LINK_CLASS} text-lg hover:text-brand-700`}
              >
                <Icon />
              </a>
            ))}
            {settings.social_eitaa && (
              <a
                href={settings.social_eitaa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ایتا"
                className={SOCIAL_LINK_CLASS}
              >
                <Image src={eitaaIcon} alt="" className="h-5 w-5 rounded-full" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-gold-400">نماد اعتماد</h3>
          <Image src={enemad} alt="نماد اعتماد الکترونیکی" className="h-20 w-20 rounded-lg bg-white p-1" />
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-brand-100">
        © تمامی حقوق این وب‌سایت متعلق به تیم اخوان صفائی می‌باشد.
      </div>
    </footer>
  );
}
