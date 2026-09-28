import AosProvider from "@/components/providers/AosProvider";
import { vazir } from "@/lib/fonts";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.png" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: SITE_NAME,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body>
        {children}
        <AosProvider />
      </body>
    </html>
  );
}
