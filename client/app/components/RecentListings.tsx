"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { listingService } from "../services/listing.service";
import { ProduceListing } from "../store/useListingStore";
import { getImageUrl } from "../utils/imageUtils";

export default function RecentListings() {
  const [listings, setListings] = useState<ProduceListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecent() {
      try {
        const res = await listingService.getAllListings({ limit: 4 });
        if (res.success && Array.isArray(res.data?.listings)) {
          setListings(res.data.listings);
        } else if (Array.isArray(res.data)) {
          setListings(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch recent listings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadRecent();
  }, []);

  if (loading || listings.length === 0) {
    return null;
  }

  return (
    <section className="px-4 md:px-8 mb-8 md:hidden flex-1">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-heading text-lg font-semibold text-charcoal-text">
          Recent Farm Harvests
        </h3>
        <Link
          href="/browse-produce"
          className="text-xs font-bold text-deep-forest hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {listings.map((item) => {
          const title = item.product?.name || item.productName || "Farm Produce";
          const location =
            item.location ||
            (item.farmer
              ? `${item.farmer.lga ? item.farmer.lga + ", " : ""}${item.farmer.state || "Nigeria"}`
              : "Nigeria");
          const imageSrc = getImageUrl(item.image || item.product?.image);
          const priceDisplay = item.price ? item.price.toLocaleString() : "0";

          return (
            <Link
              key={item.id}
              href={`/listings/${item.id}`}
              className="flex bg-pure-white rounded-xl border border-border-gray shadow-xs overflow-hidden p-2.5 gap-3 hover:shadow-md transition-shadow"
            >
              <div className="relative w-20 h-20 rounded-lg bg-soft-sage shrink-0 overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <h4 className="text-sm font-bold text-charcoal-text line-clamp-1">
                    {title}
                  </h4>
                  <span className="text-xs text-natural-gray">
                    {item.quantity} {item.unit || "Bags"} available
                  </span>
                </div>
                <div className="flex items-center gap-1 text-natural-gray text-xs">
                  <MapPin className="w-3 h-3 text-deep-forest" />
                  <span className="truncate max-w-[140px]">{location}</span>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between py-0.5 pl-2">
                <span className="text-sm font-extrabold text-deep-forest">
                  ₦{priceDisplay}
                </span>
                <span className="text-[10px] text-natural-gray uppercase font-semibold">
                  /{item.unit || "unit"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
