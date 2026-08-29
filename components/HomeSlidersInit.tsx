"use client";

import { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";

export default function HomeSlidersInit() {
  useEffect(() => {
    let cancelled = false;
    const sliderInstances: Array<{
      destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
    }> = [];
    const initialized = new Set<string>();

    const initializeSlider = async (selector: string) => {
      if (cancelled || initialized.has(selector)) {
        return;
      }

      initialized.add(selector);

      const [{ default: Swiper }, { Navigation }] = await Promise.all([
        import("swiper"),
        import("swiper/modules"),
      ]);

      if (cancelled) {
        return;
      }

      if (selector === "#portfolios-slider") {
        sliderInstances.push(
          new Swiper(selector, {
            modules: [Navigation],
            slidesPerView: 1,
            spaceBetween: 12,
            watchOverflow: true,
            observer: true,
            observeParents: true,
            navigation: {
              nextEl: "#home-portfolio-next",
              prevEl: "#home-portfolio-prev",
            },
            breakpoints: {
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            },
          }),
        );
      }
    };

    const sliderSelectors = ["#portfolios-slider"];
    const sliderElements = sliderSelectors
      .map((selector) => document.querySelector<HTMLElement>(selector))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sliderElements.length === 0) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      sliderSelectors.forEach((selector) => {
        void initializeSlider(selector);
      });
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            observer.unobserve(entry.target);
            void initializeSlider(`#${(entry.target as HTMLElement).id}`);
          });
        },
        {
          rootMargin: "240px 0px",
        },
      );

      sliderElements.forEach((element) => observer.observe(element));

      return () => {
        cancelled = true;
        observer.disconnect();
        sliderInstances.forEach((slider) => slider.destroy(true, true));
      };
    }

    return () => {
      cancelled = true;
      sliderInstances.forEach((slider) => slider.destroy(true, true));
    };
  }, []);

  return null;
}
