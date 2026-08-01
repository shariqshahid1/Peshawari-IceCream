import type { Metadata } from "next";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Contact | Peshawari Ice Cream",
  description:
    "Get in touch with Peshawari Ice Cream — questions, catering, and feedback. We'd love to hear from you.",
};

const contactInfo = [
  {
    icon: "call",
    title: "Call Us",
    lines: ["+92 21 33321444"],
    hrefs: ["tel:+922133321444"],
  },
  {
    icon: "mail",
    title: "Email Us",
    lines: ["huzaifakhann@icloud.com"],
    hrefs: ["mailto:huzaifakhann@icloud.com"],
  },
  {
    icon: "location_on",
    title: "Visit Us",
    lines: ["Main Char Minar Chowrangi, Bahadurabad, Karachi"],
    hrefs: [],
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Page Header */}
      <section className="pt-28 md:pt-36 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <span className="text-tertiary font-label-lg text-label-lg uppercase tracking-[0.3em]">
          Get in Touch
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight mt-4">
          We&apos;d Love to Hear From You
        </h1>
        <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl mx-auto mt-6">
          Questions about our flavors, catering for an event, or just want to
          share your favorite memory? Drop us a line.
        </p>
      </section>

      {/* Contact Form + Info */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        <div className="lg:col-span-7 glass-panel p-8 md:p-12 rounded-[32px] border border-primary/10 ambient-shadow">
          <h2 className="font-headline-md text-headline-md mb-8">
            Send a Message
          </h2>
          <ContactForm />
        </div>

        <div className="lg:col-span-5 space-y-6">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="glass-panel p-8 rounded-[24px] border border-primary/10 ambient-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                  <Icon name={item.icon} />
                </div>
                <h3 className="font-headline-sm text-headline-sm">
                  {item.title}
                </h3>
              </div>
              <div className="space-y-1">
                {item.lines.map((line, i) => (
                  <p
                    key={line}
                    className="text-on-surface-variant font-body-md"
                  >
                    {item.hrefs?.[i] ? (
                      <a
                        href={item.hrefs[i]}
                        className="hover:text-primary transition-colors"
                      >
                        {line}
                      </a>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
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
    </main>
  );
}
