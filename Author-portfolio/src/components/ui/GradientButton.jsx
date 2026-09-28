import Link from "next/link";

/** Primary call-to-action pill link used across the site. */
export default function GradientButton({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-gradient-to-l from-brand-500 to-brand-400 px-8 py-3 text-sm font-bold text-white shadow-md shadow-brand-500/20 transition-transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
    >
      {children}
    </Link>
  );
}
