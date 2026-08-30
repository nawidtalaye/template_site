"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger in milliseconds, applied as a transition-delay. */
  delay?: number;
  /** Direction the element travels from. `up` is the safe default. */
  from?: "up" | "start";
  /** Render as a list item so reveals can wrap `<li>` without breaking semantics. */
  as?: "div" | "li";
};

/**
 * One IntersectionObserver per element is cheap enough for the handful of
 * reveals per section and keeps the component dependency-free: no scroll
 * library, no layout thrash, GPU-friendly transform + opacity only.
 *
 * The initial hidden state lives in CSS, with a `<noscript>` override in the
 * root layout, so the page is never blank if the observer never runs.
 */
export default function Reveal({ children, className, delay = 0, from = "up", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal={shown ? "in" : "out"}
      data-reveal-from={from}
      style={delay ? ({ ["--reveal-delay" as string]: `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
