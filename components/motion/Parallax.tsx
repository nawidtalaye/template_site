"use client";

import type { CSSProperties, ReactNode } from "react";

import { useScrollVar, viewportProgress } from "./useScrollVar";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel in pixels across the full scroll range (negative moves up). */
  distance?: number;
  /** Extra scale applied at the extremes of the range. */
  scale?: number;
  style?: CSSProperties;
};

/**
 * Scroll-linked depth for the hero video and the product mockups.
 * Values are written to `--p`, so the transform below never triggers layout.
 */
export default function Parallax({
  children,
  className = "",
  distance = -60,
  scale = 0,
  style,
}: ParallaxProps) {
  const ref = useScrollVar<HTMLDivElement>(viewportProgress);

  return (
    <div ref={ref} className={className} style={{ "--p": 0.5, ...style } as CSSProperties}>
      {/* `h-full` matters: the inner layer is a containing block (it is
          transformed), so a percentage height inside it would otherwise
          resolve against `auto` and collapse to zero. */}
      <div
        className="h-full w-full"
        style={{
          transform: `translate3d(0, calc((var(--p, 0.5) - 0.5) * ${distance}px), 0) scale(calc(1 + (var(--p, 0.5) - 0.5) * ${scale}))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
