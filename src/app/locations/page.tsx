import type { Metadata } from "next";
import Image from "next/image";
import { IMG } from "@/lib/images";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Locations | Peshawari Ice Cream",
  description:
    "Visit the Peshawari Ice Cream Char Minar branch at Main Char Minar Chowrangi, Bahadurabad, Karachi.",
};

const locations = [
  {
    name: "Peshawari Ice Cream Char Minar",
    address: "Main Char Minar Chowrangi, Bahadurabad, Karachi, Pakistan",
    hours: "Open Daily",
    phone: "+92 21 33321444",
    phoneHref: "tel:+922133321444",
  },
];

export default function LocationsPage() {
  return (
    <main>
      {/* Page Header */}
      <section className="pt-28 md:pt-36 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <span className="text-tertiary font-label-lg text-label-lg uppercase tracking-[0.3em]">
          Visit Us
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight mt-4">
          Find Your Nearest Haven
        </h1>
        <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl mx-auto mt-6">
          From our heritage home in Saddar to our flagship at Char Minar
          Chowrangi, Bahadurabad — there&apos;s always a Peshawari scoop waiting
          for you.
        </p>
      </section>

      {/* Branches + Map */}
      <section className="py-section-gap bg-surface-container">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            {locations.map((loc, index) => (
              <div
                key={loc.name}
                className="glass-panel p-8 rounded-[24px] border border-primary/10 ambient-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <Icon name="directions" className="text-primary" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-2">
                  {loc.name}
                </h3>
                <p className="text-on-surface-variant font-body-md">
                  {loc.address}
                </p>
                <div className="mt-4 flex flex-col gap-1 text-on-surface-variant font-label-md">
                  <span className="text-primary font-bold">{loc.hours}</span>
                  <a href={loc.phoneHref} className="hover:text-primary transition-colors">
                    {loc.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[24px] overflow-hidden border border-primary/10 ambient-shadow h-[320px] md:h-[500px] sticky top-32">
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

      {/* Hours Banner */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="relative rounded-[32px] overflow-hidden bg-primary p-12 md:p-16 text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Icon name="schedule" className="text-white text-4xl" />
            <h2 className="font-headline-lg text-headline-lg text-white">
              Late-Night Cravings Welcome
            </h2>
            <p className="text-on-primary-container font-body-lg">
              Every branch stays open late — because great ice cream has no
              curfew. Order ahead for pickup or delivery.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
