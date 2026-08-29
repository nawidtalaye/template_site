"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

export default function SoftwareSolutionsFaq({
  items,
}: {
  items: FaqItem[];
}) {
  const [activeFaq, setActiveFaq] = useState(0);
  const panelId = useId();

  return (
    <div className="flex flex-col gap-6">
      {items.map((item, index) => {
        const isOpen = activeFaq === index;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-3xl border border-gray-100 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
          >
            <button
              type="button"
              onClick={() => setActiveFaq(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              aria-controls={`${panelId}-${index}`}
              className={`flex w-full items-center justify-between gap-6 p-8 text-right transition-all ${
                isOpen ? "bg-primary/5" : "bg-white"
              }`}
            >
              <span
                className={`bold text-lg transition-colors md:text-xl ${
                  isOpen ? "text-primary" : "text-gray-900"
                }`}
              >
                {item.question}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`size-6 shrink-0 transition-transform duration-500 ${
                  isOpen ? "rotate-180 text-primary" : "text-gray-400"
                }`}
              />
            </button>
            {/* The panel stays mounted and is collapsed with `hidden` rather
                than being conditionally rendered. Only the open item used to
                reach the HTML, so four of the five answers never appeared in
                the markup Google reads. `hidden` resolves to display:none, so
                the collapsed look is identical and the fade-up animation still
                restarts each time the panel is shown. */}
            <div
              id={`${panelId}-${index}`}
              role="region"
              hidden={!isOpen}
              className="animate-fade-up border-t border-gray-50 bg-white p-8 text-base leading-[1.8] text-gray-600 md:text-lg"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
