import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peshawariicecream.pk"),
  title: "Peshawari Ice Cream | Since 1948",
  description:
    "Crafting Karachi's most loved ice cream since 1948. A legacy of taste, purity, and tradition in every scoop.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Peshawari Ice Cream",
    title: "Peshawari Ice Cream | Since 1948",
    description:
      "Crafting Karachi's most loved ice cream since 1948. A legacy of taste, purity, and tradition in every scoop.",
    images: [{ url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKcUhUaWhXxTKLTkB2MCUEr5D_wFYMr5ruSeuhYFPig5W4wI2S6Roas8SxdoCUbVPV3cCrl5fFWggspFTZ8z444JIFPamLYinOBNxYoZze783RqGPekV-EsxzwFKna8LGT1uarcBR0Z8QAhyQGX8vU1G76-nbJdvNn1zm18XoyVEwwNWpGkVvDe0Tfar41PoCDZ7r79ohNiNKdZob3Y_cms-7a--p_O5SUOOGDiaqmqFSvgyMTVtDM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Peshawari Ice Cream | Since 1948",
    description:
      "Crafting Karachi's most loved ice cream since 1948. A legacy of taste, purity, and tradition in every scoop.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${garamond.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- Material Symbols is not available in next/font/google */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface font-body-md text-on-surface">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
