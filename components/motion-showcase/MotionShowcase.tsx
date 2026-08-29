"use client";

import { useEffect, useRef, useState } from "react";

import MotionCard from "./MotionCard";
import { MOTION, TRACK_COPIES } from "./config";
import { posterIndexLabels, posters } from "./data";
import styles from "./motion-showcase.module.css";

/**
 * Cinematic poster showcase.
 *
 * The track is a continuously moving strip of posters. Nothing about a poster's
 * appearance is derived from an "active index": every frame each poster is
 * placed on a wrapped axis, its distance to the focal line at the centre of the
 * viewport is measured, and scale, opacity, brightness, lift, shadow and
 * z-index are interpolated from that distance through a smoothstep curve. That
 * is what makes focus hand off continuously instead of snapping, and what makes
 * the loop seamless: a poster that runs off one edge re-enters from the other
 * far outside the clip box, so the wrap point is never on screen.
 *
 * The whole animation lives outside React: positions are written straight to
 * style on each frame, and React only ever re-renders for the one-shot reveal.
 */

const cards = Array.from({ length: TRACK_COPIES }, (_, copy) =>
  posters.map((poster, index) => ({
    poster,
    indexLabel: posterIndexLabels[index],
    copy,
    key: `${copy}-${poster.key}`,
  })),
).flat();

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export default function MotionShowcase() {
  const rootRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const gapProbeRef = useRef<HTMLSpanElement | null>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const root = rootRef.current;
    if (!viewport || !root) return;

    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    // ---- state kept out of React: touched every frame --------------------
    const metrics = {
      cardWidth: 0,
      cardHeight: 0,
      pitch: 0,
      total: 0,
      maxDistance: 1,
      viewportWidth: 0,
      blurEnabled: false,
      lowPower: false,
    };
    /**
     * Last value written to each poster for the properties that cost a repaint.
     * Transform and opacity are composited and are written every frame; the
     * rest are only written when they have actually moved, which is what keeps
     * the travel smooth on a phone.
     */
    const written = cards.map(() => ({
      hidden: false,
      opacity: "",
      paintStep: -1,
      zIndex: "",
    }));
    let progress = 0; // px travelled along the wrapped axis
    let velocity = 0; // px/s
    let autoVelocity = 0; // px/s the track settles back to
    let frame = 0;
    let lastTime = 0;
    let inView = false;
    let started = false;
    let dragging = false;
    /** A touch that is down but not yet classified as a drag or as a scroll. */
    let pendingTouch = false;
    let pointerId = -1;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartProgress = 0;
    let dragDistance = 0;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let pointerVelocity = 0;
    let pressedPoster: HTMLAnchorElement | null = null;
    let disposed = false;

    // ---- measurement: only ever runs on mount and on resize --------------
    const measure = () => {
      const firstCard = cardRefs.current[0];
      const probe = gapProbeRef.current;
      if (!firstCard || !probe) return;

      metrics.cardWidth = firstCard.offsetWidth;
      metrics.cardHeight = firstCard.offsetHeight;
      metrics.viewportWidth = viewport.clientWidth;
      metrics.pitch = metrics.cardWidth + probe.getBoundingClientRect().width;
      metrics.total = metrics.pitch * cards.length;
      metrics.maxDistance = Math.max(1, metrics.pitch * MOTION.falloff);
      metrics.lowPower = metrics.viewportWidth < MOTION.lowPowerViewport;
      metrics.blurEnabled =
        MOTION.blur > 0 &&
        !metrics.lowPower &&
        metrics.viewportWidth >= MOTION.blurMinViewport;
      autoVelocity = reduceMotionQuery.matches
        ? 0
        : metrics.pitch / MOTION.secondsPerCard;

      // A resize can cross the low-power line in either direction, so the
      // stepped properties are invalidated and any filter left over from the
      // wide layout is handed back to the stylesheet.
      cardRefs.current.forEach((card, index) => {
        written[index].paintStep = -1;
        if (card && metrics.lowPower) {
          card.style.filter = "";
          card.style.removeProperty("--shadow-alpha");
        }
      });
    };

    // ---- the frame: no layout reads, only style writes -------------------
    const render = () => {
      const { cardWidth, cardHeight, pitch, total, maxDistance } = metrics;
      if (!total) return;

      const half = total / 2;
      const halfWidth = cardWidth / 2;
      const halfHeight = cardHeight / 2;
      const cullDistance = metrics.viewportWidth / 2 + cardWidth * 1.25;

      for (let index = 0; index < cardRefs.current.length; index += 1) {
        const card = cardRefs.current[index];
        if (!card) continue;
        const last = written[index];

        // Wrap the poster's raw offset into [-half, half): the seam sits at the
        // far end of the axis, always outside the clipped viewport.
        const raw = index * pitch - progress;
        const x = ((((raw + half) % total) + total) % total) - half;

        if (Math.abs(x) > cullDistance) {
          if (!last.hidden) {
            card.style.visibility = "hidden";
            last.hidden = true;
          }
          continue;
        }
        if (last.hidden) {
          card.style.visibility = "";
          last.hidden = false;
        }

        // Distance from the focal line, normalised, then smoothstepped: this
        // single value drives every visual property of the poster.
        const normalized = clamp01(Math.abs(x) / maxDistance);
        const focus = 1 - normalized;
        const eased = focus * focus * (3 - 2 * focus);

        const scale = lerp(MOTION.scale.min, MOTION.scale.max, eased);
        const lift = MOTION.lift * eased;

        // Composited: written every frame, because that is the motion itself.
        card.style.transform =
          "translate3d(" +
          (x - halfWidth).toFixed(2) +
          "px, " +
          (-halfHeight - lift).toFixed(2) +
          "px, 0) scale(" +
          scale.toFixed(4) +
          ")";

        const opacity = lerp(
          MOTION.opacity.min,
          MOTION.opacity.max,
          eased,
        ).toFixed(3);
        if (opacity !== last.opacity) {
          card.style.opacity = opacity;
          last.opacity = opacity;
        }

        // Everything below repaints the poster, so it moves in steps. On a
        // phone the filter and the shadow tint are dropped outright and the
        // stylesheet's flat shadow stands in for them.
        const paintStep = Math.round(eased * MOTION.paintSteps);
        if (paintStep !== last.paintStep) {
          last.paintStep = paintStep;
          const stepped = paintStep / MOTION.paintSteps;

          if (!metrics.lowPower) {
            const brightness = lerp(
              MOTION.brightness.min,
              MOTION.brightness.max,
              stepped,
            );
            card.style.filter =
              metrics.blurEnabled && stepped < 0.9
                ? "brightness(" +
                  brightness.toFixed(3) +
                  ") blur(" +
                  (MOTION.blur * (1 - stepped)).toFixed(2) +
                  "px)"
                : "brightness(" + brightness.toFixed(3) + ")";
            card.style.setProperty(
              "--shadow-alpha",
              lerp(MOTION.shadow.min, MOTION.shadow.max, stepped).toFixed(3),
            );
          }
        }

        // Stacking order needs finer resolution than the painted properties,
        // or two posters passing each other trade places in one visible jump.
        const zIndex = String(10 + Math.round(eased * 100));
        if (zIndex !== last.zIndex) {
          card.style.zIndex = zIndex;
          last.zIndex = zIndex;
        }
      }
    };

    const step = (time: number) => {
      frame = 0;
      if (disposed) return;

      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (!dragging) {
        // Exponential approach, so a throw from the user decays into the
        // autoplay velocity without a visible change of gear.
        velocity +=
          (autoVelocity - velocity) * (1 - Math.exp(-delta / MOTION.resumeTau));
        progress += velocity * delta;
        if (metrics.total) {
          progress = ((progress % metrics.total) + metrics.total) % metrics.total;
        }
      }

      render();

      // With reduced motion the loop only runs long enough to absorb a drag.
      const settled = Math.abs(velocity - autoVelocity) < 0.5;
      if (inView && !(autoVelocity === 0 && settled && !dragging)) {
        frame = window.requestAnimationFrame(step);
      }
    };

    const play = () => {
      if (disposed || frame) return;
      lastTime = performance.now();
      frame = window.requestAnimationFrame(step);
    };

    const pause = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    // ---- pointer drag ----------------------------------------------------
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      // A finger is not a drag yet. Taking it as one means every vertical
      // swipe over the section shoves the track sideways while the page
      // scrolls, which reads as the posters jumping.
      const isTouch = event.pointerType !== "mouse";
      dragging = !isTouch;
      pendingTouch = isTouch;
      pointerId = event.pointerId;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      dragStartProgress = progress;
      dragDistance = 0;
      lastPointerX = event.clientX;
      lastPointerTime = event.timeStamp;
      pointerVelocity = 0;
      // The poster under the finger when the press started. Which poster that
      // is has to be recorded now: the track keeps moving, so by the time the
      // press ends a different poster is under the same pixel.
      pressedPoster =
        (event.target as HTMLElement | null)?.closest?.<HTMLAnchorElement>(
          'a[data-poster-copy="primary"]',
        ) ?? null;
      viewport.setPointerCapture(pointerId);
      viewport.classList.add(styles.dragging);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;

      if (pendingTouch) {
        const dx = event.clientX - dragStartX;
        const dy = event.clientY - dragStartY;
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > MOTION.touchEngage) {
          // The finger is scrolling the page. Let go of it for good.
          pendingTouch = false;
          pressedPoster = null;
          viewport.classList.remove(styles.dragging);
          return;
        }
        if (Math.abs(dx) < MOTION.touchEngage) return;
        // Engaged. The origin is reset to here, so the track does not snap by
        // the slop distance the finger spent being classified.
        pendingTouch = false;
        dragging = true;
        // Already past the tap threshold: this release must never open a link.
        dragDistance = MOTION.touchEngage;
        dragStartX = event.clientX;
        dragStartProgress = progress;
        lastPointerX = event.clientX;
        lastPointerTime = event.timeStamp;
      }

      if (!dragging) return;

      const delta = event.clientX - dragStartX;
      dragDistance = Math.max(dragDistance, Math.abs(delta));
      progress = dragStartProgress - delta;

      const elapsed = event.timeStamp - lastPointerTime;
      if (elapsed > 0) {
        pointerVelocity = ((event.clientX - lastPointerX) / elapsed) * 1000;
        lastPointerX = event.clientX;
        lastPointerTime = event.timeStamp;
      }
      render();
    };

    const endDrag = (event: PointerEvent) => {
      if ((!dragging && !pendingTouch) || event.pointerId !== pointerId) return;
      const wasDragging = dragging;
      dragging = false;
      pendingTouch = false;
      viewport.classList.remove(styles.dragging);
      if (viewport.hasPointerCapture(pointerId)) {
        viewport.releasePointerCapture(pointerId);
      }
      pointerId = -1;
      // Hand the throw to the loop, which blends it back into autoplay.
      if (wasDragging) velocity = -pointerVelocity;
      if (inView) play();

      // A press that did not travel is a tap. The browser cannot deliver it as
      // a click, because the pointer was captured by the viewport and the
      // poster moved out from under the cursor between press and release, so
      // the poster is activated here instead.
      const tapped = pressedPoster;
      pressedPoster = null;
      if (tapped && dragDistance <= MOTION.dragThreshold) {
        dragDistance = 0;
        tapped.click();
      }
    };

    // The browser taking the gesture over — a page scroll — is not a tap.
    const onPointerCancel = (event: PointerEvent) => {
      pressedPoster = null;
      endDrag(event);
    };

    const onClickCapture = (event: MouseEvent) => {
      if (dragDistance > MOTION.dragThreshold) {
        event.preventDefault();
        event.stopPropagation();
        dragDistance = 0;
      }
    };

    // ---- start once the posters are actually decoded ---------------------
    const start = () => {
      if (started || disposed) return;
      started = true;
      measure();
      render();
      setRevealed(true);
      if (inView) play();
    };

    const images = Array.from(
      viewport.querySelectorAll<HTMLImageElement>(
        '[data-poster-copy="primary"] img',
      ),
    );
    const pending = images.filter((image) => !image.complete);
    let readyTimer = 0;
    const settleListeners: Array<() => void> = [];

    if (pending.length === 0) {
      start();
    } else {
      let remaining = pending.length;
      pending.forEach((image) => {
        const settle = () => {
          remaining -= 1;
          if (remaining <= 0) {
            window.clearTimeout(readyTimer);
            start();
          }
        };
        image.addEventListener("load", settle, { once: true });
        image.addEventListener("error", settle, { once: true });
        settleListeners.push(() => {
          image.removeEventListener("load", settle);
          image.removeEventListener("error", settle);
        });
      });
      // A stalled image must never leave the section blank.
      readyTimer = window.setTimeout(start, MOTION.imageTimeoutMs);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        // The posters load lazily, so on a first visit none of them have
        // decoded by the time the section is reached. Approaching it is the
        // real cue to start: waiting on the images would leave the section
        // blank until the decode timeout fired.
        if (inView) start();
        if (inView && started) play();
        else pause();
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(root);

    const resizeObserver = new ResizeObserver(() => {
      measure();
      render();
    });
    resizeObserver.observe(viewport);

    const onVisibilityChange = () => {
      if (document.hidden) pause();
      else if (inView && started) play();
    };

    const onReduceMotionChange = () => {
      measure();
      if (reduceMotionQuery.matches) {
        velocity = 0;
        render();
        pause();
      } else if (inView && started) {
        play();
      }
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", onPointerCancel);
    viewport.addEventListener("click", onClickCapture, true);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reduceMotionQuery.addEventListener("change", onReduceMotionChange);

    return () => {
      disposed = true;
      pause();
      window.clearTimeout(readyTimer);
      settleListeners.forEach((remove) => remove());
      observer.disconnect();
      resizeObserver.disconnect();
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", onPointerCancel);
      viewport.removeEventListener("click", onClickCapture, true);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduceMotionQuery.removeEventListener("change", onReduceMotionChange);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-labelledby="motion-showcase-title"
    >
      <div className={`${styles.inner} ${revealed ? styles.revealed : ""}`}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowMark} aria-hidden="true" />
            نواتیک / خدمات منتخب
          </p>
          <h2 id="motion-showcase-title" className={styles.title}>
            <span className="heavy">آنچه</span>{" "}
            <span className="light">می سازیم</span>
          </h2>
        </header>

        <div ref={viewportRef} className={styles.viewport}>
          {/* Measured rather than parsed: a clamp() inside a custom property is
              not resolved by getComputedStyle, but a laid-out box always is. */}
          <span
            ref={gapProbeRef}
            className={styles.gapProbe}
            aria-hidden="true"
          />

          <div className={styles.track}>
            {cards.map((card, index) => (
              <MotionCard
                key={card.key}
                poster={card.poster}
                indexLabel={card.indexLabel}
                duplicate={card.copy > 0}
                registerRef={(element) => {
                  cardRefs.current[index] = element;
                }}
              />
            ))}
          </div>
        </div>

        <p className={styles.caption}>
          هشت سیستم تحویل شده نواتیک، از کارگو و گدام و سوپرمارکت تا رستورانت،
          نفت و گاز و حضور و غیاب.
        </p>
      </div>
    </section>
  );
}
