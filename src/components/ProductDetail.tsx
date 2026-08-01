"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useCart } from "./CartProvider";
import Icon from "./Icon";

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [size, setSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [nutritionOpen, setNutritionOpen] = useState(true);

  const activeImage = product.image;
  const thumbs = [
    { src: product.image, alt: product.name },
    { src: product.image, alt: product.name },
  ];

  const sizes = product.sizes;

  const unitPrice = sizes[size]?.price ?? product.price;
  const totalPrice = unitPrice * qty;

  const handleAddToCart = () => {
    addItem(product.slug, qty, unitPrice);
    openCart();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* Gallery */}
      <div className="space-y-6">
        <div className="aspect-[4/5] rounded-[24px] overflow-hidden border border-primary/10 ambient-shadow">
          <Image
            className="w-full h-full object-cover"
            src={activeImage}
            alt={product.name}
            width={640}
            height={800}
            priority
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          {thumbs.map((thumb) => (
            <div
              key={thumb.src}
              className={`aspect-square rounded-xl overflow-hidden border transition-all ${
                activeImage === thumb.src
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-primary/10 opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                className="w-full h-full object-cover"
                src={thumb.src}
                alt={thumb.alt}
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="lg:sticky lg:top-32 space-y-10">
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-tertiary font-label-lg">
            <Icon name="star" className="text-[18px]" filled />
            <span>
              {product.rating} ({product.reviews.toLocaleString()} Reviews)
            </span>
            <span className="mx-2 text-outline-variant">|</span>
            <span className="text-primary-container font-bold">In Stock</span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
            {product.name}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            {product.description}
          </p>
        </header>

        <div className="space-y-8">
          {/* Size Selector */}
          <div className="space-y-4">
            <h3 className="font-label-lg text-label-lg uppercase tracking-widest text-outline">
              Serving Size
            </h3>
            <div
              className={`grid gap-4 ${
                sizes.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2"
              }`}
            >
              {sizes.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setSize(i)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${
                    size === i
                      ? "border-primary bg-primary-container/5"
                      : "border-outline-variant hover:border-primary"
                  }`}
                >
                  <div className="text-on-surface font-bold">{s.label}</div>
                  <div className="mt-2 font-bold text-primary text-label-lg">
                    {formatPrice(s.price, product.currency)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Nutrition Accordion */}
          <div className="border-y border-outline-variant/30 py-6">
            <button
              className="flex items-center justify-between w-full group"
              onClick={() => setNutritionOpen((v) => !v)}
            >
              <span className="font-headline-sm text-headline-sm">
                Ingredients &amp; Nutrition
              </span>
              <Icon
                name="expand_more"
                className={`transition-transform ${
                  nutritionOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {nutritionOpen && (
              <div className="mt-4 text-on-surface-variant text-body-md space-y-2">
                <p>
                  Pure Cow Milk, Cane Sugar, Green Pistachios, Saffron,
                  Cardamom, Natural Thickener.
                </p>
                <div className="flex gap-8 mt-4">
                  <div>
                    <span className="font-bold">240</span>
                    <br />
                    <span className="text-label-md">Calories</span>
                  </div>
                  <div>
                    <span className="font-bold">12g</span>
                    <br />
                    <span className="text-label-md">Fats</span>
                  </div>
                  <div>
                    <span className="font-bold">28g</span>
                    <br />
                    <span className="text-label-md">Sugars</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 glass-panel border-t border-primary/10 py-6 px-margin-mobile md:px-margin-desktop z-40 shadow-[0_-10px_40px_-15px_rgba(93,58,32,0.1)]">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-label-md text-outline uppercase tracking-widest">
                Total Price
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                {formatPrice(totalPrice, product.currency)}
              </div>
            </div>
            <div className="h-10 w-[1px] bg-outline-variant hidden md:block" />
            <div className="flex items-center bg-secondary-container/50 rounded-full p-1 border border-outline-variant/20">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white transition-colors"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                <Icon name="remove" />
              </button>
              <span className="w-12 text-center font-bold">
                {String(qty).padStart(2, "0")}
              </span>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white shadow-sm"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Icon name="add" />
              </button>
            </div>
          </div>
          <button
            className="w-full md:w-auto px-12 py-4 bg-primary text-on-primary rounded-full font-label-lg text-label-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg hover:shadow-primary/20"
            onClick={handleAddToCart}
          >
            <Icon name="shopping_cart" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
