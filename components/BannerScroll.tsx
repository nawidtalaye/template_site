"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";

import styles from "./BannerScroll.module.css";

/**
 * The three brand banners, shown as a pinned scroll story: they start stacked
 * on top of each other in the middle of the screen and fan out into a row as
 * the reader scrolls through the section.
 *
 * The geometry is measured, never hard-coded — the stack offset for each card
 * is the distance between its own centre and the stage centre at the current
 * layout, so the effect survives any breakpoint or font change.
 *
 * Below 1024px there is no pin and no room for a row, so the same cards play a
 * per-card reveal instead: see `renderFlow`.
 */
const banners = [
  {
    href: "/software-solutions",
    kicker: "سیستم های سازمانی",
    title: "راهکارهای مدرن مدیریت و دیتابیس",
    description:
      "حسابداری، انبار، فروش، اسناد و گزارش مدیریتی روی یک ساختار داده واحد.",
    image: "/images/banner.webp",
    alt: "بنر راهکارهای مدرن مدیریت و دیتابیس نواتیک برای شرکت ها و سازمان ها",
    width: 1122,
    height: 1402,
    /** Rotation the card carries while it is still on the stack. */
    tilt: -7,
  },
  {
    href: "/graphic-design",
    kicker: "هویت بصری",
    title: "طراحی لوگو و برندینگ",
    description:
      "لوگو، رنگ سازمانی و ست اداری که برند شما را یکدست و حرفه ای نشان می دهد.",
    image: "/images/banner2.webp",
    alt: "بنر طراحی لوگو و هویت بصری نواتیک",
    width: 1254,
    height: 1254,
    tilt: 3,
  },
  {
    href: "/web-design",
    kicker: "حضور دیجیتال",
    title: "شما روی کسب و کار، ما روی رشد برند",
    description:
      "وب سایت، محتوا و ابزارهای دیجیتالی که کسب و کار شما را در دسترس مشتری می گذارد.",
    image: "/images/banner3.webp",
    alt: "بنر خدمات دیجیتال نواتیک با شعار رشد برند شما",
    width: 1122,
    height: 1402,
    tilt: 9,
  },
] as const;

/** Cubic ease-out: fast at the start, settles instead of stopping. */
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export default function BannerScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pinnedQuery = window.matchMedia("(min-width: 1024px)");

    let frame = 0;
    let visible = false;
    /** Stack offset per card, measured once per layout. */
    let offsets: number[] = [];

    const clearTransforms = () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.transform = "";
        card.style.opacity = "";
        card.style.zIndex = "";
      });
    };

    const measure = () => {
      const stageCentre = stage.offsetWidth / 2;
      offsets = cardRefs.current.map((card) =>
        card ? stageCentre - (card.offsetLeft + card.offsetWidth / 2) : 0,
      );
    };

    /**
     * Phone and tablet: no pin, so the fan-out has nothing to play against.
     * Each card is scrubbed against its own entry into the viewport instead —
     * it rises, straightens out of the tilt it carries on the desktop stack,
     * and settles. Scrubbed rather than triggered, so it stays tied to the
     * finger the whole way up.
     */
    const renderFlow = () => {
      const viewportHeight = window.innerHeight;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        // Starts when the card's top edge crosses the last tenth of the
        // screen, finishes half a screen later.
        const local = ease(
          clamp01((viewportHeight * 0.9 - rect.top) / (viewportHeight * 0.5)),
        );
        const tilt = banners[index].tilt * (1 - local) * 0.6;
        const lift = (1 - local) * 42;
        const scale = 0.92 + local * 0.08;

        card.style.transform = `translate3d(0, ${lift.toFixed(2)}px, 0) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        card.style.opacity = (0.15 + local * 0.85).toFixed(3);
        card.style.zIndex = "";
      });
    };

    const render = () => {
      frame = 0;
      if (motionQuery.matches) {
        clearTransforms();
        return;
      }
      if (!pinnedQuery.matches) {
        renderFlow();
        return;
      }

      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 1;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        // Each card leaves the stack a beat after the one before it, so the
        // fan reads as a deal of cards rather than one simultaneous jump.
        const local = ease(clamp01((progress - index * 0.1) / 0.62));
        const offset = offsets[index] ?? 0;
        const tilt = banners[index].tilt * (1 - local);
        const lift = (1 - local) * 46;
        const scale = 0.84 + local * 0.16;

        card.style.transform = `translate3d(${offset * (1 - local)}px, ${lift}px, 0) rotate(${tilt}deg) scale(${scale})`;
        card.style.opacity = String(0.35 + local * 0.65);
        // While stacked, the last card has to sit on top; once fanned out the
        // natural order is restored so the middle card can overlap cleanly.
        card.style.zIndex = String(local < 0.5 ? index : banners.length - index);
      });
    };

    const request = () => {
      if (frame || !visible) return;
      frame = window.requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) request();
      },
      { rootMargin: "20% 0px" },
    );
    observer.observe(track);

    const onResize = () => {
      measure();
      request();
    };

    // The cards are sized by their artwork, which arrives lazily: until an
    // image has laid out, every card measures zero and the stack offsets would
    // all be wrong. Re-measure whenever a card's own box changes.
    const resizeObserver = new ResizeObserver(onResize);
    cardRefs.current.forEach((card) => {
      if (card) resizeObserver.observe(card);
    });

    measure();
    render();

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", onResize);
    motionQuery.addEventListener("change", render);
    pinnedQuery.addEventListener("change", onResize);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", onResize);
      motionQuery.removeEventListener("change", render);
      pinnedQuery.removeEventListener("change", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="brand-banners-title">
      <div ref={trackRef} className={styles.track}>
        <div className={styles.sticky}>
          <header className={styles.heading}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowMark} aria-hidden="true" />
              نواتیک / کاری که برای برند شما می کنیم
            </p>
            <h2 id="brand-banners-title" className={styles.title}>
              <span className="heavy">سه مسیر</span>{" "}
              <span className="light">برای رشد کسب و کار شما</span>
            </h2>
          </header>

          <div ref={stageRef} className={styles.stage}>
            {banners.map((banner, index) => (
              <Link
                key={banner.href}
                href={banner.href}
                className={styles.card}
                // The pinned layout sizes the card from the banner's own shape.
                style={
                  { "--ratio": banner.width / banner.height } as CSSProperties
                }
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
              >
                <span className={styles.frame}>
                  <Image
                    src={banner.image}
                    alt={banner.alt}
                    width={banner.width}
                    height={banner.height}
                    sizes="(max-width: 1023px) 88vw, 30vw"
                    className={styles.artwork}
                    loading="lazy"
                  />
                </span>

                <span className={styles.meta}>
                  <span className={styles.kicker}>{banner.kicker}</span>
                  <span className={`${styles.cardTitle} heavy`}>
                    {banner.title}
                  </span>
                  <span className={styles.description}>
                    {banner.description}
                  </span>
                  <span className={styles.action} aria-hidden="true">
                    مشاهده خدمت
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
