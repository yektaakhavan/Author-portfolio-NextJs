"use client";

import BookProduct from "@/components/books/BookProduct";
import PageHeader from "@/components/ui/PageHeader";
import { useSettings } from "@/components/providers/SettingsProvider";
import { useApiData } from "@/hooks/useApiData";
import { api } from "@/lib/api";
import { applyBookOverrides } from "@/lib/books";

// Never cached: price/stock must always be current, straight from the admin panel.
const fetchBooks = () => api.getBookOverrides().then(applyBookOverrides);

export default function BooksContent() {
  const settings = useSettings();
  const { status, data: books } = useApiData(fetchBooks);

  if (status === "loading") return <div className="min-h-[60vh]" />;

  // On failure, fall back to the static catalog (no live price/stock) rather than a blank page.
  const catalog = status === "success" ? books : applyBookOverrides({});

  return (
    <div className="container-app py-12">
      <PageHeader title="کتاب‌ها" type="books" />

      <div className="space-y-16">
        {catalog.map((book) => (
          <BookProduct key={book.id} book={book} phone={settings.contact_phone} />
        ))}
      </div>
    </div>
  );
}
