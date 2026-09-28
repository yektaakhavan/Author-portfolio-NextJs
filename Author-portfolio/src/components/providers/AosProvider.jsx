"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/** Initialises scroll animations once; AOS watches the DOM for elements added later. */
export default function AosProvider() {
  useEffect(() => {
    AOS.init({ duration: 300, easing: "ease-out-cubic", once: true });
  }, []);

  return null;
}
