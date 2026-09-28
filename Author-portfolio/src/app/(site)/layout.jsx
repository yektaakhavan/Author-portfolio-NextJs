import BackToTopButton from "@/components/layout/BackToTopButton";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

/** Public site chrome: navbar, footer and back-to-top button around every page. */
export default function SiteLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
