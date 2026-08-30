"use client";

import { useEffect, useRef } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Writes a scroll-derived number (0 → 1) onto an element as a CSS variable.
 * Runs inside a single rAF pass per frame, only subscribes to scroll while the
 * element is on screen, and writes a plain custom property so the browser keeps
 * the work on the compositor instead of re-rendering React.
 */
export function useScrollVar<T extends HTMLElement = HTMLDivElement>(
  compute: (rect: DOMRect, viewportHeight: number) => number,
  variable = "--p",
) {
  const ref = useRef<T | null>(null);
  const computeRef = useRef(compute);

  // Kept in a ref so the scroll handler always uses the latest closure without
  // re-subscribing on every render.
  useEffect(() => {
    computeRef.current = compute;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      el.style.setProperty(variable, "0.5");
      return;
    }

    let frame = 0;
    let active = false;

    const write = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const value = computeRef.current(rect, window.innerHeight);
      node.style.setProperty(variable, String(Math.min(1, Math.max(0, value))));
    };

    const request = () => {
      if (frame) return;
      frame = requestAnimationFrame(write);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          active = entry.isIntersecting;
        }
        if (active) request();
      },
      { rootMargin: "20% 0px 20% 0px" },
    );

    observer.observe(el);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    write();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [variable]);

  return ref;
}

/** Progress of the element through the viewport: 0 below the fold, 1 once above it. */
export const viewportProgress = (rect: DOMRect, vh: number) => {
  const total = vh + rect.height;
  if (total <= 0) return 0;
  return (vh - rect.top) / total;
};

/** Progress measured between two scroll positions, in fractions of the viewport. */
export function rangeProgress(from = 0.85, to = 0.35) {
  return (rect: DOMRect, vh: number) => {
    const start = vh * from;
    const end = vh * to;
    return (start - rect.top) / Math.max(1, start - end);
  };
}
