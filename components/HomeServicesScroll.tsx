"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import styles from "./HomeServicesScroll.module.css";

const services = [
  {
    href: "/web-design",
    title: "طراحی سایت و وب اپلیکیشن",
    description:
      "سایت فروشگاهی، شرکتی و خدماتی که به فرایندها و داده های واقعی کسب و کار وصل باشد",
    image: "/images/web.webp",
    alt: "نمایی از یک وب سایت طراحی شده توسط نواتیک",
  },
  {
    href: "/database-solutions",
    title: "طراحی و توسعه دیتابس",
    description:
      "مدل سازی داده، انتقال اطلاعات از اکسل و ساختاری که گزارش های شما را قابل اعتماد می کند",
    image: "/images/database.webp",
    alt: "داشبورد گزارش ساخته شده روی دیتابس طراحی شده توسط نواتیک",
  },
  {
    href: "/graphic-design",
    title: "طراحی گرافیک",
    description:
      "لوگو، هویت بصری و طرح های تبلیغاتی که برند شما را حرفه ای و یکدست نشان می دهد",
    image: "/images/graphic.webp",
    alt: "نمونه طراحی گرافیک و هویت بصری توسط نواتیک",
  },
] as const;

const persianNumbers = ["۰۱", "۰۲", "۰۳"] as const;
const persianProgress = ["۱ / ۳", "۲ / ۳", "۳ / ۳"] as const;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
/** Cubic ease-out: the incoming card arrives quickly and settles. */
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Services deck.
 *
 * One card is on screen at a time. The section is pinned while its scroll
 * length plays out, and the cards live in one clipped box: the next card
 * slides up over the current one, fully opaque the whole way, and the covered
 * one only recedes behind it — so a second card is never showing through.
 */
export default function HomeServicesScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = false;

    const clearCards = () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.transform = "";
        card.style.pointerEvents = "";
        card.style.setProperty("--service-image-scale", "1");
      });
    };

    const render = () => {
      frame = 0;

      if (motionQuery.matches) {
        clearCards();
        return;
      }

      const scrollable = track.offsetHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? clamp01(-track.getBoundingClientRect().top / scrollable)
          : 0;

      // Position along the deck, in cards. The last card holds the final
      // stretch of the track so it is not flicked away at the end.
      const position = progress * services.length;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const distance = position - index;
        let offset = 0;
        let scale = 1;

        if (distance <= -1) {
          // Parked below the stage, clipped away by its overflow.
          offset = 104;
        } else if (distance < 0) {
          // Sliding up over the card being read. It stays fully opaque the
          // whole way: a cross-fade would let two cards show through at once.
          offset = 104 * (1 - ease(distance + 1));
        } else {
          // Covered. It only recedes, so the card on top reads as nearer.
          const t = ease(Math.min(1, distance));
          scale = 1 - t * 0.05;
        }

        card.style.transform = `translate3d(0, ${offset.toFixed(2)}%, 0) scale(${scale.toFixed(4)})`;
        card.style.pointerEvents = distance >= 0 && distance < 1 ? "auto" : "none";
        // Slow push-in on the artwork of the card that is being read.
        const zoom =
          distance > -1 && distance < 1
            ? 1 + clamp01(distance + 1) * 0.06
            : 1;
        card.style.setProperty("--service-image-scale", zoom.toFixed(4));
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
      { rootMargin: "25% 0px" },
    );
    observer.observe(track);

    render();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    motionQuery.addEventListener("change", render);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      motionQuery.removeEventListener("change", render);
      if (frame) window.cancelAnimationFrame(frame);
      clearCards();
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="home-services-title">
      <div ref={trackRef} className={styles.track}>
        <div className={styles.sticky}>
          <div className={styles.heading}>
            <h2 id="home-services-title" className={styles.title}>
              <span className="heavy">خدمات</span> <span className="light">ما</span>
            </h2>
            <Image
              alt=""
              aria-hidden="true"
              width={129}
              height={19}
              className={styles.signature}
              src="/images/signature.jpg"
            />
            <p className={styles.intro}>
              هر خدمت برای یک نیاز مشخص کسب و کار ساخته شده است؛ از وب سایت و
              دیتابس تا هویت بصری برند.
            </p>
          </div>

          <div className={styles.stage}>
            {services.map((service, index) => (
              <article
                key={service.href}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className={`${styles.card} ${styles[`card${index + 1}`]}`}
                style={{ zIndex: index + 1 }}
              >
                <div className={styles.visual}>
                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={1758}
                    height={1324}
                    sizes="(min-width: 1024px) 56vw, 92vw"
                    className={styles.artwork}
                  />
                  <span className={styles.visualEdge} aria-hidden="true" />
                </div>

                <div className={styles.content}>
                  <p className={styles.indexRow} aria-hidden="true">
                    <span className={styles.index}>{persianNumbers[index]}</span>
                    <span className={styles.progress}>
                      {persianProgress[index]}
                    </span>
                  </p>
                  <p className={styles.eyebrow}>راهکارهای نواتیک</p>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.description}>{service.description}</p>
                  <Link className={styles.action} href={service.href}>
                    <span>مشاهده خدمت</span>
                    <span className={styles.arrow} aria-hidden="true">
                      ←
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
