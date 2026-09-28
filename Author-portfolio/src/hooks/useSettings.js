import { useEffect, useState } from "react";
import { api } from "../lib/api";

const defaults = {
  contact_phone: "09108083995",
  contact_email: "alireza.akhavan.safaei.00@gmail.com",
  support_note:
    "برای دریافت مشاوره درباره کتاب و پاسخ به سوالات خود، می‌توانید در ساعات ۸ تا ۲۰ با شماره فوق تماس بگیرید یا از طریق ایمیل با ما در ارتباط باشید.",
  social_instagram: "https://instagram.com/work_discipline_book",
  social_telegram: "https://t.me/Akhavan_safaei",
  social_whatsapp: "https://wa.me/989108083995",
  social_eitaa: "https://eitaa.com/Akhavan_safaei",
};

/** Site-wide editable text (contact info, notes) with safe defaults while loading. */
export function useSettings() {
  const [settings, setSettings] = useState(defaults);

  useEffect(() => {
    let cancelled = false;
    api
      .getSettings()
      .then((data) => !cancelled && setSettings((prev) => ({ ...prev, ...data })))
      .catch(() => {
        /* keep defaults if backend isn't reachable */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return settings;
}
