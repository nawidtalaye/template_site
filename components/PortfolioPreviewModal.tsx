"use client";

import { useEffect, useRef } from "react";

export type PortfolioPreviewItem = {
  title: string;
  /**
   * Optional so the type matches a portfolio entry whose screenshots are not
   * published yet. The gallery only opens this modal for items that have an
   * image, so in practice a preview always has something to show.
   */
  img?: string;
  desktopImg?: string;
  mobileImg?: string;
  summary?: string;
};

type ViewMode = "desktop" | "mobile" | null;

type Props = {
  item: PortfolioPreviewItem;
  viewMode: ViewMode;
  onViewModeChange: (mode: Exclude<ViewMode, null>) => void;
  onClose: () => void;
};

/**
 * Preview dialog shared by the home slider and the portfolio page. Markup is the
 * one that already shipped on both pages; what is new is that it behaves like a
 * dialog: Escape closes it, the toggles are real buttons, focus moves into it and
 * the page behind it stops scrolling.
 */
export default function PortfolioPreviewModal({
  item,
  viewMode,
  onViewModeChange,
  onClose,
}: Props) {
  const previewScrollRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  useEffect(() => {
    previewScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [viewMode]);

  // Gentle auto-scroll through the screenshot, skipped for reduced-motion users.
  useEffect(() => {
    const scrollElement = previewScrollRef.current;
    if (!viewMode || !scrollElement) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;
    const timeoutId = setTimeout(() => {
      const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
      if (maxScroll <= 0) return;

      intervalId = setInterval(() => {
        if (scrollElement.scrollTop >= maxScroll) {
          if (intervalId) clearInterval(intervalId);
          return;
        }
        scrollElement.scrollTop = Math.min(scrollElement.scrollTop + 2, maxScroll);
      }, 16);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [viewMode, item]);

  const titleId = "portfolio-preview-title";

  return (
    <>
      <div
        className="bg-black bg-opacity-50 fixed z-40 inset-0 w-full h-full cursor-pointer flex"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="top-0 lg:top-8 bg-white h-screen lg:h-[95vh] xl:h-[92vh] overflow-y-auto lg:overflow-y-hidden 2xl:h-[91vh] max-w-screen-xl w-screen lg:w-auto lg:mx-auto fixed right-0 left-0 z-50 lg:inset-x-44 lg:rounded-2xl lg:overflow-hidden transition-all duration-300"
      >
        <div className="relative">
          <div className="flex px-7 py-2 sticky inset-x-0 z-20 border-b top-0 bg-white justify-between items-center">
            <span id={titleId} className="heavy text-lg text-[#242A32] leading-[30px]">
              {item.title}
            </span>
            <button
              type="button"
              ref={closeButtonRef}
              aria-label="بستن پیش نمایش"
              className="border p-2 cursor-pointer hover:text-red-600 duration-300 rounded-full"
              onClick={onClose}
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 15 15"
                aria-hidden="true"
                className="text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>

          <div className="px-7 gap-3 flex h-full flex-col mt-4">
            {!viewMode && <div className="border-t-[1px] border-[#E5E5E599]"></div>}
            {!viewMode && item.summary && (
              <p className="text-sm leading-7 text-gray-600">{item.summary}</p>
            )}
            {!viewMode && <span className="medium">ابتدا حالت نمایش را مشخص کنید</span>}

            <div className="flex flex-col gap-5 md:grid md:grid-cols-2 mb-[10px]">
              <button
                type="button"
                onClick={() => onViewModeChange("mobile")}
                aria-pressed={viewMode === "mobile"}
                className={`flex-row cursor-pointer items-center group justify-between hover:bg-primary hover:text-white flex border rounded-xl p-[14px] w-full transition-all duration-300 ${
                  viewMode === "mobile" ? "bg-primary text-white" : ""
                }`}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="flex w-[26px] h-fit"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"></path>
                </svg>
                <span className="flex">مشاهده حالت موبایل</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                  className={`flex duration-300 transition-all ${viewMode === "mobile" ? "-rotate-90" : ""}`}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
                </svg>
              </button>

              <button
                type="button"
                onClick={() => onViewModeChange("desktop")}
                aria-pressed={viewMode === "desktop"}
                className={`flex-row cursor-pointer items-center group justify-between hover:bg-primary hover:text-white flex border rounded-xl p-[14px] w-full transition-all duration-300 ${
                  viewMode === "desktop" ? "bg-primary text-white" : ""
                }`}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                  className="flex w-[26px] h-fit"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M352 442.2c-.3-2.2-2-3.9-4.2-4.3l-22.3-1.9c-11.8-3.1-20.5-16.2-22.3-28.3L302 400h-92l-1.2 7.6c-1.9 12.1-10.5 25.2-22.3 28.3l-22.3 1.9c-2.1.5-3.9 2.2-4.2 4.3-.4 3.1 2 5.8 5.1 5.8h181.8c3 .1 5.5-2.6 5.1-5.7zM472.9 71c-4.5-4.5-10.7-7-17-7H56.2c-6.4 0-12.5 2.5-17 7S32 81.7 32 88v272c0 6.4 2.7 12.5 7.2 17s10.5 7 16.8 7h400c6.4 0 12.3-2.5 16.8-7s7.2-10.7 7.2-17V88c.1-6.3-2.6-12.5-7.1-17zM256 360c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm203.9-40H52.2c-2.2 0-4-1.8-4-4V92c0-6.6 5.4-12 12-12h391.7c6.6 0 12 5.4 12 12v224c0 2.2-1.8 4-4 4z"></path>
                </svg>
                <span className="flex">مشاهده حالت دسکتاپ</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                  className={`flex duration-300 transition-all ${viewMode === "desktop" ? "-rotate-90" : ""}`}
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path>
                </svg>
              </button>
            </div>

            {viewMode && (
              <div
                ref={previewScrollRef}
                className="w-full md:col-span-2 mb-[20px] overflow-y-auto"
                style={{ height: "54vh" }}
              >
                <div
                  className={
                    viewMode === "mobile"
                      ? "w-full mx-auto border-[6px] border-black rounded-[30px] overflow-hidden bg-white"
                      : "w-full max-w-[920px] mx-auto rounded-xl overflow-hidden"
                  }
                  style={viewMode === "mobile" ? { maxWidth: 180 } : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={
                      viewMode === "mobile"
                        ? `نمای موبایل ${item.title}`
                        : `نمای دسکتاپ ${item.title}`
                    }
                    src={
                      viewMode === "mobile"
                        ? item.mobileImg || item.img
                        : item.desktopImg || item.img
                    }
                    className="block w-full h-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
