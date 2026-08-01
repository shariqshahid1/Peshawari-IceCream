"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/lib/products";
import type { Category } from "@/lib/products";
import ProductCard from "./ProductCard";
import Icon from "./Icon";

type SortOrder = "popularity" | "price-asc" | "price-desc" | "newest";
type TagFilter = "All" | "Bestseller" | "Heritage" | "Specialty";
type ViewMode = "grid" | "list";

const PER_PAGE = 6;

const tagFilters: TagFilter[] = ["All", "Bestseller", "Heritage", "Specialty"];

export default function MenuContent() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [activeTag, setActiveTag] = useState<TagFilter>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("popularity");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (activeTag !== "All") {
      list = list.filter((p) => p.tag === activeTag);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q),
      );
    }
    switch (sortOrder) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        list = [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [activeCategory, activeTag, sortOrder, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const resetToFirst = () => setPage(1);

  const selectCategory = (category: Category | "All") => {
    setActiveCategory(category);
    resetToFirst();
  };

  const selectTag = (tag: TagFilter) => {
    setActiveTag(tag);
    resetToFirst();
  };

  const pageNumbers = useMemo(() => {
    const numbers: (number | "...")[] = [];
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) numbers.push(i);
    } else {
      numbers.push(1);
      if (currentPage > 3) numbers.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(pageCount - 1, currentPage + 1);
        i++
      ) {
        numbers.push(i);
      }
      if (currentPage < pageCount - 2) numbers.push("...");
      numbers.push(pageCount);
    }
    return numbers;
  }, [pageCount, currentPage]);

  return (
    <div className="flex flex-col lg:flex-row gap-gutter">
      {/* Sidebar Filtering */}
      <aside className="w-full lg:w-72 flex-shrink-0 space-y-10">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6 border-b border-primary/10 pb-2">
            Categories
          </h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => selectCategory("All")}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-label-lg text-label-lg flex justify-between items-center group ${
                  activeCategory === "All"
                    ? "bg-primary text-white"
                    : "text-on-surface-variant hover:bg-secondary-container/50"
                }`}
              >
                <span>All Products</span>
                <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  chevron_right
                </span>
              </button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => selectCategory(category)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-label-lg text-label-lg flex justify-between items-center group ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "text-on-surface-variant hover:bg-secondary-container/50"
                  }`}
                >
                  <span>{category}</span>
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    chevron_right
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Highlights Filter */}
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6 border-b border-primary/10 pb-2">
            Highlights
          </h3>
          <div className="flex flex-wrap gap-3">
            {tagFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => selectTag(tag)}
                className={`px-4 py-2 rounded-full border font-label-md text-label-md transition-all ${
                  activeTag === tag
                    ? "border-primary bg-primary text-white"
                    : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Heritage Callout */}
        <div className="bg-surface-container p-8 rounded-[24px] border border-primary/10 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <Icon name="workspace_premium" className="text-tertiary mb-4" filled />
            <h4 className="font-headline-sm text-headline-sm text-primary mb-2">
              Our Quality Guarantee
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              No artificial coloring or preservatives. Just pure dairy and
              organic inclusions.
            </p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
            <Icon name="eco" className="text-9xl text-primary" />
          </div>
        </div>
      </aside>

      {/* Product Display Area */}
      <section className="flex-grow">
        {/* Sorting & View Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 bg-white/40 p-4 rounded-2xl backdrop-blur-sm border border-primary/5">
          <div className="flex items-center gap-4">
            <span className="font-label-lg text-label-lg text-on-surface-variant">
              Sort by:
            </span>
            <select
              className="bg-transparent border-none font-label-lg text-label-lg text-primary focus:ring-0 cursor-pointer"
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value as SortOrder);
                resetToFirst();
              }}
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-secondary-container/30 rounded-full px-3 py-1.5 border border-outline-variant/30">
              <Icon name="search" className="text-primary scale-90" />
              <input
                className="bg-transparent border-none focus:ring-0 text-body-md font-body-md w-36 outline-none"
                placeholder="Search flavors..."
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetToFirst();
                }}
              />
            </div>
            <button
              className={`p-2 rounded-lg material-symbols-outlined transition-colors ${
                view === "grid"
                  ? "bg-primary text-white"
                  : "text-on-surface-variant hover:bg-secondary-container"
              }`}
              onClick={() => setView("grid")}
              aria-label="Grid view"
            >
              grid_view
            </button>
            <button
              className={`p-2 rounded-lg material-symbols-outlined transition-colors ${
                view === "list"
                  ? "bg-primary text-white"
                  : "text-on-surface-variant hover:bg-secondary-container"
              }`}
              onClick={() => setView("list")}
              aria-label="List view"
            >
              view_list
            </button>
            <span className="ml-4 font-label-md text-label-md text-on-surface-variant opacity-60">
              Showing {visible.length} of {filtered.length}
            </span>
          </div>
        </div>

        {/* Product Grid / List */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <Icon name="search_off" className="text-5xl text-outline-variant" />
            <p className="font-headline-sm text-headline-sm text-on-surface">
              No flavors found
            </p>
            <p className="text-on-surface-variant font-body-md">
              Try a different category or search term.
            </p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-8">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} listView />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mt-20 flex justify-center items-center gap-2">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <Icon name="chevron_left" />
            </button>
            {pageNumbers.map((num, idx) =>
              num === "..." ? (
                <span key={`ellipsis-${idx}`} className="text-on-surface-variant px-1">
                  ...
                </span>
              ) : (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-label-lg text-label-lg transition-all ${
                    currentPage === num
                      ? "bg-primary text-white"
                      : "text-on-surface-variant hover:bg-secondary-container/50"
                  }`}
                >
                  {num}
                </button>
              ),
            )}
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
              aria-label="Next page"
            >
              <Icon name="chevron_right" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
