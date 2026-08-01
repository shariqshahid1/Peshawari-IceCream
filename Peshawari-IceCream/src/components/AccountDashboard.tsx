"use client";

import Image from "next/image";
import { useState } from "react";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useCart } from "./CartProvider";
import Icon from "./Icon";

const favorites = ["peshawari", "pista", "zafran-almond-roasted"];

const orders = [
  {
    id: "PE-90231",
    date: "24 Jul, 2026",
    items: 3,
    total: 4200,
    image: "/images/peshawari.webp",
    status: "Delivered",
  },
  {
    id: "PE-89445",
    date: "12 Jul, 2026",
    items: 1,
    total: 1450,
    image: "/images/kulfa-falooda.jpg",
    status: "Delivered",
  },
];

type Step = "delivery" | "payment" | "confirm";

export default function AccountDashboard() {
  const { addItem, openCart, items } = useCart();
  const [step, setStep] = useState<Step>("delivery");

  const favoriteProducts = favorites
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const checkoutItems = items
    .map((i) => {
      const product = getProduct(i.slug);
      return product ? { product, qty: i.qty, price: i.price ?? product.price } : null;
    })
    .filter(
      (i): i is { product: NonNullable<ReturnType<typeof getProduct>>; qty: number; price: number } =>
        i !== null,
    );

  const deliveryFee = 150;
  const subtotal = checkoutItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = subtotal + deliveryFee;

  const steps: { key: Step; label: string }[] = [
    { key: "delivery", label: "Delivery" },
    { key: "payment", label: "Payment" },
    { key: "confirm", label: "Confirm" },
  ];

  const stepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      {/* Left Column */}
      <div className="lg:col-span-8 flex flex-col gap-12">
        {/* Favorites */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-md text-headline-md">
              Your Favorite Flavors
            </h2>
            <a
              href="/menu"
              className="text-primary font-label-lg text-label-lg flex items-center gap-1 hover:underline"
            >
              View Menu <Icon name="arrow_forward" className="text-sm" />
            </a>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scroll-hide snap-x">
            {favoriteProducts.map((product) => (
              <div
                key={product.slug}
                className="min-w-[280px] bg-surface-container-lowest rounded-[24px] p-6 border border-primary/5 hover:shadow-md transition-all group snap-start"
              >
                <div className="aspect-square rounded-2xl mb-4 bg-surface overflow-hidden relative">
                  <Image
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={product.image}
                    alt={product.name}
                    width={280}
                    height={280}
                  />
                  <button
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-md p-2 rounded-full text-error"
                    aria-label="Favorite"
                  >
                    <Icon name="favorite" className="text-xl" filled />
                  </button>
                </div>
                <h3 className="font-headline-sm text-headline-sm mb-1">
                  {product.name}
                </h3>
                <p className="text-on-surface-variant font-label-md mb-4">
                  {product.tagline}
                </p>
                <button
                  className="w-full py-3 bg-primary text-on-primary rounded-full font-label-lg text-label-lg hover:bg-primary-container transition-colors"
                  onClick={() => {
                    addItem(product.slug);
                    openCart();
                  }}
                >
                  Add to Bag
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-[32px] p-8 border border-primary/5 shadow-sm">
          <h2 className="font-headline-md text-headline-md mb-8">
            Recent Orders
          </h2>
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-surface hover:bg-surface-container-low transition-colors group"
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="w-16 h-16 rounded-xl bg-surface-container overflow-hidden">
                    <Image
                      className="w-full h-full object-cover"
                      src={order.image}
                      alt={`Order ${order.id}`}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">
                      Order #{order.id}
                    </h4>
                    <p className="text-on-surface-variant text-label-md">
                      {order.date} • {order.items} Items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      {formatPrice(order.total, "Rs")}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-container text-on-primary-container">
                      {order.status}
                    </span>
                  </div>
                  <button
                    className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors"
                    aria-label={`View order ${order.id}`}
                  >
                    chevron_right
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 border border-outline/20 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-variant/20 transition-all">
            View All Orders
          </button>
        </div>
      </div>

      {/* Right Column: Checkout Flow */}
      <div className="lg:col-span-4">
        <div className="glass-panel sticky top-28 rounded-[32px] p-8 border border-primary/10 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline-sm text-headline-sm">
              Secure Checkout
            </h2>
            <span className="text-primary font-label-md">
              Step {stepIndex + 1}/3
            </span>
          </div>

          {/* Steps Indicator */}
          <div className="flex justify-between items-center mb-10 px-4">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      i <= stepIndex
                        ? "bg-primary text-white ring-4 ring-primary/20"
                        : "bg-secondary-container text-on-secondary-container"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-tighter font-bold ${
                      i <= stepIndex ? "text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="h-[2px] flex-1 bg-secondary-container mx-2 -mt-6" />
                )}
              </div>
            ))}
          </div>

          {step === "delivery" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <label className="font-label-lg text-label-lg text-on-surface block">
                  Shipping Address
                </label>
                <textarea
                  className="w-full bg-surface-container-low border-none rounded-2xl p-4 focus:ring-2 focus:ring-tertiary-fixed-dim transition-all text-body-md"
                  placeholder="Main Char Minar Chowrangi, Bahadurabad..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="font-label-lg text-label-lg text-on-surface block">
                    City
                  </label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-tertiary-fixed-dim transition-all"
                    readOnly
                    type="text"
                    value="Karachi"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-lg text-label-lg text-on-surface block">
                    Phone
                  </label>
                  <input
                    className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-tertiary-fixed-dim transition-all"
                    placeholder="+92 300 0000000"
                    type="tel"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-primary/10">
                <div className="flex justify-between mb-2">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="font-bold">
                    Rs. {subtotal.toLocaleString("en-PK")}
                  </span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-on-surface-variant">Delivery Fee</span>
                  <span className="font-bold text-primary">
                    {checkoutItems.length === 0
                      ? "Rs. 0"
                      : `Rs. ${deliveryFee.toLocaleString("en-PK")}`}
                  </span>
                </div>
                <div className="flex justify-between items-end mb-8">
                  <span className="text-headline-sm font-headline-sm">
                    Total
                  </span>
                  <span className="text-headline-sm font-headline-sm text-primary">
                    Rs. {total.toLocaleString("en-PK")}
                  </span>
                </div>
                <button
                  className="w-full py-4 bg-primary text-on-primary rounded-full font-label-lg text-label-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2"
                  onClick={() => setStep("payment")}
                >
                  Continue to Payment
                  <Icon name="arrow_forward" className="text-sm" />
                </button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-4">
                <div className="p-4 border-2 border-primary rounded-2xl bg-primary-container/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="credit_card" className="text-primary" />
                    <span className="font-bold">Credit / Debit Card</span>
                  </div>
                  <div className="w-4 h-4 rounded-full border-4 border-primary" />
                </div>
                <div className="p-4 border border-outline/20 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon name="payments" className="text-on-surface-variant" />
                    <span>Cash on Delivery</span>
                  </div>
                  <div className="w-4 h-4 rounded-full border border-outline/20" />
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-tertiary-fixed-dim"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-tertiary-fixed-dim"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-tertiary-fixed-dim"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full bg-surface-container-low border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-tertiary-fixed-dim"
                  />
                </div>
              </div>

              <button
                className="w-full py-4 bg-primary text-on-primary rounded-full font-label-lg text-label-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2 mt-4"
                onClick={() => setStep("confirm")}
              >
                Place Order
                <Icon name="lock" className="text-sm" />
              </button>
            </div>
          )}

          {step === "confirm" && (
            <div className="text-center py-12 animate-scaleIn">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="check_circle" className="text-4xl" filled />
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-2">
                Order Confirmed!
              </h3>
              <p className="text-on-surface-variant text-body-md mb-8">
                Your artisan treat will be at your door in approx. 45 mins.
              </p>
              <button className="inline-block py-4 px-8 bg-primary text-on-primary rounded-full font-label-lg text-label-lg hover:bg-primary-container transition-all">
                Track Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
