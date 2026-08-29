import Image from "next/image";
import type { CSSProperties } from "react";

type OrbitingLogosProps = {
  className?: string;
};

const orbitItems = [
  {
    src: "/images/spiner-logo-1.webp",
    alt: "ماژول نرم افزار",
    angle: 270,
  },
  {
    src: "/images/spiner-logo-2.webp",
    alt: "ماژول نرم افزار",
    angle: 342,
  },
  {
    src: "/images/spiner-logo-3.webp",
    alt: "ماژول نرم افزار",
    angle: 54,
  },
  {
    src: "/images/spiner-logo-4.webp",
    alt: "ماژول نرم افزار",
    angle: 126,
  },
  {
    src: "/images/spiner-logo-5.webp",
    alt: "ماژول نرم افزار",
    angle: 198,
  },
] as const;

function getOrbitPosition(angle: number, radiusPercent: number) {
  const radians = (angle * Math.PI) / 180;

  return {
    left: `${50 + Math.cos(radians) * radiusPercent}%`,
    top: `${50 + Math.sin(radians) * radiusPercent}%`,
    transform: "translate(-50%, -50%)",
  } as CSSProperties;
}

export default function OrbitingLogos({ className = "" }: OrbitingLogosProps) {
  return (
    <div
      className={`relative flex aspect-square items-center justify-center ${className}`.trim()}
      style={{ width: "clamp(16.5rem, 72vw, 34rem)", maxWidth: "100%" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="heavy z-20 flex flex-col items-center justify-center rounded-full bg-primary text-center text-white"
          style={{
            boxSizing: "border-box",
            boxShadow: "0 18px 40px -20px rgba(15, 23, 42, 0.35)",
            width: "clamp(5.9rem, 24vw, 13rem)",
            height: "clamp(5.9rem, 24vw, 13rem)",
            paddingInline: "clamp(0.45rem, 1.7vw, 1.5rem)",
            fontSize: "clamp(0.68rem, 1.7vw, 1.35rem)",
            lineHeight: 1.2,
            gap: "0.15rem",
          }}
        >
          <span className="whitespace-nowrap" style={{ fontSize: "1.15em", lineHeight: 1.15 }}>
            نواتیک
          </span>
          <span
            className="whitespace-nowrap"
            style={{ fontSize: "0.8em", opacity: 0.92, fontWeight: 500 }}
          >
            دستیار هوشمند
          </span>
        </div>
      </div>

      <div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{
          animation: "orbit-spin 10s linear infinite",
        }}
      >
        {orbitItems.map((item, index) => (
          <div
            key={item.src}
            className="absolute left-1/2 top-1/2"
            style={getOrbitPosition(item.angle, 30)}
          >
            <div
              className="z-10 overflow-hidden rounded-full border border-gray-100 bg-white"
              style={{
                width: "clamp(3.5rem, 14vw, 5rem)",
                height: "clamp(3.5rem, 14vw, 5rem)",
                animation: "orbit-spin-reverse 10s linear infinite",
                boxShadow:
                  "0 6px 16px -6px rgba(15, 23, 42, 0.14), 0 2px 6px -2px rgba(15, 23, 42, 0.08)",
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={80}
                height={80}
                sizes="(max-width: 768px) 56px, 80px"
                className="w-full h-full object-cover"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 409 409"
          className="h-full w-full"
          style={{ width: "84%", height: "84%" }}
        >
          <circle
            cx="204.5"
            cy="204.5"
            r="202.5"
            stroke="#000"
            strokeDasharray="6 16"
            strokeLinecap="round"
            strokeOpacity="0.1"
            strokeWidth="2"
          ></circle>
        </svg>
      </div>
    </div>
  );
}
