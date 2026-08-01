"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { useCart } from "./CartProvider";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Story", href: "/story" },
  { label: "Menu", href: "/menu" },
  { label: "Specialities", href: "/specialities" },
  { label: "Locations", href: "/locations" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}
      <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary/10 transition-all duration-300 ${
        scrolled ? "py-2 shadow-md" : "py-4 shadow-sm"
      }`}
    >
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto">
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
          aria-label="Peshawari Ice Cream - Home"
        >
          <Image
            src="/official/logo.png"
            alt="Peshawari Ice Cream logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold hidden sm:inline">
            Peshawari Ice Cream
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              className={`relative font-label-lg text-label-lg after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full ${
                isActive(link.href)
                  ? "text-primary font-bold"
                  : "text-on-surface-variant"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            className="p-2 hover:bg-secondary-container/50 rounded-full transition-all duration-300 active:scale-95 text-primary"
            aria-label="Favorites"
          >
            <Icon name="favorite" />
          </button>
          <button
            className="relative p-2 hover:bg-secondary-container/50 rounded-full transition-all duration-300 active:scale-95 text-primary"
            aria-label="Shopping bag"
            onClick={openCart}
          >
            <Icon name="shopping_bag" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 bg-tertiary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
          <Link
            href="/account"
            className="p-2 hover:bg-secondary-container/50 rounded-full transition-all duration-300 active:scale-95 text-primary"
            aria-label="Account"
          >
            <Icon name="person" />
          </Link>
          <button
            className="md:hidden p-2 text-primary"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-primary/10 px-margin-mobile py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMobile}
              className={`block font-label-lg text-label-lg ${
                isActive(link.href)
                  ? "text-primary font-bold"
                  : "text-on-surface-variant"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
    </>
  );
}
