"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Distance from the viewport edge at which the element counts as visible. */
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

/**
 * Reports whether an element has entered the viewport.
 * Shared by every animated section so there is exactly one observer per element
 * and no scroll handler runs for elements that are already done.
 *
 * The server and the first client render both start hidden — the entrance is
 * the whole point — and a `<noscript>` rule in the layout makes the content
 * visible again if JavaScript never arrives.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
): [React.RefObject<T | null>, boolean] {
  const { rootMargin = "0px 0px -12% 0px", threshold = 0.15, once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, inView];
}
