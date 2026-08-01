"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { formatPrice, getProduct } from "@/lib/products";
import Icon from "./Icon";

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const lineItems = items
    .map((i) => {
      const product = getProduct(i.slug);
      return product ? { product, qty: i.qty, price: i.price ?? product.price } : null;
    })
    .filter((i): i is { product: NonNullable<ReturnType<typeof getProduct>>; qty: number; price: number } => i !== null);

  const subtotal = lineItems.reduce(
    (sum, i) => sum + i.price * i.qty,
    0,
  );
  const deliveryFee = 150;
  const total = subtotal + deliveryFee;

  return (
    <div
      className={`fixed inset-0 z-[60] transition-all duration-500 overflow-hidden ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-surface flex flex-col shadow-2xl transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8 border-b border-outline-variant/20 flex items-center justify-between">
          <div>
            <h2 className="font-headline-md text-headline-md">Your Order</h2>
            <p className="text-label-md text-on-surface-variant">
              {lineItems.length} {lineItems.length === 1 ? "Item" : "Items"} in your bag
            </p>
          </div>
          <button
            className="p-2 rounded-full hover:bg-secondary-container/50 transition-colors"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          {lineItems.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Icon name="shopping_bag" className="text-5xl text-outline-variant" />
              <p className="text-on-surface-variant font-body-md">
                Your bag is empty.
              </p>
              <Link
                href="/menu"
                onClick={closeCart}
                className="inline-block py-3 px-8 rounded-full bg-primary text-on-primary font-label-lg hover:bg-primary-container transition-colors"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <>
              {lineItems.map(({ product, qty, price }) => (
                <div key={product.slug} className="flex gap-6 group">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/20 flex-shrink-0">
                    <Image
                      className="w-full h-full object-cover"
                      src={product.image}
                      alt={product.name}
                      width={96}
                      height={96}
                    />
                  </div>
                  <div className="flex-1 py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/product/${product.slug}`} onClick={closeCart}>
                          <h4 className="font-bold hover:text-primary transition-colors">
                            {product.name}
                          </h4>
                        </Link>
                        <p className="text-label-md text-on-surface-variant">
                          {product.tagline}
                        </p>
                      </div>
                      <span className="font-bold">
                        {formatPrice(price, product.currency)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-3 bg-secondary-container/30 px-3 py-1 rounded-full text-label-md">
                        <button
                          className="hover:text-primary"
                          onClick={() => updateQty(product.slug, qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span>{qty}</span>
                        <button
                          className="hover:text-primary"
                          onClick={() => updateQty(product.slug, qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="text-error text-label-md hover:underline"
                        onClick={() => removeItem(product.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-primary-container/10 p-6 rounded-3xl space-y-3">
                <div className="flex items-center gap-3 text-primary">
                  <Icon name="local_shipping" />
                  <span className="font-bold">Delivery Estimate</span>
                </div>
                <p className="text-body-md text-on-surface-variant">
                  Express delivery to{" "}
                  <span className="font-bold text-on-surface">
                    DHA Phase 5, Karachi
                  </span>{" "}
                  in 35-45 mins.
                </p>
              </div>
            </>
          )}
        </div>

        {lineItems.length > 0 && (
          <div className="p-8 border-t border-outline-variant/20 space-y-6 bg-white">
            <div className="space-y-2">
              <div className="flex justify-between text-body-md text-on-surface-variant">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString("en-PK")}</span>
              </div>
              <div className="flex justify-between text-body-md text-on-surface-variant">
                <span>Delivery Fee</span>
                <span>Rs. {deliveryFee.toLocaleString("en-PK")}</span>
              </div>
              <div className="flex justify-between font-headline-sm text-headline-sm pt-2">
                <span>Total</span>
                <span>Rs. {total.toLocaleString("en-PK")}</span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-label-md text-outline uppercase tracking-widest text-center">
                Payment Methods
              </p>
              <div className="flex justify-center gap-6 opacity-60">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-[10px]">
                    JC
                  </div>
                  <span className="text-[10px]">JazzCash</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-[10px]">
                    EP
                  </div>
                  <span className="text-[10px]">EasyPaisa</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Icon name="credit_card" className="text-[32px]" />
                  <span className="text-[10px]">Cards</span>
                </div>
              </div>
            </div>
            <Link
              href="/account"
              onClick={closeCart}
              className="w-full py-5 bg-primary text-on-primary rounded-full font-label-lg text-label-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all shadow-lg active:scale-95"
            >
              Proceed to Checkout
              <Icon name="arrow_forward" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
