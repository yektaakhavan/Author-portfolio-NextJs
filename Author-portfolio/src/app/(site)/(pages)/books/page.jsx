import BookProduct from "@/components/books/BookProduct";
import PageHeader from "@/components/ui/PageHeader";
import { getBooks, getSettings } from "@/lib/content";

export const metadata = {
  title: "کتاب‌ها",
  description: "خرید آنلاین کتاب دیسیپلین کار، اثر علیرضا اخوان صفائی.",
};

export default async function BooksPage() {
  const [books, settings] = await Promise.all([getBooks(), getSettings()]);

  return (
    <div className="container-app py-12">
      <PageHeader title="کتاب‌ها" type="books" />

      <div className="space-y-16">
        {books.map((book) => (
          <BookProduct key={book.id} book={book} phone={settings.contact_phone} />
        ))}
      </div>
    </div>
  );
}
