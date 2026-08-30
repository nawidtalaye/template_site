"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";

import { useInView } from "./useInView";

type RevealProps = {
  children?: ReactNode;
  /** Rendered element — kept semantic (section, li, h2 …). */
  as?: ElementType;
  className?: string;
  /** Entrance delay in milliseconds. */
  delay?: number;
  /** Entrance duration in milliseconds. */
  duration?: number;
  /** Entrance offset, in pixels. Positive `y` travels up into place. */
  y?: number;
  /** Horizontal offset, in pixels. In RTL, negative moves with the reading direction. */
  x?: number;
  scale?: number;
  /** Horizontal scale for rules and lines that draw themselves in. */
  scaleX?: number;
  rootMargin?: string;
  threshold?: number;
  id?: string;
  style?: CSSProperties;
};

/**
 * The single entrance primitive of the page.
 * The element carries its motion through CSS custom properties, so the
 * animation is pure compositing work: no React re-render during the transition.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  duration = 900,
  y = 30,
  x = 0,
  scale = 1,
  scaleX = 1,
  rootMargin,
  threshold,
  id,
  style,
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin, threshold });

  return (
    <Tag
      id={id}
      ref={ref}
      data-reveal={inView ? "visible" : "hidden"}
      className={className}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-duration": `${duration}ms`,
          "--reveal-y": `${y}px`,
          "--reveal-x": `${x}px`,
          "--reveal-scale": scale,
          "--reveal-scale-x": scaleX,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/** Masked single-line reveal, used for headline typography. */
export function RevealLine({
  children,
  className = "",
  delay = 0,
  duration = 1000,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <span
      data-reveal-line
      className={className}
      style={{ "--reveal-delay": `${delay}ms`, "--reveal-duration": `${duration}ms` } as CSSProperties}
    >
      <span>{children}</span>
    </span>
  );
}
