"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { listingService } from "../services/listing.service";
import { productService } from "../services/product.service";
import { useListingStore } from "../store/useListingStore";
import { getImageUrl } from "../utils/imageUtils";
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  ArrowRight,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  X,
} from "lucide-react";

function BrowseProduceContent() {
  const searchParams = useSearchParams();
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedState,
    setSelectedState,
    minPrice,
    maxPrice,
    setPriceRange,
    currentPage,
    setCurrentPage,
    listings,
    setListings,
    isLoading,
    setIsLoading,
    resetFilters,
  } = useListingStore();

  const [categories, setCategories] = useState<string[]>([
    "All",
    "Grains",
    "Legumes",
    "Tubers",
    "Vegetables",
    "Fruits",
  ]);

  const [states, setStates] = useState<string[]>([
    "All",
    "Oyo",
    "Benue",
    "Ogun",
    "Kaduna",
    "Kano",
    "Taraba",
    "Niger",
    "Enugu",
  ]);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL search query on load
  useEffect(() => {
    const querySearch = searchParams.get("search");
    if (querySearch) {
      setSearchQuery(querySearch);
    }
  }, [searchParams, setSearchQuery]);

  // Fetch categories from API if available
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await productService.getCategories();
        if (res.success && Array.isArray(res.data)) {
          const catNames = res.data.map((c: any) => c.name);
          setCategories(["All", ...catNames]);
        }
      } catch (err) {
        // keep defaults if error
      }
    }
    loadCategories();
  }, []);

  // Fetch Listings with API
  useEffect(() => {
    async function fetchListings() {
      setIsLoading(true);
      try {
        const params: any = {
          page: currentPage,
          limit: 12,
        };
        if (searchQuery) params.name = searchQuery;
        if (selectedCategory !== "All") params.category = selectedCategory;
        if (selectedState !== "All") params.state = selectedState;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;

        const res = await listingService.getAllListings(params);
        if (res.success && Array.isArray(res.data)) {
          setListings(res.data, res.data.length);
        } else if (res.data?.listings) {
          setListings(res.data.listings, res.data.total || res.data.listings.length);
        } else {
          setListings([], 0);
        }
      } catch (err) {
        console.error("Error fetching listings:", err);
        setListings([], 0);
      } finally {
        setIsLoading(false);
      }
    }

    fetchListings();
  }, [
    searchQuery,
    selectedCategory,
    selectedState,
    minPrice,
    maxPrice,
    currentPage,
    setListings,
    setIsLoading,
  ]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border-gray/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-sage text-deep-forest text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-fresh-leaf" />
            <span>Direct Farm Gate Marketplace</span>
          </div>
          <h1 className="text-3xl font-extrabold text-charcoal-text tracking-tight">
            Browse Wholesale Produce
          </h1>
          <p className="text-natural-gray text-sm mt-1">
            Discover verified crop harvests, inquire pricing, and buy directly from registered Nigerian farm gates.
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-deep-forest text-pure-white font-bold text-sm rounded-xl shadow-xs"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filter Produce
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block lg:col-span-3 bg-pure-white p-6 rounded-2xl border border-border-gray/70 shadow-2xs space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-border-gray/60">
            <h2 className="font-bold text-base text-charcoal-text flex items-center gap-2">
              <Filter className="w-4 h-4 text-deep-forest" /> Filter Produce
            </h2>
            <button
              onClick={resetFilters}
              className="text-xs text-natural-gray hover:text-error-red flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* Search Field */}
          <div>
            <label className="block text-xs font-bold text-charcoal-text uppercase mb-2">
              Search Produce
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-natural-gray absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Maize, Cassava, Rice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-border-gray rounded-xl text-xs text-charcoal-text focus:outline-hidden focus:border-deep-forest"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-bold text-charcoal-text uppercase mb-2">
              Produce Category
            </label>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedCategory === cat
                      ? "bg-soft-sage text-deep-forest font-bold"
                      : "text-natural-gray hover:bg-warm-cream"
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-fresh-leaf" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* State Location Filter */}
          <div>
            <label className="block text-xs font-bold text-charcoal-text uppercase mb-2">
              Farm Location (State)
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-2 border border-border-gray rounded-xl text-xs text-charcoal-text font-medium focus:outline-hidden focus:border-deep-forest bg-pure-white"
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st === "All" ? "All States in Nigeria" : st}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-xs font-bold text-charcoal-text uppercase mb-2">
              Price Range (₦)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min ₦"
                value={minPrice || ""}
                onChange={(e) =>
                  setPriceRange(
                    e.target.value ? Number(e.target.value) : null,
                    maxPrice
                  )
                }
                className="w-full px-3 py-2 border border-border-gray rounded-xl text-xs text-charcoal-text"
              />
              <input
                type="number"
                placeholder="Max ₦"
                value={maxPrice || ""}
                onChange={(e) =>
                  setPriceRange(
                    minPrice,
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="w-full px-3 py-2 border border-border-gray rounded-xl text-xs text-charcoal-text"
              />
            </div>
          </div>
        </aside>

        {/* PRODUCE LISTINGS MAIN GRID */}
        <section className="lg:col-span-9 space-y-6">
          {/* Active Filter Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-pure-white p-4 rounded-2xl border border-border-gray/60">
            <p className="text-xs font-semibold text-natural-gray">
              Showing <span className="text-charcoal-text font-bold">{listings.length}</span> harvest listings
            </p>
            <div className="flex items-center gap-2">
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-soft-sage text-deep-forest text-xs font-semibold">
                  Category: {selectedCategory}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setSelectedCategory("All")}
                  />
                </span>
              )}
              {selectedState !== "All" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-soft-sage text-deep-forest text-xs font-semibold">
                  State: {selectedState}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setSelectedState("All")}
                  />
                </span>
              )}
            </div>
          </div>

          {/* Grid Loading or Produce Cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-pure-white rounded-2xl h-80 animate-pulse border border-border-gray"
                />
              ))}
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((item) => (
                <Link
                  key={item.id}
                  href={`/listings/${item.id}`}
                  className="bg-pure-white rounded-2xl overflow-hidden border border-border-gray/70 shadow-2xs hover:shadow-md transition-all group flex flex-col"
                >
                  <div className="relative h-48 bg-soft-sage overflow-hidden">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.productName || "Harvest produce"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-pure-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-deep-forest border border-border-gray flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.locationState || "Oyo State"}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-natural-gray mb-1">
                        <span>{item.categoryName || "Grains & Crops"}</span>
                        <span className="font-bold text-fresh-leaf uppercase">
                          {item.status || "Active"}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-charcoal-text group-hover:text-deep-forest transition-colors">
                        {item.productName || "Dry White Maize"}
                      </h3>
                      <p className="text-xs text-natural-gray line-clamp-2 mt-1">
                        {item.description || "Fresh harvest available directly from certified farm gate."}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border-gray/60 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-natural-gray font-medium">Price per unit</p>
                        <p className="text-sm font-extrabold text-deep-forest">
                          ₦{item.price ? item.price.toLocaleString() : "285,000"} / {item.unit || "Ton"}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-deep-forest bg-soft-sage px-3 py-1.5 rounded-lg group-hover:bg-deep-forest group-hover:text-pure-white transition-colors">
                        Inquire <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-pure-white p-12 rounded-2xl border border-border-gray text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-soft-sage mx-auto flex items-center justify-center text-natural-gray">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-charcoal-text">
                No Produce Listings Found
              </h3>
              <p className="text-sm text-natural-gray max-w-md mx-auto">
                No produce matched your search query or location filter. Try clearing filters or searching for different agricultural crops.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-deep-forest text-pure-white text-xs font-bold rounded-xl"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {listings.length > 0 && (
            <div className="flex items-center justify-between pt-6 border-t border-border-gray/60">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-charcoal-text bg-pure-white border border-border-gray rounded-xl disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <span className="text-xs font-semibold text-natural-gray">
                Page {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-charcoal-text bg-pure-white border border-border-gray rounded-xl"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </div>

      {/* MOBILE DRAWER FILTERS */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end lg:hidden">
          <div className="bg-pure-white w-4/5 max-w-md h-full p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-4 border-b border-border-gray">
              <h2 className="font-bold text-base text-charcoal-text flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filter Produce
              </h2>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-6 h-6 text-natural-gray" />
              </button>
            </div>

            {/* Mobile Category */}
            <div>
              <label className="block text-xs font-bold text-charcoal-text uppercase mb-2">
                Produce Category
              </label>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                      selectedCategory === cat
                        ? "bg-soft-sage text-deep-forest font-bold"
                        : "text-natural-gray"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                resetFilters();
                setMobileFilterOpen(false);
              }}
              className="w-full py-3 bg-soft-sage text-deep-forest font-bold text-xs rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BrowseProducePage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />
      <main className="pt-20 flex-1">
        <Suspense fallback={<div className="p-8 text-center text-natural-gray">Loading marketplace produce...</div>}>
          <BrowseProduceContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
