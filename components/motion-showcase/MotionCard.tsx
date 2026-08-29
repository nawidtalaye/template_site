"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import styles from "./motion-showcase.module.css";
import type { Poster } from "./data";

type MotionCardProps = {
  poster: Poster;
  indexLabel: string;
  /**
   * The track renders the poster list more than once so the wrap point stays
   * off screen. Only the first copy is real content; the rest are decorative
   * and are hidden from assistive tech and from the tab order.
   */
  duplicate: boolean;
  registerRef: (element: HTMLAnchorElement | null) => void;
};

export default function MotionCard({
  poster,
  indexLabel,
  duplicate,
  registerRef,
}: MotionCardProps) {
  return (
    <Link
      ref={registerRef}
      href={poster.href}
      className={styles.card}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      draggable={false}
      data-poster-copy={duplicate ? "duplicate" : "primary"}
      style={{ "--poster-tint": poster.tint } as CSSProperties}
    >
      <span className={styles.frame}>
        <Image
          src={poster.image}
          alt={duplicate ? "" : poster.alt}
          fill
          sizes="(max-width: 600px) 66vw, (max-width: 1023px) 40vw, 22vw"
          className={styles.artwork}
          // The showcase is always below the fold. Loading the posters eagerly
          // put sixteen full-width images on the critical path and had Next
          // preload the first of them, which held first paint back by half a
          // second; the track starts itself when the section nears the
          // viewport, so the browser is left to fetch these on its own terms.
          loading="lazy"
          fetchPriority="low"
          draggable={false}
        />
      </span>

      <span className={styles.scrim} aria-hidden="true" />

      <span className={styles.meta}>
        <span className={styles.index} aria-hidden="true">
          {indexLabel}
        </span>
        <span className={styles.kicker}>{poster.kicker}</span>
        <span className={`${styles.posterTitle} heavy`}>{poster.title}</span>
      </span>
    </Link>
  );
}
