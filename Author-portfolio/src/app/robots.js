import { SITE_URL } from "@/lib/site";

// Required for output: "export" — this file is generated once at build time.
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/cart", "/checkout"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
