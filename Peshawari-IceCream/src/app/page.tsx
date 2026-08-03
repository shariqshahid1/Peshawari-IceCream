import Image from "next/image";
import { IMG } from "@/lib/images";
import { products, getProduct } from "@/lib/products";
import FlavorScroller from "@/components/FlavorScroller";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import NewsletterForm from "@/components/NewsletterForm";
import Icon from "@/components/Icon";

const signatureSlugs = [
  "peshawari",
  "kulfa-falooda",
  "zafran-almond-roasted",
  "injeer",
];

const signatureFlavours = signatureSlugs
  .map((slug) => getProduct(slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const gallery = [
  {
    src: IMG.gallery1,
    alt: "A happy family sharing a large bowl of ice cream",
    aspect: "aspect-[4/5]",
  },
  {
    src: IMG.gallery2,
    alt: "Several ice cream scoops arranged on a white stone surface",
    aspect: "aspect-square",
  },
  {
    src: IMG.gallery3,
    alt: "Fresh thick cream being poured into a traditional mixing vat",
    aspect: "aspect-[3/4]",
  },
  {
    src: IMG.gallery4,
    alt: "A stylish couple enjoying ice cream cones at golden hour",
    aspect: "aspect-[4/5]",
  },
  {
    src: IMG.gallery5,
    alt: "Silver leaf being delicately applied to a dessert",
    aspect: "aspect-square",
  },
  {
    src: IMG.gallery6,
    alt: "Artistic flat lay of Peshawari ice cream containers",
    aspect: "aspect-[4/3]",
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

const locations = [
  {
    name: "Peshawari Ice Cream Char Minar",
    address: "Main Char Minar Chowrangi, Bahadurabad, Karachi, Pakistan",
    hours: "Open Daily",
    phone: "021 33321444",
  },
];

export default function Home() {
  const bestSellers = products.filter((p) =>
    ["peshawari", "kulfa-falooda", "zafran-almond-roasted"].includes(p.slug),
  );

  return (
    <div>
      <HeroSlider />

      {/* Signature Flavours - Horizontal Scroll */}
      <section
        className="bg-surface-container-low py-section-gap overflow-hidden"
        id="specialities"
      >
        <FlavorScroller
          header={
            <div>
              <span className="text-tertiary font-label-lg text-label-lg uppercase tracking-widest">
                The Icons
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">
                Signature Flavours
              </h2>
            </div>
          }
        >
          {signatureFlavours.map((flavour) => (
            <div key={flavour.slug} className="min-w-[280px] md:min-w-[400px] group">
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
      </section>

      {/* Heritage Story */}
      <section
        className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
        id="story"
      >
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
            <span className="text-tertiary font-label-lg text-label-lg uppercase tracking-widest">
              Our Legacy
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
              A Journey Through Time
            </h2>
            <p className="text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
              Born in the heart of historic Karachi, Peshawari Ice Cream began
              with a single vision: to create the most authentic, rich, and
              creamy frozen delights using only the finest ingredients sourced
              from the region.
            </p>            <div className="space-y-6 pt-4">
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Icon name="history" />
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm mb-1">
                    1948: The Genesis
                  </h4>
                  <p className="text-on-surface-variant">
                    Our first scoop set a standard of quality that remains
                    unchanged today.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Icon name="family_history" />
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm mb-1">
                    Family Tradition
                  </h4>
                  <p className="text-on-surface-variant">
                    Three generations of family expertise preserving the secret
                    recipes that make our flavors unique.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Icon name="cloud_upload" />
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm mb-1">
                    Handmade Recipes
                  </h4>
                  <p className="text-on-surface-variant">
                    Continuing the artisanal method of slow-churning to ensure
                    every bite is perfectly dense and creamy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section
        className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
        id="menu"
      >
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

      {/* Experience Gallery */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <span className="text-tertiary font-label-lg text-label-lg uppercase tracking-widest">
            Moments
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">
            The Peshawari Experience
          </h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {gallery.map((img) => (
            <div
              key={img.src}
              className="break-inside-avoid rounded-[24px] overflow-hidden border border-primary/10 ambient-shadow"
            >
              <Image
                className={`w-full object-cover ${img.aspect}`}
                src={img.src}
                alt={img.alt}
                width={600}
                height={700}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-section-gap bg-surface-container" id="locations">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <span className="text-tertiary font-label-lg text-label-lg uppercase tracking-widest">
              Visit Us
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
              Find Your Nearest Haven
            </h2>
            <div className="space-y-6">
              {locations.map((loc) => (
                <div
                  key={loc.name}
                  className="glass-panel p-8 rounded-[24px] border border-primary/10 ambient-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary mb-2">
                        {loc.name}
                      </h4>
                      <p className="text-on-surface-variant font-body-md">
                        {loc.address}
                      </p>
                      <p className="text-primary font-bold mt-4">{loc.hours}</p>
                      {loc.phone && (
                        <a
                          href="tel:+922133321444"
                          className="text-on-surface-variant font-body-md mt-1 inline-flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <Icon name="call" className="text-sm" />
                          {loc.phone}
                        </a>
                      )}
                    </div>
                    <Icon name="directions" className="text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] overflow-hidden border border-primary/10 ambient-shadow h-[320px] md:h-[500px]">
            <Image
              className="w-full h-full object-cover"
              src={IMG.map}
              alt="Stylized map of Karachi showing Peshawari Ice Cream branches"
              width={640}
              height={500}
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
        id="contact"
      >
        <div className="relative rounded-[32px] overflow-hidden bg-primary p-12 md:p-24 text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="font-headline-lg text-headline-lg text-white">
              Join Our Inner Circle
            </h2>
            <p className="text-on-primary-container font-body-lg">
              Get exclusive access to new seasonal flavors and special
              invitations to our tasting events.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
