import BackToTopButton from "@/components/layout/BackToTopButton";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import { getSettings } from "@/lib/content";

/** Public site chrome: navbar, footer and back-to-top button around the page content. */
export default async function SiteShell({ children }) {
  const settings = await getSettings();

  return (
    <SettingsProvider initialSettings={settings}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTopButton />
      </div>
    </SettingsProvider>
  );
}
