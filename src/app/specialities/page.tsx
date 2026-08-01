import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products, getProduct } from "@/lib/products";
import FlavorScroller from "@/components/FlavorScroller";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Specialities | Peshawari Ice Cream",
  description:
    "Our signature flavours and beloved classics — the icons of Peshawari Ice Cream since 1948.",
};

const signatureSlugs = [
  "peshawari-surprise",
  "kulfa-falooda",
  "zafran-falooda",
  "mango-special-bowl",
];

const signatureFlavours = signatureSlugs
  .map((slug) => getProduct(slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function SpecialitiesPage() {
  const bestSellers = products.filter((p) =>
    ["peshawari", "kulfa-falooda", "zafran-almond-roasted"].includes(p.slug),
  );

  return (
    <main>
      {/* Page Header */}
      <section className="pt-28 md:pt-36 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <span className="text-tertiary font-label-lg text-label-lg uppercase tracking-[0.3em]">
          The Icons
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight mt-4">
          Our Signature Specialities
        </h1>
        <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl mx-auto mt-6">
          A curated selection of the flavours that made us famous — each one
          handcrafted, slow-churned, and loved across generations.
        </p>
      </section>

      {/* Signature Flavours - Horizontal Scroll */}
      <section className="bg-surface-container-low py-section-gap overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-12 flex justify-between items-end">
          <div>
            <span className="text-tertiary font-label-lg text-label-lg uppercase tracking-widest">
              The Icons
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">
              Signature Flavours
            </h2>
          </div>
          <FlavorScroller>
            {signatureFlavours.map((flavour) => (
              <div
                key={flavour.slug}
                className="min-w-[280px] md:min-w-[400px] group"
              >
                <div className="rounded-[24px] overflow-hidden aspect-square border border-primary/10 ambient-shadow mb-6 relative">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={flavour.image}
                    alt={flavour.name}
                    width={400}
                    height={400}
                  />
                  {flavour.tag && (
                    <div className="absolute bottom-4 right-4 glass-panel px-4 py-2 rounded-full border border-white/30 text-primary font-label-lg">
                      {flavour.tag}
                    </div>
                  )}
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  {flavour.name}
                </h3>
                <p className="text-on-surface-variant font-body-md mt-2">
                  {flavour.tagline}
                </p>
              </div>
            ))}
          </FlavorScroller>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-tertiary font-label-lg text-label-lg uppercase tracking-widest">
            Our Selection
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-4">
            Beloved Classics
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6 diamond-divider text-tertiary opacity-50">
            <Icon name="diamond" className="text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <Link
          href="/menu"
          className="inline-block px-10 py-4 rounded-full bg-primary text-white font-label-lg text-label-lg hover:bg-primary/90 transition-all shadow-xl active:scale-95"
        >
          View Full Menu
        </Link>
      </section>
    </main>
  );
}
