"use client";

import { useRef } from "react";
import Icon from "./Icon";

type FlavorScrollerProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
};

export default function FlavorScroller({ header, children }: FlavorScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  return (
    <>
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 text-center sm:text-left">
        {header && <div>{header}</div>}
        <div className="flex gap-4 shrink-0 justify-center sm:justify-start">
          <button
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
          >
            <Icon name="chevron_left" />
          </button>
          <button
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
          >
            <Icon name="chevron_right" />
          </button>
        </div>
      </div>
      <div className="flex gap-6 md:gap-8 overflow-x-auto px-margin-mobile md:px-margin-desktop pb-4 scroll-hide" ref={trackRef}>
        {children}
      </div>
    </>
  );
}
