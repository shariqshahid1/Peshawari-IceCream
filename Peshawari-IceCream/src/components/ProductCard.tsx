import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import AddToBagButton from "./AddToBagButton";

export default function ProductCard({
  product,
  listView = false,
}: {
  product: Product;
  listView?: boolean;
}) {
  if (listView) {
    return (
      <div className="group bg-surface-container-lowest rounded-[24px] border border-primary/5 ambient-shadow hover:-translate-y-1 transition-all duration-500 p-5 flex flex-col sm:flex-row gap-5">
        <Link
          href={`/product/${product.slug}`}
          className="relative w-full sm:w-32 aspect-square sm:aspect-square shrink-0 overflow-hidden rounded-[16px] bg-surface-container-high block"
        >
          <Image
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
          />
          {product.tag && (
            <span className="absolute top-3 left-3 bg-tertiary-fixed-dim text-on-tertiary font-label-md text-label-md px-3 py-1 rounded-full shadow-sm">
              {product.tag}
            </span>
          )}
        </Link>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start mb-1.5 gap-4">
            <Link
              href={`/product/${product.slug}`}
              className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1"
            >
              {product.name}
            </Link>
            <span className="font-bold text-primary whitespace-nowrap">
              {formatPrice(product.price, product.currency)}
            </span>
          </div>
          <p className="text-on-surface-variant font-body-md line-clamp-2">
            {product.description}
          </p>
          <p className="text-on-surface-variant font-label-md mt-auto pt-3">
            {product.category} • ⭐ {product.rating}
          </p>
          <div className="flex gap-3 mt-4">
            <Link
              href={`/product/${product.slug}`}
              className="flex-grow py-2.5 px-5 rounded-full border border-primary text-primary font-label-md text-label-md hover:bg-primary hover:text-white transition-all duration-300 text-center"
            >
              Quick View
            </Link>
            <AddToBagButton slug={product.slug} variant="solid" label="" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-surface-container-lowest rounded-[24px] border border-primary/5 ambient-shadow hover:-translate-y-2 transition-all duration-500 p-4 flex flex-col h-full">
      <Link
        href={`/product/${product.slug}`}
        className="relative mb-4 aspect-square overflow-hidden rounded-[16px] bg-surface-container-high block"
      >
        <Image
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
        />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-tertiary-fixed-dim text-on-tertiary font-label-md text-label-md px-3 py-1 rounded-full shadow-sm">
            {product.tag}
          </span>
        )}
      </Link>
      <div className="flex justify-between items-start gap-3 mb-1.5">
        <Link
          href={`/product/${product.slug}`}
          className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1"
        >
          {product.name}
        </Link>
        <span className="font-bold text-primary whitespace-nowrap">
          {formatPrice(product.price, product.currency)}
        </span>
      </div>
      <p className="text-on-surface-variant font-label-md line-clamp-2 min-h-[2.6em]">
        {product.tagline}
      </p>
      <div className="flex gap-3 mt-auto pt-4">
        <Link
          href={`/product/${product.slug}`}
          className="flex-grow py-2.5 px-5 rounded-full border border-primary text-primary font-label-md text-label-md hover:bg-primary hover:text-white transition-all duration-300 text-center"
        >
          Quick View
        </Link>
        <AddToBagButton slug={product.slug} variant="solid" label="" />
      </div>
    </div>
  );
}
