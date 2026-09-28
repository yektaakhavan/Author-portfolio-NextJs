"use client";

/** Sticky sidebar that smooth-scrolls to a section of the book page. */
export default function BookSectionNav({ sections }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="sticky top-24 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h2 className="mb-3 text-sm font-bold text-brand-700">فهرست مطالب</h2>
      <ul className="space-y-2 text-sm">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => scrollTo(id)}
              className="text-gray-600 transition-colors hover:text-brand-500"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
