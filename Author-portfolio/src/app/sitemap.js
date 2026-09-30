import { SITE_URL } from "@/lib/site";

// Required for output: "export" — this file is generated once at build time.
export const dynamic = "force-static";

// Static paths only: individual article pages use a client-fetched ?id=,
// so there's no fixed list of them at build time. They're still crawlable
// through the /article listing page, which links to every one.
const PATHS = ["", "/about", "/books", "/article", "/contact"];

export default function sitemap() {
  const now = new Date();
  return PATHS.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: now }));
}
