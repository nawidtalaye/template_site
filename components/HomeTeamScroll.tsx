"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { teamMembers, toPersianIndex } from "@/lib/team";
import styles from "./HomeTeamScroll.module.css";

const total = teamMembers.length;
const totalLabel = toPersianIndex(total);

/** Per-line stagger, expressed in scroll-segment units. */
const lineDelays = [0, 0.035, 0.07, 0.105];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** Smooth 0..1 ramp between two edges. */
function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Gentle S-curve: no speed spike in the middle of a handover. */
function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

/**
 * Vertical offset of one text line, in percent of its own height.
 *
 * The outgoing member's lines leave during the first half of a segment and the
 * incoming member's lines arrive during the second half, so the two never sit
 * on screen at the same time — a handoff rather than a cross-fade.
 */
function lineOffset(offset: number, delay: number) {
  if (offset >= 0) {
    return -smoothstep(0.05 + delay, 0.45 + delay, offset) * 130;
  }
  // Starts only once the outgoing line has fully cleared its mask at 0.45.
  return smoothstep(0.15 - delay, 0.55 - delay, -offset) * 130;
}

/**
 * Scroll-driven editorial team showcase.
 *
 * Desktop pins a single portrait aperture: the incoming member is wiped over
 * the outgoing one with a `clip-path` curtain while the photograph inside it
 * counter-moves, and the copy is handed over line by line behind overflow
 * masks. Every value is scrubbed from scroll position, so the user stays in
 * control. Tablet and mobile drop the pin and stack the members in a plain
 * column, where the same aperture wipe and line stagger are scrubbed against
 * each member's own entry into the viewport instead — see `updateFlow`.
 * `prefers-reduced-motion` gets the stack with no motion at all.
 */
