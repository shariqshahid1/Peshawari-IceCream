import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Our Story | Peshawari Ice Cream",
  description:
    "Since 1948, three generations of family expertise crafting Karachi's most loved ice cream with only the finest ingredients.",
};

const milestones = [
  {
    icon: "history",
    title: "1948: The Genesis",
    description:
      "Our first scoop set a standard of quality that remains unchanged today — rich, creamy, and made with only the finest ingredients.",
  },
  {
    icon: "family_history",
    title: "Family Tradition",
    description:
      "Generations of family expertise preserving the secret recipes that make our flavors unique.",
  },
  {
    icon: "cloud_upload",
    title: "Handmade Recipes",
    description:
      "Continuing the artisanal method of slow-churning to ensure every bite is perfectly dense and creamy.",
  },
];

const ingredients = [
  {
    icon: "water_drop",
    title: "Fresh Milk",
    description: "Sourced daily from local organic farms.",
  },
  {
    icon: "eco",
    title: "Pistachios",
    description: "Hand-selected premium Iranian nuts.",
  },
  {
    icon: "shutter_speed",
    title: "Pure Saffron",
    description: "The world's finest Grade A Kashmiri saffron.",
  },
  {
    icon: "favorite",
    title: "Zero Additives",
    description: "No artificial colors, flavors, or preservatives.",
  },
];

export default function StoryPage() {
  return (
    <main>
      {/* Page Header */}
      <section className="pt-28 md:pt-36 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <span className="text-tertiary font-label-lg text-label-lg uppercase tracking-[0.3em]">
          Our Legacy
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight mt-4">
          A Journey Through Time
        </h1>
        <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl mx-auto mt-6">
          Born in the heart of historic Karachi, Peshawari Ice Cream began with
          a single vision: to create the most authentic, rich, and creamy
          frozen delights using only the finest ingredients sourced from the
          region.
        </p>
      </section>

      {/* Story Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-[24px] overflow-hidden aspect-[4/5] border border-primary/10 ambient-shadow">
              <Image
                className="w-full h-full object-cover"
                src={IMG.story}
                alt="The original 1948 Peshawari Ice Cream shop blended with modern ingredients"
                width={640}
                height={800}
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 glass-panel rounded-full flex items-center justify-center border border-primary/10 shadow-lg hidden md:flex">
              <div className="text-center">
                <p className="font-headline-md text-primary text-headline-md">
                  75+
                </p>
                <p className="font-label-md text-on-surface-variant">
                  Years of Heritage
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
              A Legacy Worth Savoring
            </h2>
            <p className="text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
              What began as a single vision has grown into a beloved Karachi
              institution — now served from our home at Char Minar Chowrangi,
              Bahadurabad, where every recipe, every technique, and every
              standard remains exactly as it was the day we started.
            </p>
            <div className="space-y-6 pt-4">
              {milestones.map((item) => (
                <div key={item.title} className="flex gap-6 items-start group">
                  <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <Icon name={item.icon} />
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-on-surface-variant">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pure Ingredients */}
      <section className="py-section-gap relative overflow-hidden bg-inverse-surface">
        <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center text-white">
          <span className="text-tertiary-fixed-dim font-label-lg text-label-lg uppercase tracking-[0.3em]">
            Pure by Nature
          </span>
          <h2 className="font-headline-lg text-headline-lg mt-6 mb-16">
            The Secret is in the Source
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {ingredients.map((item) => (
              <div key={item.title} className="space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
                  <Icon
                    name={item.icon}
                    className="text-4xl text-tertiary-fixed-dim"
                  />
                </div>
                <h5 className="font-headline-sm text-headline-sm">
                  {item.title}
                </h5>
                <p className="text-white/60 text-label-md">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          Taste the Heritage
        </h2>
        <p className="text-on-surface-variant font-body-lg mt-4 mb-8">
          Experience the flavors that have delighted Karachi for over seven
          decades.
        </p>
        <Link
          href="/menu"
          className="inline-block px-10 py-4 rounded-full bg-primary text-white font-label-lg text-label-lg hover:bg-primary/90 transition-all shadow-xl active:scale-95"
        >
          Explore Flavours
        </Link>
      </section>
    </main>
  );
}
