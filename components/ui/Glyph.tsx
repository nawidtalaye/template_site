import type { LucideIcon } from "lucide-react";

type GlyphProps = {
  icon: LucideIcon;
  /** `light` sits on white surfaces, `dark` on the deep slate sections. */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const plate = {
  sm: { box: "size-11 rounded-xl", icon: "size-5", radius: "rounded-xl" },
  md: { box: "size-14 rounded-2xl", icon: "size-6", radius: "rounded-2xl" },
  lg: { box: "size-[72px] rounded-[22px]", icon: "size-8", radius: "rounded-[22px]" },
} as const;

/**
 * A restrained dimensional icon: one extruded plate with a soft cast shadow,
 * a diagonal gloss and the mark lifted off the surface on the Z axis.
 * Used selectively — the icon, not a card, carries the section.
 */
export default function Glyph({ icon: Icon, tone = "light", size = "md", className = "" }: GlyphProps) {
  const s = plate[size];
  const dark = tone === "dark";

  return (
    <span className={`relative inline-block [perspective:720px] ${className}`} aria-hidden="true">
      <span
        className={`relative block [transform-style:preserve-3d] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [transform:rotateX(12deg)_rotateY(-16deg)] group-hover:[transform:rotateX(6deg)_rotateY(-6deg)_translateZ(10px)]`}
      >
        {/* extruded body + cast shadow */}
        <span
          className={`absolute inset-x-2 bottom-[-6px] top-3 ${s.radius} blur-[10px] ${
            dark ? "bg-primary/25" : "bg-slate-900/15"
          }`}
        />
        <span
          className={`absolute inset-x-1 bottom-[-3px] top-1.5 ${s.radius} ${
            dark ? "bg-slate-800" : "bg-slate-200/90"
          }`}
        />
        {/* top face */}
        <span
          className={`relative flex ${s.box} items-center justify-center ${s.radius} border ${
            dark
              ? "border-white/15 bg-[linear-gradient(150deg,#1e293b,#0f172a)] text-primary"
              : "border-white bg-[linear-gradient(150deg,#ffffff,#f1f5f9)] text-primary-ink"
          } shadow-[0_10px_24px_-14px_rgba(15,23,42,0.55)] [transform:translateZ(14px)]`}
        >
          <Icon className={s.icon} strokeWidth={1.75} />
          <span
            className={`pointer-events-none absolute inset-0 ${s.radius} bg-[linear-gradient(125deg,rgba(255,255,255,0.85),rgba(255,255,255,0)_46%)] ${
              dark ? "opacity-20" : "opacity-100"
            }`}
          />
        </span>
      </span>
    </span>
  );
}
