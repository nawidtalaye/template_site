/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { companyInfo } from "@/lib/site-content";

export default function StartReadySection() {
  return (
    <section className="mx-auto flex w-full justify-center overflow-hidden px-4 py-16 lg:py-20">
      <div className="w-full" style={{ maxWidth: 1040 }}>
        <div className="relative hidden w-full md:block" dir="rtl" style={{ height: 330 }}>
          <div
            className="absolute z-30"
            style={{ right: 0, top: "50%", width: 288, height: 288, transform: "translateY(-50%)" }}
          >
            <div className="absolute rounded-full border border-[#9fdcd6]" style={{ inset: 10 }}></div>
            <div className="absolute rounded-full border border-[#1d8180]" style={{ inset: 0 }}></div>
            <div
              className="absolute overflow-hidden rounded-full border-white bg-white"
              style={{ inset: 14, borderWidth: 12 }}
            >
              <img
                alt={`کارشناس پشتیبانی ${companyInfo.brandName}`}
                loading="lazy"
                className="h-full w-full object-cover"
                src="/images/novatech-support-agent.webp"
              />
            </div>

            <div className="absolute z-30" style={{ bottom: 26, right: -16 }}>
              <div
                className="relative overflow-hidden bg-[#ffd15b]"
                style={{ width: 148, height: 74, borderTopLeftRadius: 9999, borderTopRightRadius: 9999 }}
              >
                <div
                  className="absolute rounded-full border-white"
                  style={{ bottom: -24, left: 22, width: 84, height: 84, borderWidth: 20 }}
                ></div>
                <div
                  className="absolute rounded-full bg-[#4c5666]"
                  style={{ bottom: -2, right: 16, width: 50, height: 50 }}
                ></div>
              </div>
            </div>
          </div>

          <div
            className="absolute overflow-hidden"
            style={{
              left: 0,
              top: "50%",
              width: 790,
              height: 250,
              transform: "translateY(-50%)",
              borderRadius: 12,
              backgroundColor: "#1d8180",
            }}
          >
            <div className="absolute inset-0">
              <div className="absolute rounded-full bg-white" style={{ left: -44, top: -40, width: 152, height: 152 }}></div>
              <div
                className="absolute rounded-full border bg-white"
                style={{ left: 40, top: 28, width: 84, height: 84, borderWidth: 18, borderColor: "#1d8180" }}
              ></div>
              <div className="absolute rounded-full bg-white" style={{ left: 16, top: 140, width: 26, height: 26 }}></div>
              <div className="absolute rounded-full bg-white" style={{ left: 60, top: 178, width: 8, height: 8 }}></div>
              <div
                className="absolute rounded-full bg-white"
                style={{ right: -122, top: "50%", width: 316, height: 316, transform: "translateY(-50%)" }}
              ></div>
            </div>

            <div
              className="absolute z-20 flex flex-col items-center justify-center text-center"
              style={{ top: 0, bottom: 0, left: 104, right: 214 }}
            >
              <div className="flex items-end justify-center gap-1 text-white">
                <span className="light leading-none" style={{ fontSize: 34, paddingBottom: 2 }}>آماده اید؟</span>
                <strong className="heavy leading-none" style={{ fontSize: 48 }}>برای شروع</strong>
              </div>

              <img
                src="/images/signature2.png"
                alt=""
                aria-hidden="true"
                width="129"
                height="18"
                loading="lazy"
                decoding="async"
                className="mt-2 opacity-95"
                style={{ width: 142, height: "auto" }}
              />

              <p className="mt-4 max-w-[430px] text-white" style={{ fontSize: 17, lineHeight: 2, fontWeight: 500 }}>
                کارشناسان ما به صورت رایگان شما را به بهترین راهکار هدایت خواهند کرد
              </p>

              <Link href="/contact" className="mt-6 inline-block">
                <div
                  className="flex items-center justify-between rounded-full bg-white transition-transform duration-300 hover:scale-105"
                  style={{ minWidth: 250, padding: "7px 32px 7px 7px", boxShadow: "0 10px 22px rgba(0,0,0,0.14)" }}
                >
                  <span className="mr-4 font-bold text-[#1d8180]" style={{ fontSize: 16 }}>همین حالا اقدام کنید</span>
                  <div className="flex shrink-0 items-center justify-center rounded-full bg-[#d9f2ee]" style={{ width: 44, height: 44 }}>
                    <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" className="text-[#1d8180] text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex flex-col items-center md:hidden" dir="rtl" style={{ maxWidth: 430 }}>
          <div className="relative z-20 mb-[-42px]" style={{ width: 196, height: 196 }}>
            <div className="absolute rounded-full border border-[#9fdcd6]" style={{ inset: 8 }}></div>
            <div className="absolute rounded-full border border-[#1d8180]" style={{ inset: 0 }}></div>
            <div
              className="absolute overflow-hidden rounded-full border-white bg-white"
              style={{ inset: 12, borderWidth: 10 }}
            >
              <img
                alt={`کارشناس پشتیبانی ${companyInfo.brandName}`}
                loading="lazy"
                className="h-full w-full object-cover"
                src="/images/novatech-support-agent.webp"
              />
            </div>
            <div className="absolute z-30" style={{ bottom: 10, right: -8 }}>
              <div
                className="relative overflow-hidden bg-[#ffd15b]"
                style={{ width: 104, height: 50, borderTopLeftRadius: 9999, borderTopRightRadius: 9999 }}
              >
                <div
                  className="absolute rounded-full border-white"
                  style={{ bottom: -18, left: 14, width: 60, height: 60, borderWidth: 14 }}
                ></div>
                <div className="absolute rounded-full bg-[#4c5666]" style={{ bottom: -2, right: 10, width: 36, height: 36 }}></div>
              </div>
            </div>
          </div>

          <div
            className="relative w-full overflow-hidden text-center"
            style={{ backgroundColor: "#1d8180", borderRadius: 24, padding: "72px 24px 32px", boxShadow: "0 16px 30px rgba(29,129,128,0.20)" }}
          >
            <div className="absolute rounded-full bg-white" style={{ left: -22, top: -22, width: 92, height: 92 }}></div>
            <div
              className="absolute rounded-full border bg-white"
              style={{ left: 22, top: 18, width: 52, height: 52, borderWidth: 12, borderColor: "#1d8180" }}
            ></div>
            <div className="absolute rounded-full bg-white" style={{ left: 18, top: 112, width: 18, height: 18 }}></div>
            <div className="absolute rounded-full bg-white" style={{ left: 48, top: 144, width: 6, height: 6 }}></div>

            <div className="relative z-20 flex flex-col items-center">
              <div className="flex items-end justify-center gap-1 text-white">
                <span className="light leading-none" style={{ fontSize: 26 }}>آماده اید؟</span>
                <strong className="heavy leading-none" style={{ fontSize: 34 }}>برای شروع</strong>
              </div>

              <img
                src="/images/signature2.png"
                alt=""
                aria-hidden="true"
                width="129"
                height="18"
                loading="lazy"
                decoding="async"
                className="mt-2 opacity-95"
                style={{ width: 110, height: "auto" }}
              />

              <p className="mt-4 text-white" style={{ fontSize: 14, lineHeight: 2, fontWeight: 500 }}>
                کارشناسان ما به صورت رایگان شما را به بهترین راهکار هدایت خواهند کرد
              </p>

              <Link href="/contact" className="mt-6 inline-block">
                <div
                  className="flex items-center justify-between rounded-full bg-white shadow-lg transition-transform duration-300 hover:scale-105"
                  style={{ minWidth: 230, padding: "6px 24px 6px 6px" }}
                >
                  <span className="mr-4 font-bold text-[#1d8180]" style={{ fontSize: 14 }}>همین حالا اقدام کنید</span>
                  <div className="flex shrink-0 items-center justify-center rounded-full bg-[#d9f2ee]" style={{ width: 40, height: 40 }}>
                    <svg stroke="currentColor" fill="none" strokeWidth="2.5" viewBox="0 0 24 24" className="text-[#1d8180] text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
