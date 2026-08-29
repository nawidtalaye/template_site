"use client";

import { useState } from "react";

/**
 * Click-to-load map.
 *
 * The OpenStreetMap embed pulls ~1.8MB of third-party JavaScript and CSS, more
 * than the whole rest of the site put together, and `loading="lazy"` does not
 * defer it: the iframe sits inside the first screen or just below it, so the
 * browser starts the fetch immediately. Nothing is requested here until the
 * reader asks for the map, and the address stays linked either way.
 */
export default function MapEmbed({
  src,
  title,
  href,
  className = "",
  minHeight = 340,
}: {
  src: string;
  title: string;
  /** Where the "open the map" link goes when the reader would rather leave. */
  href: string;
  className?: string;
  minHeight?: number;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={title}
        src={src}
        className={`w-full h-full ${className}`}
        style={{ minHeight }}
        loading="lazy"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`${title} — نمایش نقشه`}
      className={`group relative flex w-full flex-col items-center justify-center gap-3 bg-slate-50 text-center transition-colors hover:bg-slate-100 ${className}`}
      style={{ minHeight }}
    >
      {/* Decorative stand-in for the map tiles: a plain grid and a marker, so
          the box reads as a map before a single byte has been fetched. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(148 163 184 / 22%) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgb(148 163 184 / 22%) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <span
        aria-hidden="true"
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform group-hover:scale-105"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      </span>
      <span className="relative text-sm font-bold text-text-dark">نمایش نقشه</span>
      <span className="relative px-6 text-xs leading-6 text-gray-500">
        نقشه از OpenStreetMap بارگیری می شود؛ برای سرعت صفحه تا زمان درخواست شما
        بارگیری نمی شود.
      </span>
      <span
        className="relative text-xs text-primary-hover underline"
        onClick={(event) => {
          event.stopPropagation();
          window.open(href, "_blank", "noopener,noreferrer");
        }}
      >
        باز کردن در OpenStreetMap
      </span>
    </button>
  );
}
