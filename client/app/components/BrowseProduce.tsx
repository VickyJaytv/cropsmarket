"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { listingService } from "../services/listing.service";
import { categoryService } from "../services/product.service";
import { getImageUrl } from "../utils/imageUtils";

interface CategoryData {
  id: number;
  name: string;
}

interface ListingData {
  id: number;
  quantity: number;
  unit: string | number;
  price: number;
  description?: string;
  location?: string;
  image?: string;
  productName?: string;
  categoryName?: string;
  product?: {
    id: number;
    name: string;
    image?: string;
    category?: {
      id: number;
      name: string;
    };
  };
  farmer?: {
    id: number;
    farmName?: string;
    state?: string;
    lga?: string;
  };
}

export default function BrowseProduce() {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [listings, setListings] = useState<ListingData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoryService.getAllCategories();
        if (res.success && Array.isArray(res.data)) {
          const names = res.data.map((c: CategoryData) => c.name);
          setCategories(["All", ...names]);
        }
      } catch (err: unknown) {
        console.error("Failed to fetch categories", err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const params: Record<string, string> = { limit: "8" };
        if (selectedCategory !== "All") {
          params.category = selectedCategory;
        }
        const res = await listingService.getAllListings(params);
        if (res.success && Array.isArray(res.data?.listings)) {
          setListings(res.data.listings);
        } else {
          setListings([]);
        }
      } catch (err: unknown) {
        console.error("Failed to fetch produce listings", err);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, [selectedCategory]);

  return (
    <section className="my-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold text-fresh-leaf uppercase tracking-wider block mb-1">
            Live Produce Marketplace
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text tracking-tight">
            Fresh Farm-Gate Harvests
          </h2>
          <p className="text-xs sm:text-sm text-natural-gray mt-1">
            Directly sourced wholesale commodities with verified origin and certified agronomic grading.
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
