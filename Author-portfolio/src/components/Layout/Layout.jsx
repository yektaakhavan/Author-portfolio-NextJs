import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import BackToTopButton from "../BackToTopButton/BackToTopButton";

const SITE_NAME = "علیرضا اخوان صفائی";

/**
 * Wraps every page with the navbar/footer/back-to-top and sets the
 * document title + meta description, so individual pages only need
 * to provide their own content.
 */
function Layout({ title, description, children, noTopPadding = false }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | نویسنده کتاب دیسیپلین کار`;

  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>{fullTitle}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>

      <Navbar />

      <main className={`flex-1 ${noTopPadding ? "" : "pt-16 md:pt-20"}`}>{children}</main>

      <Footer />
      <BackToTopButton />
    </div>
  );
}

export default Layout;
