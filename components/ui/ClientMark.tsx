/** Abstract placeholder marks — swap them for real client logos later. */
const shapes = [
  <circle key="a" cx="24" cy="24" r="19" />,
  <rect key="b" x="5" y="5" width="38" height="38" rx="9" transform="rotate(45 24 24)" />,
  <path key="c" d="M24 4 L42 14.5 V33.5 L24 44 L6 33.5 V14.5 Z" />,
  <path key="d" d="M4 24 a20 20 0 0 1 40 0 a20 20 0 0 1 -40 0 M14 24 a10 10 0 0 1 20 0 a10 10 0 0 1 -20 0" />,
  <path key="e" d="M5 40 L24 6 L43 40 Z" />,
  <path key="f" d="M6 12 h36 v24 h-36 Z M12 12 v24 M24 12 v24 M30 12 v24" />,
];

export default function ClientMark({ index, monogram }: { index: number; monogram: string }) {
  const shape = shapes[index % shapes.length];

  return (
    <svg viewBox="0 0 48 48" className="size-12" role="presentation" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        {shape}
      </g>
      <text
        x="24"
        y="27.5"
        textAnchor="middle"
        className="fill-current text-[11px] font-black"
        style={{ stroke: "none" }}
      >
        {monogram}
      </text>
    </svg>
  );
}
