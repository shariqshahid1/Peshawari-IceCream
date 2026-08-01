import type { Metadata } from "next";
import MenuContent from "@/components/MenuContent";

export const metadata: Metadata = {
  title: "Menu | Peshawari Ice Cream",
  description:
    "Explore our artisanal menu of ice creams, kulfis, faloodas, and more. Crafted since 1948.",
};

export default function MenuPage() {
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 md:pt-32 pb-section-gap">
      {/* Header Section */}
      <header className="mb-16 text-center max-w-2xl mx-auto">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
          Our Artisanal Menu
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant opacity-80 italic">
          Since 1948, crafting timeless frozen delights with the finest
          ingredients and ancestral recipes.
        </p>
      </header>

      <MenuContent />

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 bg-primary text-on-primary w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40 group">
        <IconChat />
      </button>
    </main>
  );
}

function IconChat() {
  return (
    <>
      <span className="material-symbols-outlined text-3xl">chat_bubble</span>
      <span className="absolute right-20 bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
        Questions? Chat with us
      </span>
    </>
  );
}
