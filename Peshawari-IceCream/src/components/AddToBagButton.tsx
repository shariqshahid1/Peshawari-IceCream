"use client";

import { useCart } from "./CartProvider";
import Icon from "./Icon";

interface AddToBagButtonProps {
  slug: string;
  variant?: "outline" | "solid" | "full";
  label?: string;
}

export default function AddToBagButton({
  slug,
  variant = "outline",
  label = "Add to Bag",
}: AddToBagButtonProps) {
  const { addItem, openCart } = useCart();

  const classes =
    variant === "solid"
      ? "flex-grow py-2.5 px-5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
      : variant === "full"
        ? "w-full py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all active:scale-95"
        : "flex-grow py-2.5 px-5 rounded-full border border-primary text-primary font-label-md text-label-md hover:bg-primary hover:text-white transition-all duration-300";

  return (
    <button
      className={classes}
      onClick={() => {
        addItem(slug);
        openCart();
      }}
    >
      {variant === "solid" ? (
        <>
          <Icon name="add" />
          {label}
        </>
      ) : (
        label
      )}
    </button>
  );
}
