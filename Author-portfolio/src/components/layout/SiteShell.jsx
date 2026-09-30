import BackToTopButton from "@/components/layout/BackToTopButton";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { SettingsProvider } from "@/components/providers/SettingsProvider";
import defaultSettings from "@/data/defaultSettings";

/**
 * Public site chrome: navbar, footer and back-to-top button around the page
 * content. Starts from the hard-coded defaults (no server fetch — this
 * component is static-exported at build time, with no live backend to call
 * yet); SettingsProvider fetches the real values right after the page loads.
 */
export default function SiteShell({ children }) {
  return (
    <SettingsProvider initialSettings={defaultSettings}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTopButton />
      </div>
    </SettingsProvider>
  );
}
