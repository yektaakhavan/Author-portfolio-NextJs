import Image from "next/image";
import GradientButton from "@/components/ui/GradientButton";

/** Alternating image/text section used on the home page. */
export default function IntroCard({ title, paragraphs, meta, image, alt, buttonText, buttonLink, reverse = false }) {
  return (
    <section className="py-10">
      <h2 className="mb-8 text-center text-2xl font-bold text-brand-700">{title}</h2>

      <div className={`grid items-center gap-8 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="space-y-4 text-justify leading-8 text-gray-700">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {meta && (
            <dl className="space-y-1 text-sm">
              {meta.map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <dt className="font-bold text-brand-700">{label}:</dt>
                  <dd className="text-gray-600">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {buttonText && buttonLink && (
            <div className="pt-2">
              <GradientButton href={buttonLink}>{buttonText}</GradientButton>
            </div>
          )}
        </div>

        <div data-aos="fade-left">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
            <Image src={image} alt={alt} fill sizes="(min-width: 768px) 384px, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
