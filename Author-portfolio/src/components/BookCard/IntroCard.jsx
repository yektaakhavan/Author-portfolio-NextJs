import GradientButton from "../GradientButton/GradientButton";

/** Alternating image/text section used on the home page. */
function IntroCard({ title, paragraphs, meta, image, alt, buttonText, buttonLink, reverse = false }) {
  return (
    <section className="py-10">
      <h2 className="mb-8 text-center text-2xl font-bold text-brand-700">{title}</h2>
      <div className={`grid items-center gap-8 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="space-y-4 text-justify leading-8 text-gray-700">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          {meta && (
            <dl className="space-y-1 text-sm">
              {meta.map((m) => (
                <div key={m.label} className="flex gap-2">
                  <dt className="font-bold text-brand-700">{m.label}:</dt>
                  <dd className="text-gray-600">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {buttonText && buttonLink && (
            <div className="pt-2">
              <GradientButton to={buttonLink} text={buttonText} />
            </div>
          )}
        </div>
        <div data-aos="fade-left">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="mx-auto aspect-square w-full max-w-sm rounded-2xl object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default IntroCard;