export default function HomeTeamScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const memberRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    if (!track || !pin) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const customProperties = [
      "--team-clip",
      "--team-plate-y",
      "--team-plate-scale",
      "--team-divider",
      "--team-pointer-x",
      "--team-pointer-y",
      "--team-line-0",
      "--team-line-1",
      "--team-line-2",
      "--team-line-3",
    ];

    let frame = 0;
    let pointerTarget: HTMLElement | null = null;
    // Rendered position trails the raw scroll position, so a wheel notch turns
    // into a glide instead of a jump. `null` means "snap on the next frame".
    let rendered: number | null = null;
    let lastTime = 0;
    /** Last quantised entry value written per member by the flow scrub. */
    const flowSteps: number[] = [];

    const clearMemberStyles = () => {
      rendered = null;
      flowSteps.length = 0;
      memberRefs.current.forEach((member) => {
        if (!member) return;
        customProperties.forEach((property) => member.style.removeProperty(property));
        member.classList.remove(styles.isActive);
      });
      railRef.current?.style.removeProperty("--team-rail");
    };

    const isScrubbing = () => desktopQuery.matches && motionQuery.matches;
    /** Mobile and tablet: no pin, so each member is scrubbed on its own. */
    const isFlowScrubbing = () => !desktopQuery.matches && motionQuery.matches;

    /**
     * Non-pinned reveal.
     *
     * The pinned layout hands one member over to the next; there is nothing to
     * hand over here, so each member instead plays the same move against its
     * own entry into the viewport — the portrait is wiped open from the bottom
     * while the photograph inside settles out of its overscale, and the three
     * copy lines rise into place behind their masks, staggered.
     */
    const updateFlow = () => {
      const viewportHeight = window.innerHeight;

      memberRefs.current.forEach((member, index) => {
        if (!member) return;

        const rect = member.getBoundingClientRect();
        // Starts as the card's top edge clears the last tenth of the screen,
        // finishes half a screen later.
        const entry = clamp01(
          (viewportHeight * 0.9 - rect.top) / (viewportHeight * 0.5),
        );

        // Quantised: below a step of this size nothing on screen changes, and
        // a phone is spared the clip-path repaint.
        const step = Math.round(entry * 200);
        if (step === flowSteps[index]) return;
        flowSteps[index] = step;

        const reveal = easeInOutSine(entry);
        member.style.setProperty("--team-clip", `${((1 - reveal) * 100).toFixed(2)}%`);
        member.style.setProperty(
          "--team-plate-y",
          `${((1 - reveal) * -4).toFixed(3)}%`,
        );
        member.style.setProperty(
          "--team-plate-scale",
          (1.075 - reveal * 0.075).toFixed(4),
        );

        lineDelays.forEach((delay, line) => {
          // The stagger is widened here: the segment a line has to travel in
          // is the card's whole entry, not one slice of a pinned handover.
          const lineReveal = easeInOutSine(
            clamp01((entry - delay * 2.6) / 0.72),
          );
          member.style.setProperty(
            `--team-line-${line}`,
            `${((1 - lineReveal) * 130).toFixed(2)}%`,
          );
        });

        member.style.setProperty("--team-divider", reveal.toFixed(4));
      });
    };

    const update = (time = 0) => {
      frame = 0;
      if (isFlowScrubbing()) {
        updateFlow();
        return;
      }
      if (!isScrubbing()) return;

      const header = document.getElementById("header");
      const headerBottom = header
        ? Math.max(0, header.getBoundingClientRect().bottom)
        : 72;
      track.style.setProperty("--team-pin-top", `${Math.ceil(headerBottom + 16)}px`);

      const distance = track.offsetHeight - pin.offsetHeight;
      const start = track.getBoundingClientRect().top + window.scrollY - pin.offsetTop;
      const progress =
        distance > 0 ? clamp01((window.scrollY - start) / distance) : 0;
      const target = progress * (total - 1);

      // Exponential smoothing, frame-rate independent. ~180ms to close the gap.
      const delta = lastTime ? Math.min(64, time - lastTime) : 16;
      lastTime = time;
      if (rendered === null) {
        rendered = target;
      } else {
        rendered += (target - rendered) * (1 - Math.exp(-delta / 180));
        if (Math.abs(target - rendered) < 0.0005) rendered = target;
      }

      const position = rendered;
      const active = Math.round(position);
      const settled = position === target;

      railRef.current?.style.setProperty(
        "--team-rail",
        (total > 1 ? clamp01(position / (total - 1)) : progress).toFixed(4),
      );

      memberRefs.current.forEach((member, index) => {
        if (!member) return;

        // How far this member's curtain has been drawn over the previous one.
        const reveal = easeInOutSine(clamp01(position - index + 1));
        // How far the *next* member has covered this one.
        const covered = easeInOutSine(clamp01(position - index));
        // Negative -> still ahead; positive -> already handed over.
        const offset = Math.min(1, Math.max(-1, position - index));

        member.style.setProperty("--team-clip", `${((1 - reveal) * 100).toFixed(2)}%`);
        member.style.setProperty(
          "--team-plate-y",
          `${((1 - reveal) * -3.5 + covered * 3).toFixed(3)}%`,
        );
        member.style.setProperty(
          "--team-plate-scale",
          (1.095 - covered * 0.02).toFixed(4),
        );

        lineDelays.forEach((delay, line) => {
          member.style.setProperty(
            `--team-line-${line}`,
            `${lineOffset(offset, delay).toFixed(2)}%`,
          );
        });

        const dividerShift = Math.abs(lineOffset(offset, lineDelays[2])) / 130;
        member.style.setProperty("--team-divider", (1 - dividerShift).toFixed(4));

        member.classList.toggle(styles.isActive, index === active);
        if (index !== active) {
          member.style.setProperty("--team-pointer-x", "0px");
          member.style.setProperty("--team-pointer-y", "0px");
        }
      });

      pointerTarget = memberRefs.current[active] ?? null;

      // Keep animating until the rendered position has caught up.
      if (!settled && !frame) frame = window.requestAnimationFrame(update);
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    /** Very small pointer parallax on the active portrait (desktop only). */
    const handlePointerMove = (event: PointerEvent) => {
      if (!pointerTarget || !isScrubbing() || event.pointerType !== "mouse") return;
      const rect = pin.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      pointerTarget.style.setProperty("--team-pointer-x", `${(x * 12).toFixed(2)}px`);
      pointerTarget.style.setProperty("--team-pointer-y", `${(y * 12).toFixed(2)}px`);
    };

    const handleModeChange = () => {
      clearMemberStyles();
      track.style.removeProperty("--team-pin-top");
      requestUpdate();
    };

    handleModeChange();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    desktopQuery.addEventListener("change", handleModeChange);
    motionQuery.addEventListener("change", handleModeChange);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("pointermove", handlePointerMove);
      desktopQuery.removeEventListener("change", handleModeChange);
      motionQuery.removeEventListener("change", handleModeChange);
      if (frame) window.cancelAnimationFrame(frame);
      clearMemberStyles();
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="home-team-title">
      <div className={styles.heading}>
        <p className={styles.eyebrow}>تیم نواتیک</p>
        <h2 id="home-team-title" className={styles.title}>
          <span className="heavy">افرادی که</span>{" "}
          <span className="light">پشت راهکارهای نواتیک هستند</span>
        </h2>
        <img
          alt=""
          aria-hidden="true"
          loading="lazy"
          width="129"
          height="19"
          decoding="async"
          className={styles.signature}
          src="/images/signature.jpg"
        />
        <p className={styles.intro}>
          هر سیستمی که تحویل می دهیم نتیجه کار مشترک تحلیل، توسعه و طراحی است.
          اینها کسانی هستند که آن را می سازند.
        </p>
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        style={{ "--team-count": total } as React.CSSProperties}
      >
        <div ref={pinRef} className={styles.pin}>
          <div className={styles.stage}>
            <div className={styles.rail} aria-hidden="true">
              <span ref={railRef} className={styles.railFill} />
            </div>

            {teamMembers.map((member, index) => (
              <article
                key={member.slug}
                ref={(element) => {
                  memberRefs.current[index] = element;
                }}
                className={styles.member}
                style={{ zIndex: index + 1 }}
              >
                <div className={styles.visual}>
                  <div className={styles.plate}>
                    <Image
                      src={member.image}
                      alt={member.alt}
                      width={member.width}
                      height={member.height}
                      sizes="(min-width: 1024px) 46vw, (min-width: 768px) 22rem, 17.5rem"
                      className={styles.portrait}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </div>

                <div className={styles.info}>
                  <p className={`${styles.line} ${styles.counter}`}>
                    <span className={styles.lineInner}>
                      <span className={styles.counterCurrent}>
                        {toPersianIndex(index + 1)}
                      </span>
                      {" / "}
                      {totalLabel}
                    </span>
                  </p>

                  <h3 className={`${styles.line} ${styles.name}`}>
                    <span className={`${styles.lineInner} heavy`}>{member.name}</span>
                  </h3>

                  <span className={styles.divider} aria-hidden="true" />

                  <p className={`${styles.line} ${styles.role}`}>
                    <span className={styles.lineInner}>{member.role}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
