import authorImage from "../assets/images/author.webp";
import bookImage from "../assets/images/book-cover.webp";

const homeIntro = [
  {
    id: "author",
    title: "درباره ما",
    paragraphs: [
      "علیرضا اخوان صفائی، کارآفرین در حوزه صنایع دستی و دارای تجربه‌های مدیریتی، آموزشی و تولیدی است.",
    ],
    meta: [
      { label: "تحصیلات", value: "کارشناسی مدیریت صنعتی" },
      { label: "تألیفات", value: "دیسیپلین کار — مهر ۱۴۰۳ — انتشارات کلید آموزش" },
    ],
    image: authorImage,
    alt: "علیرضا اخوان صفائی",
    buttonText: "بیوگرافی کامل",
    buttonLink: "/about",
  },
  {
    id: "book",
    title: "کتاب‌ها",
    paragraphs: [
      "کتاب دیسیپلین کار اهمیت انضباط را به‌عنوان یکی از اساسی‌ترین اصول برای دستیابی به موفقیت شغلی نشان می‌دهد. این کتاب با تأکید بر رفتار حرفه‌ای، اخلاق کاری، توجه به ظاهر، و ارتقای مداوم مهارت‌ها، نقش این عوامل را در افزایش بهره‌وری و کیفیت خدمات بررسی می‌کند.",
      "هدف این کتاب نشان دادن این است که چگونه رعایت دیسیپلین می‌تواند کار کردن را لذت‌بخش‌تر و مسیر موفقیت را هموارتر کند.",
    ],
    image: bookImage,
    alt: "کتاب دیسیپلین کار",
    buttonText: "مشاهده کتاب",
    buttonLink: "/books",
  },
];

export default homeIntro;
