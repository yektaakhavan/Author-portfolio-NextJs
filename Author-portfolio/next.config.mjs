/**
 * Static export: the target host has no Node.js runtime (plain PHP/MySQL
 * shared hosting), so `next build` produces a folder of plain HTML/CSS/JS
 * files instead of relying on a Next.js server.
 */

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true, // "/about/index.html" — what a static Apache host serves for "/about"
  images: { unoptimized: true }, // no server means no on-demand image optimization endpoint
};

export default nextConfig;
