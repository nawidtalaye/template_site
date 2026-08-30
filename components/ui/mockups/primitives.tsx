import type { ReactNode } from "react";

import { toPersianDigits } from "@/lib/format";

/* Small building blocks for the in-code software mockups.
   Everything here is decorative but reads like a real enterprise UI:
   Persian labels, RTL tables, tabular figures, restrained colour. */

export function MockWindow({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_40px_90px_-50px_rgba(15,23,42,0.45)] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/90 px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-slate-300" />
          <span className="size-2 rounded-full bg-slate-300" />
          <span className="size-2 rounded-full bg-primary/70" />
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate text-[11px] font-bold text-slate-600">{title}</span>
          {subtitle ? <span className="hidden text-[10px] text-slate-400 sm:inline">· {subtitle}</span> : null}
        </div>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-4 w-16 rounded-full bg-slate-200/80" />
          <span className="size-4 rounded-full bg-slate-200" />
        </div>
      </div>
      {children}
    </div>
  );
}

export function MockSidebar({ items, active }: { items: string[]; active: number }) {
  return (
    <aside className="hidden w-44 shrink-0 border-l border-slate-200/80 bg-slate-50/40 p-3 lg:block">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="size-6 rounded-md bg-slate-900" aria-hidden="true" />
        <span className="text-[11px] font-bold text-slate-700">نواتیک</span>
      </div>
      <ul className="flex flex-col gap-0.5">
        {items.map((item, i) => (
          <li
            key={item}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${
              i === active ? "bg-primary/15 font-bold text-primary-ink" : "text-slate-500"
            }`}
          >
            <span className={`size-1.5 rounded-full ${i === active ? "bg-primary" : "bg-slate-300"}`} aria-hidden="true" />
            <span className="truncate">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function MockBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex-1 bg-white p-3 sm:p-4 ${className}`}>{children}</div>;
}

export function MockHeader({
  title,
  actions = [],
}: {
  title: string;
  actions?: string[];
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
      <h4 className="text-[13px] font-black text-slate-800">{title}</h4>
      <div className="flex items-center gap-1.5">
        {actions.map((action, i) => (
          <span
            key={action}
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
              i === 0 ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-500"
            }`}
          >
            {action}
          </span>
        ))}
      </div>
    </div>
  );
}

const kpiTones = {
  neutral: "text-slate-900",
  positive: "text-emerald-600",
  alert: "text-amber-600",
  accent: "text-primary-ink",
} as const;

export function MockKpi({
  label,
  value,
  unit,
  note,
  tone = "neutral",
}: {
  label: string;
  value: string;
  unit?: string;
  note?: string;
  tone?: keyof typeof kpiTones;
}) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3">
      <div className="text-[10px] text-slate-500">{label}</div>
      <div className={`num mt-1 flex items-baseline gap-1 text-[15px] font-black ${kpiTones[tone]}`}>
        <span>{value}</span>
        {unit ? <span className="text-[10px] font-medium text-slate-400">{unit}</span> : null}
      </div>
      {note ? <div className="mt-0.5 text-[9px] text-slate-400">{note}</div> : null}
    </div>
  );
}

export function MockTable({
  head,
  rows,
  foot,
  className = "",
}: {
  head: string[];
  rows: ReactNode[][];
  foot?: ReactNode[];
  className?: string;
}) {
  return (
    <div className={`no-scrollbar overflow-x-auto rounded-xl border border-slate-200/80 ${className}`}>
      <table className="w-full min-w-[340px] border-collapse text-right">
        <thead>
          <tr className="bg-slate-50">
            {head.map((cell, i) => (
              <th
                key={cell}
                className={`px-3 py-2 text-[10px] font-bold text-slate-500 ${i === 0 ? "" : "text-right"}`}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 ? "bg-slate-50/40" : "bg-white"}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`border-t border-slate-100 px-3 py-2 text-[11px] text-slate-600 ${
                    j === 0 ? "font-bold text-slate-800" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {foot ? (
          <tfoot>
            <tr className="bg-slate-900/[0.03]">
              {foot.map((cell, j) => (
                <td key={j} className="border-t border-slate-200 px-3 py-2 text-[11px] font-black text-slate-800">
                  {cell}
                </td>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
}

export function MockBar({
  value,
  tone = "accent",
  delay = 0,
}: {
  value: number;
  tone?: "accent" | "alert" | "muted";
  delay?: number;
}) {
  const color = tone === "alert" ? "bg-amber-400" : tone === "muted" ? "bg-slate-300" : "bg-primary";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
      <div
        className={`h-full origin-right rounded-full animate-[growX_1.1s_cubic-bezier(0.16,1,0.3,1)_both] ${color}`}
        style={{ width: `${Math.min(100, Math.max(2, value))}%`, animationDelay: `${delay}ms` }}
      />
    </div>
  );
}

export function MockChip({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "accent" | "alert" | "ok" }) {
  const tones = {
    muted: "border-slate-200 bg-slate-50 text-slate-500",
    accent: "border-primary/30 bg-primary/12 text-primary-ink",
    alert: "border-amber-200 bg-amber-50 text-amber-700",
    ok: "border-emerald-200 bg-emerald-50 text-emerald-700",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${tones[tone]}`}>
      {children}
    </span>
  );
}

/** Smooth area chart — data normalised, stroke width kept constant. */
export function MockAreaChart({
  data,
  height = 96,
  id = "area",
}: {
  data: number[];
  height?: number;
  id?: string;
}) {
  const max = Math.max(...data) * 1.15;
  const w = 100;
  const h = 34;
  const step = w / Math.max(1, data.length - 1);
  const points = data.map((v, i) => `${(i * step).toFixed(2)},${(h - (v / max) * h).toFixed(2)}`);
  const line = `M${points.join(" L")}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{ height }}
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#54dcc6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#54dcc6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#grad-${id})`} />
      <path
        d={line}
        pathLength={1}
        fill="none"
        stroke="#2ab8a0"
        strokeWidth={1.6}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="animate-[draw_1.5s_cubic-bezier(0.16,1,0.3,1)_both]"
        style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
      />
    </svg>
  );
}

/** Vertical bar chart with Persian labels under each column. */
export function MockBarChart({
  data,
  height = 110,
  unit,
}: {
  data: { label: string; value: number }[];
  height?: number;
  unit?: string;
}) {
  const max = Math.max(...data.map((d) => d.value)) * 1.1;
  return (
    <div className="flex items-end gap-2" style={{ height }} aria-hidden="true">
      {data.map((d, i) => (
        <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
          <span className="num text-[9px] font-bold text-slate-400">{toPersianDigits(d.value)}</span>
          <div
            className={`w-full origin-bottom rounded-t-md animate-[growY_0.9s_cubic-bezier(0.16,1,0.3,1)_both] ${
              i === data.length - 1 ? "bg-primary" : "bg-slate-200"
            }`}
            style={{
              height: `${Math.max(4, (d.value / max) * (height - 22))}px`,
              animationDelay: `${200 + i * 90}ms`,
            }}
          />
          <span className="text-[9px] text-slate-400">{d.label}</span>
        </div>
      ))}
      {unit ? <span className="sr-only">{unit}</span> : null}
    </div>
  );
}

/** Donut chart with a legend, drawn with stroke-dasharray segments. */
export function MockDonut({
  segments,
  center,
  centerLabel,
}: {
  segments: { label: string; value: number; color: string }[];
  center: string;
  centerLabel: string;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  // Cumulative start offset of every segment, computed before rendering.
  const offsets = segments.map((_, index) =>
    segments.slice(0, index).reduce((sum, s) => sum + s.value, 0),
  );

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 90 90" className="size-24 shrink-0" role="presentation" aria-hidden="true">
        <circle cx="45" cy="45" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="12" />
        {segments.map((s, index) => {
          const length = (s.value / total) * circumference;
          const dash = `${length} ${circumference - length}`;
          const rotation = -90 + (offsets[index] / total) * 360;
          return (
            <circle
              key={s.label}
              cx="45"
              cy="45"
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth="12"
              strokeDasharray={dash}
              strokeLinecap="butt"
              transform={`rotate(${rotation} 45 45)`}
            />
          );
        })}
        <text x="45" y="43" textAnchor="middle" className="fill-slate-800 text-[11px] font-black">
          {center}
        </text>
        <text x="45" y="55" textAnchor="middle" className="fill-slate-400 text-[7px]">
          {centerLabel}
        </text>
      </svg>
      <ul className="flex flex-1 flex-col gap-1.5">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center justify-between gap-2 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="size-2 rounded-sm" style={{ backgroundColor: s.color }} aria-hidden="true" />
              {s.label}
            </span>
            <span className="num font-bold text-slate-700">{toPersianDigits(Math.round((s.value / total) * 100))}٪</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
