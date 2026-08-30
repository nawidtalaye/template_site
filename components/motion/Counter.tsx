"use client";

import { useEffect, useState } from "react";

import { toPersianDigits } from "@/lib/format";
import { useInView } from "./useInView";
import { prefersReducedMotion } from "./useScrollVar";

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Thousands separator, Persian style. */
  grouping?: boolean;
};

/** Counts up once, when the number scrolls into view. */
export default function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1700,
  className = "",
  grouping = true,
}: CounterProps) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      const frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(value * easeOutExpo(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  const text = toPersianDigits(display, grouping);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
