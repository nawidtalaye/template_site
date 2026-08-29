import Image from "next/image";

/**
 * Logos of businesses Novatech has worked with. The files are the ones already
 * shipped in `public/images/client`; no names are asserted here because the
 * repository does not record which company each mark belongs to, so every logo
 * is exposed as decorative and the section itself carries the accessible name.
 */
const clientLogos = [
  "/images/client/2.webp",
  "/images/client/4.webp",
  "/images/client/5.webp",
  "/images/client/6.webp",
  "/images/client/9a.webp",
  "/images/client/12.webp",
  "/images/client/13.webp",
  "/images/client/14.webp",
  "/images/client/15.webp",
  "/images/client/16.webp",
  "/images/client/17.webp",
  "/images/client/77.webp",
  "/images/client/200.webp",
  // The marks below arrived with spaces and parentheses in their filenames,
  // which the image optimiser double-escaped into 404s. They were renamed on
  // disk to plain `client-NN.webp`; keep new logos to that pattern.
  "/images/client/client-18.webp",
  "/images/client/client-19.webp",
  "/images/client/client-20.webp",
  "/images/client/client-21.webp",
  "/images/client/client-22.webp",
  "/images/client/client-23.webp",
  "/images/client/client-24.webp",
  "/images/client/client-25.webp",
];

export default function ClientLogosSlider() {
  return (
    <section
      className="pt-6 pb-16 mt-0 mb-8 lg:pt-8 lg:pb-20 lg:mb-12 bg-white overflow-hidden border-t border-gray-100"
      aria-labelledby="client-logos-title"
    >
      <div className="sm:mx-[130px] mx-[30px] px-auto">
        {/* Section Title */}
        <div className="flex flex-col gap-3 items-center mb-8">
          <h2 id="client-logos-title" className="flex text-[26px] md:text-3xl">
            <span className="heavy">مشتریان</span>{" "}
            <span className="light">ما</span>
          </h2>
          <Image
            src="/images/signature.jpg"
            alt=""
            aria-hidden="true"
            width={129}
            height={19}
            className="flex select-none"
          />
        </div>

        {/* Marquee Wrapper */}
        <div className="relative flex overflow-hidden w-full group py-4" dir="ltr">
          {/* Fading Edges for elegance */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <ul className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-8 md:gap-16 pr-8 md:pr-16 m-0 p-0 list-none">
            {/* The list is rendered twice so a -50% translate loops seamlessly. */}
            {[...clientLogos, ...clientLogos].map((src, idx) => (
              <li
                key={idx}
                className="flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-2xl hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] shadow-[0_2px_15px_rgb(0,0,0,0.03)] transition-all duration-500 border border-gray-50"
                style={{
                  width: "clamp(8rem, 12vw, 11rem)",
                  height: "clamp(8rem, 12vw, 11rem)",
                }}
                aria-hidden={idx >= clientLogos.length ? true : undefined}
              >
                <Image
                  src={src}
                  alt=""
                  width={176}
                  height={176}
                  sizes="176px"
                  loading="lazy"
                  className="max-h-full max-w-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)] transition-all duration-500"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
