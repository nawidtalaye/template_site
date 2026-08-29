/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

import PortfolioPreviewModal from "@/components/PortfolioPreviewModal";
import data from "@/lib/portfolio-data.json";

export type PortfolioItem = {
  kind: "software" | "website";
  title: string;
  /**
   * Absent for a delivered system whose screenshots are not cleared for
   * publication. The card then shows a labelled frame instead of borrowing an
   * unrelated system's image, and the preview button is not offered.
   */
  img?: string;
  desktopImg?: string;
  mobileImg?: string;
  category: string;
  location: string;
  link: string;
  previewLabel?: string;
  linkLabel?: string;
  imageAlt?: string;
  summary?: string;
  /** Present when the project has a crawlable case-study page. */
  caseStudySlug?: string;
};

const portfolioData = data as PortfolioItem[];

/**
 * The systems Novatech builds are not "website samples", so the page is grouped:
 * operational software first, then the websites.
 */
const groups = [
  {
    id: "software-systems",
    heading: "سامانه ها و نرم افزارهای اختصاصی",
    intro:
      "سیستم های عملیاتی که برای مدیریت مالی، انبار، لجستیک، فروش و منابع انسانی ساخته و تحویل داده شده اند. هر مورد یک صفحه شرح کامل دارد.",
    items: portfolioData.filter((item) => item.kind === "software"),
  },
  {
    id: "websites",
    heading: "وب سایت ها",
    intro:
      "وب سایت های شرکتی، فروشگاهی و خدماتی که طراحی و پیاده سازی شده اند.",
    items: portfolioData.filter((item) => item.kind === "website"),
  },
];

export default function PortfolioGallery() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile" | null>(null);

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setViewMode(null);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setViewMode(null);
  };

  return (
    <>
      {groups.map((group) => (
        <section
          key={group.id}
          aria-labelledby={`${group.id}-title`}
          className="mt-20 first:mt-20"
        >
          <div className="mx-[30px] lg:mx-[130px] flex flex-col gap-3">
            <h2 id={`${group.id}-title`} className="text-[26px] md:text-3xl heavy">
              {group.heading}
            </h2>
            <p className="leading-8 text-gray-600 max-w-3xl">{group.intro}</p>
          </div>
          <div className="grid mt-10 mb-10 gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-[30px] lg:mx-[130px]">
            {group.items.map((item, i) => (
              <div
                key={i}
                className="border lg:hover:shadow-xl group duration-300 over rounded-2xl p-5"
              >
                <div
                  className="rounded-2xl cursor-pointer mb-4 overflow-hidden"
                  style={{ height: 220 }}
                >
                  {item.img ? (
                    <img
                      alt={item.imageAlt ?? item.title}
                      loading="lazy"
                      width="700"
                      height="600"
                      decoding="async"
                      className="w-full h-full rounded-2xl object-cover object-top"
                      src={item.img}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-bg-light p-5 text-center">
                      <ImageIcon
                        className="size-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="text-xs leading-6 text-gray-500">
                        تصاویر این سیستم هنوز منتشر نشده است
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="bold text-[#242A32] my-2">
                  {item.caseStudySlug ? (
                    <Link
                      href={`/portfolio/${item.caseStudySlug}`}
                      className="transition-colors duration-300 hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                {item.summary ? (
                  <p className="text-sm leading-7 text-gray-500">{item.summary}</p>
                ) : null}
                <div className="flex my-4 w-full cursor-pointer flex-col gap-4 justify-center items-center">
                  <div className="flex w-full justify-between text-[#242A32]">
                    <div className="flex items-center gap-2">
                      <img
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        width="24"
                        height="24"
                        decoding="async"
                        src="/images/monitor.png"
                      />
                      <span className="medium">حوزه کاری:</span>
                    </div>
                    <span>{item.category}</span>
                  </div>
                  <div className="flex w-full justify-between text-[#242A32]">
                    <div className="flex items-center gap-2">
                      <img
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        width="24"
                        height="24"
                        decoding="async"
                        src="/images/location.png"
                      />
                      <span className="medium">لوکیشن مشتری:</span>
                    </div>
                    <span>{item.location}</span>
                  </div>
                </div>
                <div
                  className={`flex flex-col gap-[14px] group ${item.img ? "md:grid md:grid-cols-2" : ""}`}
                >
                  {item.img ? (
                    <button
                      type="button"
                      onClick={() => openModal(item)}
                      className="rounded-full lg:text-[12px] xl:text-base border hover:text-primary border-primary medium bg-primary hover:bg-white text-white duration-300 cursor-pointer flex w-full justify-center items-center h-[38px]"
                    >
                      {item.previewLabel || "مشاهده سایت"}
                    </button>
                  ) : null}
                  {item.caseStudySlug ? (
                    <Link
                      className="rounded-full xl:text-base lg:text-[12px] border text-primary border-primary medium hover:bg-primary hover:text-white duration-300 cursor-pointer flex justify-center items-center h-[38px]"
                      href={`/portfolio/${item.caseStudySlug}`}
                    >
                      شرح کامل پروژه
                    </Link>
                  ) : (
                    <a
                      className="rounded-full xl:text-base lg:text-[12px] border text-primary border-primary medium hover:bg-primary hover:text-white duration-300 cursor-pointer flex justify-center items-center h-[38px]"
                      rel="noopener noreferrer"
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      href={item.link}
                    >
                      {item.linkLabel || "مشاهده سایت زنده"}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {selectedItem && (
        <PortfolioPreviewModal
          item={selectedItem}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onClose={closeModal}
        />
      )}
    </>
  );
}
