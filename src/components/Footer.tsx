import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { IMG } from "@/lib/images";

const instagramImages = [
  { src: IMG.ig1, alt: "Peshawari cone against a clean white wall" },
  { src: IMG.ig2, alt: "Bowl of pista ice cream with artistic shadows" },
  { src: IMG.ig3, alt: "Saffron strands being sprinkled on ice cream" },
  { src: IMG.ig4, alt: "Vintage 1948 sign" },
  { src: IMG.ig5, alt: "Modern ice cream pint packaging on a marble table" },
  { src: IMG.ig6, alt: "Candid photo of a child eating ice cream" },
];

const brandContact = {
  phone: "021 33321444",
  phoneHref: "tel:+922133321444",
  email: "huzaifakhann@icloud.com",
  emailHref: "mailto:huzaifakhann@icloud.com",
  whatsapp: "0300 0212183",
  whatsappHref: "https://wa.me/923000212183",
  instagram: "https://www.instagram.com/peshawaricecreamofficial/",
  facebook: "https://www.facebook.com/peshawaricecreamofficial",
};

export default function Footer() {
  return (
    <footer className="bg-inverse-surface py-section-gap w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop w-full max-w-container-max mx-auto text-on-primary-fixed">
        <div className="space-y-6">
          <Link href="/" className="block" aria-label="Peshawari Ice Cream - Home">
            <Image
              src="/official/logo.png"
              alt="Peshawari Ice Cream logo"
              width={72}
              height={72}
              className="h-18 w-18 object-contain"
            />
          </Link>
          <p className="text-secondary-fixed-dim text-body-md">
            Serving since 1948 — from Saddar to Bahadurabad. A legacy of taste,
            purity, and tradition in every scoop.
          </p>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-tertiary-fixed-dim hover:bg-white/10 transition-all"
              href={brandContact.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Icon name="public" className="text-sm" />
            </a>
            <a
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-tertiary-fixed-dim hover:bg-white/10 transition-all"
              href={brandContact.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Icon name="share" className="text-sm" />
            </a>
            <a
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-tertiary-fixed-dim hover:bg-white/10 transition-all"
              href={brandContact.whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <Icon name="campaign" className="text-sm" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h5 className="text-white font-headline-sm">Quick Links</h5>
          <ul className="space-y-3">
            <li>
              <Link
                href="/story"
                className="text-secondary-fixed-dim hover:text-on-primary-fixed transition-transform duration-200 hover:translate-x-1 block font-label-md"
              >
                About Our Story
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="text-secondary-fixed-dim hover:text-on-primary-fixed transition-transform duration-200 hover:translate-x-1 block font-label-md"
              >
                Full Menu
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="text-secondary-fixed-dim hover:text-on-primary-fixed transition-transform duration-200 hover:translate-x-1 block font-label-md"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-secondary-fixed-dim hover:text-on-primary-fixed transition-transform duration-200 hover:translate-x-1 block font-label-md"
              >
                Gift Cards
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h5 className="text-white font-headline-sm">Contact Us</h5>
          <ul className="space-y-3 text-secondary-fixed-dim text-body-md">
            <li className="flex gap-3 items-start">
              <Icon name="place" className="text-sm mt-1 flex-shrink-0" />
              <span>
                Main Char Minar Chowrangi, Bahadurabad, Karachi, Pakistan
              </span>
            </li>
            <li>
              <a
                href={brandContact.phoneHref}
                className="hover:text-on-primary-fixed transition-colors flex gap-3 items-start"
              >
                <Icon name="call" className="text-sm mt-1 flex-shrink-0" />
                {brandContact.phone}
              </a>
            </li>
            <li>
              <a
                href={brandContact.emailHref}
                className="hover:text-on-primary-fixed transition-colors flex gap-3 items-start"
              >
                <Icon name="mail" className="text-sm mt-1 flex-shrink-0" />
                {brandContact.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h5 className="text-white font-headline-sm">Instagram</h5>
          <div className="grid grid-cols-3 gap-2">
            {instagramImages.map((img) => (
              <div
                key={img.src}
                className="aspect-square bg-white/5 rounded-lg overflow-hidden group"
              >
                <Image
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  src={img.src}
                  alt={img.alt}
                  width={96}
                  height={96}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 border-t border-white/10 pt-8 text-center text-secondary-fixed-dim font-label-md px-4">
        <p>© 1948 Peshawari Ice Cream. All rights reserved.</p>
      </div>
    </footer>
  );
}
