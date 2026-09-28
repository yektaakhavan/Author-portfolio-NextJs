"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const SHOW_AFTER_PX = 300;

/** Floating button that appears after scrolling down and jumps back to the top. */
export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="بازگشت به بالا"
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg transition-transform hover:-translate-y-1"
    >
      <FaArrowUp />
    </button>
  );
}
