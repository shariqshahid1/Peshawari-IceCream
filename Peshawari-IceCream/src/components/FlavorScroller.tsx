"use client";

import { useRef } from "react";
import Icon from "./Icon";

export default function FlavorScroller({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex gap-4 mb-2">
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
      <div className="flex gap-8 overflow-x-auto px-margin-mobile md:px-margin-desktop pb-12 scroll-hide" ref={trackRef}>
        {children}
      </div>
    </>
  );
}
