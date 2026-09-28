import { BsTelephoneFill, BsEnvelopeFill, BsWhatsapp, BsTelegram, BsInstagram, BsHeadset, BsCartFill } from "react-icons/bs";
import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/PageHeader/PageHeader";
import eitaaIcon from "../../assets/images/icons/eitaa.webp";
import { useSettings } from "../../hooks/useSettings";

function Contact() {
  const settings = useSettings();

  const orderLinks = [
    { icon: BsWhatsapp, label: "واتساپ", url: settings.social_whatsapp },
    { icon: BsTelegram, label: "تلگرام", url: settings.social_telegram },
    { icon: BsInstagram, label: "اینستاگرام", url: settings.social_instagram },
  ].filter((item) => item.url);

  return (
    <Layout title="راه‌های ارتباط با ما" description="راه‌های تماس، پشتیبانی و سفارش کتاب دیسیپلین کار.">
      <div className="container-app py-12">
        <PageHeader title="راه‌های ارتباط با ما" type="contact" />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/10 text-xl text-brand-500">
                <BsHeadset />
              </span>
              <h2 className="text-lg font-bold text-brand-700">پشتیبانی و مشاوره</h2>
            </div>
            <a href={`tel:${settings.contact_phone}`} dir="ltr" className="mb-2 flex items-center gap-2 text-sm text-gray-700 hover:text-brand-500">
              <BsTelephoneFill className="text-brand-500" /> {settings.contact_phone}
            </a>
            <a
              href={`mailto:${settings.contact_email}`}
              className="mb-4 flex items-center gap-2 text-sm text-gray-700 hover:text-brand-500"
            >
              <BsEnvelopeFill className="text-brand-500" /> {settings.contact_email}
            </a>
            <p className="text-sm text-gray-500">{settings.support_note}</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/10 text-xl text-brand-500">
                <BsCartFill />
              </span>
              <h2 className="text-lg font-bold text-brand-700">خرید کتاب</h2>
            </div>
            <p className="mb-4 text-sm text-gray-500">
              از طریق راه‌های ارتباطی زیر یا صفحه{" "}
              <a href="/books" className="font-bold text-brand-500 hover:underline">
                کتاب‌ها
              </a>{" "}
              می‌توانید سفارش خود را ثبت کنید:
            </p>
            <div className="space-y-3">
              {orderLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-brand-500/5 px-4 py-3 text-sm transition-colors hover:bg-brand-500/10"
                >
                  <item.icon className="text-lg text-brand-500" />
                  <span className="font-bold text-brand-700">{item.label}</span>
                </a>
              ))}
              {settings.social_eitaa && (
                <a
                  href={settings.social_eitaa}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-brand-500/5 px-4 py-3 text-sm transition-colors hover:bg-brand-500/10"
                >
                  <img src={eitaaIcon} alt="" className="h-5 w-5 rounded-full" loading="lazy" />
                  <span className="font-bold text-brand-700">ایتا</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
