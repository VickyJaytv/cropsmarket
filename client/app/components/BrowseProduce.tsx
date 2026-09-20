"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";
import { listingService } from "../services/listing.service";
import { productService } from "../services/product.service";
import { ProduceListing } from "../store/useListingStore";
import { getImageUrl } from "../utils/imageUtils";

export default function BrowseProduce() {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [listings, setListings] = useState<ProduceListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await productService.getCategories();
        if (res.success && Array.isArray(res.data)) {
          setCategories(["All", ...res.data.map((c: any) => c.name)]);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const params: any = { limit: 8 };
        if (selectedCategory !== "All") {
          params.category = selectedCategory;
        }
        const res = await listingService.getAllListings(params);
        if (res.success && Array.isArray(res.data?.listings)) {
          setListings(res.data.listings);
        } else if (Array.isArray(res.data)) {
          setListings(res.data);
        } else {
          setListings([]);
        }
      } catch (err) {
        console.error("Failed to fetch produce listings:", err);
        setListings([]);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, [selectedCategory]);

  return (
    <section
      id="browse-produce"
      className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-20 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border-gray/70 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-sage text-deep-forest text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-fresh-leaf" />
            <span>Farm-Gate Produce</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text tracking-tight">
            Featured Harvest Listings
          </h2>
          <p className="text-xs sm:text-sm text-natural-gray mt-1">
            Browse verified wholesale crops available directly from local farms.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-deep-forest text-pure-white shadow-xs"
                  : "bg-pure-white border border-border-gray text-charcoal-text hover:bg-soft-sage"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Produce Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-pure-white rounded-2xl h-80 animate-pulse border border-border-gray"
            />
          ))}
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((item) => {
            const title =
              item.product?.name || item.productName || "Farm Produce";
            const catName =
              item.product?.category?.name || item.categoryName || "Crops";
            const location =
              item.location ||
              (item.farmer
                ? `${item.farmer.lga ? item.farmer.lga + ", " : ""}${item.farmer.state || "Nigeria"}`
                : "Nigeria");
            const priceDisplay = item.price ? item.price.toLocaleString() : "0";
            const unitDisplay = item.unit || "Bag";
            const imageSrc = getImageUrl(item.image || item.product?.image);

            return (
              <Link
                key={item.id}
                href={`/listings/${item.id}`}
                className="bg-pure-white rounded-2xl border border-border-gray/70 overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-soft-sage overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-pure-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-deep-forest border border-border-gray flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate max-w-[120px]">{location}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[11px] font-bold text-fresh-leaf uppercase tracking-wider block mb-1">
                      {catName}
                    </span>
                    <h3 className="font-bold text-base text-charcoal-text group-hover:text-deep-forest transition-colors line-clamp-1">
                      {title}
                    </h3>
                    <p className="text-xs text-natural-gray mt-1 line-clamp-2">
                      {item.description || "Fresh harvest ready for warehouse dispatch or bulk pickup."}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-border-gray/60 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-natural-gray font-medium uppercase block">
                      Price / Unit
                    </span>
                    <span className="text-base font-extrabold text-deep-forest">
                      ₦{priceDisplay}{" "}
                      <span className="text-xs font-normal text-natural-gray">
                        /{unitDisplay}
                      </span>
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-deep-forest bg-soft-sage px-2.5 py-1.5 rounded-lg group-hover:bg-deep-forest group-hover:text-pure-white transition-colors">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-pure-white p-10 rounded-2xl border border-border-gray text-center space-y-3">
          <p className="text-sm font-semibold text-charcoal-text">
            No produce listings available in this category yet.
          </p>
          <Link
            href="/browse-produce"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-forest hover:underline"
          >
            Explore All Produce in Marketplace <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
