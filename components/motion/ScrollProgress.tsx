"use client";

import type { CSSProperties, ReactNode } from "react";

import { rangeProgress, useScrollVar } from "./useScrollVar";

type ScrollProgressProps = {
  children: ReactNode;
  className?: string;
  /** Scroll positions (fractions of the viewport height) where progress starts and ends. */
  from?: number;
  to?: number;
  variable?: string;
  style?: CSSProperties;
};

/**
 * Publishes the section's scroll progress as `--progress` (0 → 1).
 * Children animate off it: `scaleX(var(--progress))` for a growing rule,
 * `opacity: calc(var(--progress) * 2)` for a staged fade, and so on.
 */
export default function ScrollProgress({
  children,
  className = "",
  from = 0.85,
  to = 0.35,
  variable = "--progress",
  style,
}: ScrollProgressProps) {
  const ref = useScrollVar<HTMLDivElement>(rangeProgress(from, to), variable);

  return (
    <div ref={ref} className={className} style={{ [variable]: 0, ...style } as CSSProperties}>
      {children}
    </div>
  );
}
