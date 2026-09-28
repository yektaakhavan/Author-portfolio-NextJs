"use client";

import { useEffect, useState } from "react";
import { getImageProps } from "next/image";
import { HERO_SLIDES } from "@/data/heroSlides";

const SLIDE_INTERVAL_MS = 5000;
const MOBILE_MEDIA_QUERY = "(max-width: 768px)";

/** One banner with art direction: the mobile crop is served below 768px. */
function HeroSlide({ slide, active, first }) {
  const common = { alt: slide.alt, fill: true, sizes: "100vw", fetchPriority: first ? "high" : "low" };
  const { props: mobile } = getImageProps({ ...common, src: slide.mobile });
  const { props: desktop } = getImageProps({ ...common, src: slide.desktop, loading: first ? "eager" : "lazy" });

  return (
    <div className={`absolute inset-0 transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"}`}>
      <picture>
        <source media={MOBILE_MEDIA_QUERY} srcSet={mobile.srcSet} />
        <img {...desktop} alt={slide.alt} className="object-cover" />
      </picture>
    </div>
  );
}

/** Lightweight, dependency-free auto-advancing hero carousel. */
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % HERO_SLIDES.length), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[21/9]">
      {HERO_SLIDES.map((slide, i) => (
        <HeroSlide key={slide.alt} slide={slide} active={i === index} first={i === 0} />
      ))}

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.alt}
            type="button"
            aria-label={`اسلاید ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
