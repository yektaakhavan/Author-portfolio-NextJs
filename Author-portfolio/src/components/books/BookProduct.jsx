import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import BookSectionNav from "@/components/books/BookSectionNav";
import PurchasePanel from "@/components/books/PurchasePanel";

function SectionCard({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h2 className="mb-4 text-lg font-bold text-brand-700">{title}</h2>
      {children}
    </section>
  );
}

/** Full product page for one book: purchase panel, specs, table of contents and description. */
export default function BookProduct({ book, phone }) {
  const sectionId = (name) => `${book.id}-${name}`;

  const sections = [
    { id: sectionId("specs"), label: "مشخصات کتاب" },
    { id: sectionId("toc"), label: "فهرست کتاب" },
    { id: sectionId("intro"), label: "معرفی کتاب" },
  ];

  const summary = [
    { label: "نویسنده", value: book.author },
    { label: "دسته‌بندی", value: book.category },
    { label: "ناشر", value: book.publisher },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="order-2 lg:order-1">
        <BookSectionNav sections={sections} />
      </aside>

      <div className="order-1 space-y-8 lg:order-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-xl shadow-lg">
              <Image
                src={book.image}
                alt={book.title}
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                loading="eager"
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-brand-700">{book.title}</h1>
              <p className="mt-1 text-gray-500">{book.subtitle}</p>

              <dl className="mt-4 space-y-1 text-sm">
                {summary.map(({ label, value }) => (
                  <div key={label} className="flex gap-2">
                    <dt className="font-bold text-brand-700">{label}:</dt>
                    <dd className="text-gray-600">{value}</dd>
                  </div>
                ))}
              </dl>

              <PurchasePanel book={book} phone={phone} />
            </div>
          </div>
        </div>

        <SectionCard id={sectionId("specs")} title="مشخصات فنی">
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {book.specs.map(({ label, value }) => (
              <div key={label} className="rounded-lg bg-brand-500/5 px-3 py-2 text-sm">
                <dt className="text-gray-500">{label}</dt>
                <dd className="font-bold text-brand-700">{value}</dd>
              </div>
            ))}
          </dl>
        </SectionCard>

        <SectionCard id={sectionId("toc")} title="فهرست مطالب">
          <ul className="space-y-3">
            {book.tableOfContents.map(({ title, children }) => (
              <li key={title}>
                <span className="font-bold text-brand-700">{title}</span>
                {children && (
                  <ul className="mt-1 mr-5 list-inside list-disc space-y-1 text-sm text-gray-600">
                    {children.map((child) => (
                      <li key={child}>{child}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard id={sectionId("intro")} title="معرفی کتاب">
          <div className="space-y-3 text-justify leading-8 text-gray-700">
            {book.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="mt-5 mb-2 font-bold text-brand-700">ویژگی‌های کلیدی کتاب:</h3>
          <ul className="space-y-2">
            {book.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                <FaCheckCircle className="text-brand-500" />
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
