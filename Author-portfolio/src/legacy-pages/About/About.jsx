import { BsBriefcaseFill, BsAwardFill } from "react-icons/bs";
import Layout from "../../components/Layout/Layout";
import PageHeader from "../../components/PageHeader/PageHeader";
import authorImage from "../../assets/images/author.webp";

const experience = [
  "متخصص‌ارشد فنی ماشین‌آلات دوخت",
  "نماینده فروش برترین ماشین‌آلات دوخت",
  "محقق روش تدریس زبان‌های خارجی",
  "محقق خط تولید کارخانه‌های داروسازی",
  "موسس کانون علمی فرهنگی در دانشگاه",
  "موسس تولیدی صنایع‌دستی ترمه و ملیله‌دوزی",
  "موسس آموزشگاه چند رشته‌ای صنایع دستی",
  "رئیس هیئت‌مدیره مجتمع نقش‌جهان اصفهان",
  "فروش و تولید بهترین کالاهای خواب",
  "نویسنده کتاب دیسیپلین‌کار",
];

function About() {
  return (
    <Layout
      title="درباره ما"
      description="بیوگرافی علیرضا اخوان صفائی، نویسنده کتاب دیسیپلین کار و کارآفرین در حوزه صنایع دستی."
    >
      <div className="container-app py-12">
        <PageHeader title="درباره ما" type="about" />

        <div className="grid gap-8 rounded-2xl bg-brand-500/5 p-6 md:grid-cols-[280px_1fr] md:items-center md:p-10">
          <img
            src={authorImage}
            alt="علیرضا اخوان صفائی"
            className="mx-auto aspect-square w-48 rounded-2xl object-cover shadow-lg md:w-full"
            data-aos="fade-left"
          />
          <div>
            <h2 className="mb-3 text-xl font-bold text-brand-700">معرفی</h2>
            <p className="text-justify leading-8 text-gray-700">
              <b className="text-brand-700">علیرضا اخوان صفائی</b> متولد ۱۳۴۹ هجری‌شمسی (۱۹۷۰ میلادی)، در اصفهان
              می‌باشد و دانش‌آموخته رشته مدیریت صنعتی است. مروری بر فعالیت‌های شغلی و فرهنگی وی حکایت از آن دارد که
              دارای تجربه‌های فنی، مدیریتی، آموزشی و تولیدی در حوزه‌های مختلف است و نویسندگی کتاب «دیسیپلین کار»
              حاصل سال‌ها تجربه‌ی عملی ایشان در محیط‌های کاری است.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/10 text-xl text-brand-500">
                <BsBriefcaseFill aria-hidden="true" />
              </span>
              <h2 className="text-lg font-bold text-brand-700">سوابق حرفه‌ای</h2>
            </div>
            <ul className="space-y-2.5">
              {experience.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/10 text-xl text-brand-500">
                  <BsAwardFill aria-hidden="true" />
                </span>
                <h2 className="text-lg font-bold text-brand-700">دستاوردها</h2>
              </div>
              <p className="text-justify leading-8 text-gray-700">
                تیم ما با تلاش مستمر توانسته است همواره محصولات و خدماتی باکیفیت ارائه کند که رضایت و همراهی
                مشتریان گران‌قدر را در پی داشته است؛ برند شناخته‌شده صفائی که بیش از ۷۵ سال سابقه دارد و برند
                صفاهوم و سایت{" "}
                <a
                  href="https://safahome.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-brand-500 hover:underline"
                >
                  safahome.com
                </a>{" "}
                را به خود اختصاص داده‌است.
              </p>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-brand-500 to-brand-400 p-6 text-center text-white md:p-8">
              <p className="text-sm">نویسنده کتاب</p>
              <p className="text-xl font-bold">دیسیپلین کار</p>
              <a
                href="/books"
                className="mt-2 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-bold text-brand-500 transition-transform hover:-translate-y-0.5"
              >
                مشاهده کتاب
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
