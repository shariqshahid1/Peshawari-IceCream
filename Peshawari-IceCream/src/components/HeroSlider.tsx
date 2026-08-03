"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const slides = [
  {
    src: "/banners/banner-1.jpeg",
    alt: "Peshawari Ice Cream web banner",
  },
  {
    src: "/banners/banner-2.jpg",
    alt: "Peshawari Ice Cream new web banner",
  },
  {
    src: "/banners/banner-3.jpg",
    alt: "Peshawari Ice Cream mango banner",
  },
  {
    src: "/banners/banner-4.jpg",
    alt: "Peshawari Ice Cream heritage header banner",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const restart = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000,
    );
  };

  const go = (i: number) => {
    setIndex((i + slides.length) % slides.length);
    restart();
  };

  return (
    <section className="relative h-[80dvh] min-h-[500px] md:h-dvh md:min-h-[560px] w-full flex items-center justify-center overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            className="object-cover"
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}
      <div className="absolute inset-0 hero-gradient" />

      <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl mx-auto">
        <p className="text-tertiary font-label-lg font-bold text-lg md:text-label-lg tracking-[0.25em] mb-5 uppercase">
          Est. 1948
        </p>
        <h1 className="text-on-surface font-display-lg-mobile text-[46px] leading-[54px] md:text-display-lg md:leading-[72px] mb-8">
          Since 1948, Crafting Karachi&apos;s Most Loved Ice Cream.
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-primary text-white font-label-lg text-lg md:text-label-lg hover:bg-primary/90 transition-all shadow-xl active:scale-95"
          >
            Explore Flavours
          </Link>
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-white text-primary font-label-lg text-lg md:text-label-lg hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95"
          >
            Order Online
          </Link>
        </div>
      </div>

      <button
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-lg hover:bg-white transition-all active:scale-95"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
      >
        <Icon name="chevron_left" />
      </button>
      <button
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-lg hover:bg-white transition-all active:scale-95"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
      >
        <Icon name="chevron_right" />
      </button>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "w-8 bg-white" : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <Icon name="keyboard_arrow_down" className="text-white text-4xl" />
      </div>
    </section>
  );
}
