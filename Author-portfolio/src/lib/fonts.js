import localFont from "next/font/local";

/** Vazir (Persian) self-hosted font, exposed as the --font-vazir CSS variable. */
export const vazir = localFont({
  src: [
    { path: "../assets/fonts/Vazir.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/Vazir-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/Vazir-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-vazir",
  display: "swap",
});
