"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { listingService } from "../services/listing.service";
import { useListingStore } from "../store/useListingStore";
import { getImageUrl } from "../utils/imageUtils";
import {
  PlusCircle,
  Package,
  TrendingUp,
  AlertCircle,
  Trash2,
  PauseCircle,
  PlayCircle,
  Tag,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { personalListings, setPersonalListings } = useListingStore();
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const loadPersonalListings = async () => {
    setLoading(true);
    setActionError(null);
    try {
      const res = await listingService.getPersonalListings();
      if (res.success && Array.isArray(res.data?.listings)) {
        setPersonalListings(res.data.listings);
      } else if (Array.isArray(res.data)) {
        setPersonalListings(res.data);
      } else {
        setPersonalListings([]);
      }
    } catch (err: any) {
      console.error("Failed to load personal listings", err);
      setActionError("Could not load your listings from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadPersonalListings();
    }
  }, [isAuthenticated]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this produce listing?")) {
      try {
        await listingService.deleteListing(id);
        setPersonalListings(personalListings.filter((l) => l.id !== id));
      } catch (err) {
        console.error("Failed to delete listing", err);
        setActionError("Failed to delete listing from the server.");
      }
    }
  };

  const handleToggleStatus = async (id: number, currentStatus?: string) => {
    const nextStatus = currentStatus === "paused" ? "active" : "paused";
    try {
      await listingService.updateListing(id, { status: nextStatus });
      setPersonalListings(
        personalListings.map((l) =>
          l.id === id ? { ...l, status: nextStatus } : l
        )
      );
    } catch (err) {
      console.error("Failed to toggle listing status", err);
      setActionError("Failed to update listing status on the server.");
    }
  };

  const activeCount = personalListings.filter(
    (l) => l.status === "active" || !l.status
  ).length;

  const totalStockVolume = personalListings.reduce(
    (acc, curr) => acc + (Number(curr.quantity) || 0),
    0
  );

  const uniqueCropTypes = new Set(
    personalListings
      .map((l) => l.product?.name || l.productName)
      .filter(Boolean)
  ).size;

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-20 flex-1">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Header & Quick Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-pure-white p-6 sm:p-8 rounded-2xl border border-border-gray/70 shadow-2xs">
            <div>
              <span className="text-xs font-bold text-fresh-leaf uppercase tracking-wider">
                Farmer Control Center
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text tracking-tight mt-1">
                Welcome, {user?.firstName || "Farmer"} {user?.lastName || ""}
              </h1>
              <p className="text-xs sm:text-sm text-natural-gray mt-1">
                Manage your real-time harvest stock, listing availability, and farm-gate pricing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadPersonalListings}
                className="p-3 bg-soft-sage text-deep-forest hover:bg-deep-forest hover:text-pure-white rounded-xl transition-colors cursor-pointer"
                title="Refresh listings from server"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <Link
                href="/dashboard/create-listing"
                className="inline-flex items-center gap-2 px-5 py-3 bg-deep-forest hover:bg-primary text-pure-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                <PlusCircle className="w-4 h-4" /> Post New Harvest
              </Link>
            </div>
          </div>

          {actionError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-error-red text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{actionError}</span>
            </div>
          )}

          {/* REAL-TIME METRICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-pure-white p-6 rounded-2xl border border-border-gray/70 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-natural-gray uppercase">Active Harvests</span>
                <div className="w-9 h-9 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-charcoal-text">{activeCount}</p>
              <p className="text-xs text-natural-gray mt-1">Live in marketplace</p>
            </div>

            <div className="bg-pure-white p-6 rounded-2xl border border-border-gray/70 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-natural-gray uppercase">Total Inventory</span>
                <div className="w-9 h-9 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-charcoal-text">
                {totalStockVolume.toLocaleString()}
              </p>
              <p className="text-xs text-natural-gray mt-1">Total Units / Bags in Stock</p>
            </div>

            <div className="bg-pure-white p-6 rounded-2xl border border-border-gray/70 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-natural-gray uppercase">Crop Varieties</span>
                <div className="w-9 h-9 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest">
                  <Tag className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-charcoal-text">{uniqueCropTypes}</p>
              <p className="text-xs text-fresh-leaf font-semibold mt-1">Distinct Commodities</p>
            </div>

            <div className="bg-pure-white p-6 rounded-2xl border border-border-gray/70 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-natural-gray uppercase">Account Status</span>
                <div className="w-9 h-9 rounded-xl bg-soft-sage flex items-center justify-center text-fresh-leaf">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xl font-bold text-deep-forest">
                {user?.role ? user.role.toUpperCase() : "VERIFIED"}
              </p>
              <p className="text-xs text-natural-gray mt-1">
                {user?.email || user?.phoneNumber || "Registered User"}
              </p>
            </div>
          </div>

          {/* PRODUCE LISTINGS TABLE */}
          <div className="bg-pure-white rounded-2xl border border-border-gray/70 shadow-2xs overflow-hidden">
            <div className="p-6 border-b border-border-gray/60 flex items-center justify-between">
              <h2 className="font-bold text-lg text-charcoal-text">
                Your Produce Harvest Listings
              </h2>
              <span className="text-xs font-semibold text-natural-gray">
                Total: {personalListings.length}
              </span>
            </div>

            {loading ? (
              <div className="p-12 text-center text-natural-gray animate-pulse">
                Fetching your farm listings from the database...
              </div>
            ) : personalListings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-warm-cream/70 border-b border-border-gray/60 text-xs font-bold text-natural-gray uppercase">
                      <th className="py-3.5 px-6">Produce Harvest</th>
                      <th className="py-3.5 px-6">Price / Unit</th>
                      <th className="py-3.5 px-6">Available Stock</th>
                      <th className="py-3.5 px-6">Location</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-gray/60 text-sm">
                    {personalListings.map((item) => {
                      const cropTitle =
                        item.product?.name || item.productName || "Produce Harvest";
                      const catTitle =
                        item.product?.category?.name || item.categoryName || "Crops";
                      const locTitle =
                        item.location ||
                        (item.farmer
                          ? `${item.farmer.lga ? item.farmer.lga + ", " : ""}${item.farmer.state || "Nigeria"}`
                          : "Nigeria");
                      const unitStr = String(item.unit || "Unit");

                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-warm-cream/40 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-soft-sage border border-border-gray shrink-0">
                                <Image
                                  src={getImageUrl(item.image || item.product?.image)}
                                  alt={cropTitle}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <Link
                                  href={`/listings/${item.id}`}
                                  className="font-bold text-charcoal-text hover:text-deep-forest transition-colors line-clamp-1"
                                >
                                  {cropTitle}
                                </Link>
                                <span className="text-xs text-natural-gray">
                                  {catTitle}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6 font-bold text-deep-forest">
                            ₦{item.price ? item.price.toLocaleString() : "0"}{" "}
                            <span className="text-xs font-normal text-natural-gray">
                              / {unitStr}
                            </span>
                          </td>

                          <td className="py-4 px-6 font-semibold text-charcoal-text">
                            {item.quantity} {unitStr}
                          </td>

                          <td className="py-4 px-6 text-xs text-natural-gray">
                            {locTitle}
                          </td>

                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                item.status === "paused"
                                  ? "bg-amber-100 text-amber-800"
                                  : item.status === "sold"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-secondary-container text-on-secondary-container"
                              }`}
                            >
                              {item.status || "active"}
                            </span>
                          </td>

                          <td className="py-4 px-6 text-right space-x-2">
                            <button
                              onClick={() =>
                                handleToggleStatus(item.id, item.status)
                              }
                              className="p-1.5 text-natural-gray hover:text-deep-forest transition-colors cursor-pointer"
                              title={
                                item.status === "paused"
                                  ? "Activate Listing"
                                  : "Pause Listing"
                              }
                            >
                              {item.status === "paused" ? (
                                <PlayCircle className="w-5 h-5 text-fresh-leaf" />
                              ) : (
                                <PauseCircle className="w-5 h-5 text-amber-600" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 text-natural-gray hover:text-error-red transition-colors cursor-pointer"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Empty Dashboard State */
              <div className="p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-soft-sage mx-auto flex items-center justify-center text-deep-forest">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-charcoal-text">
                  No Produce Listed Yet
                </h3>
                <p className="text-xs text-natural-gray max-w-sm mx-auto">
                  You haven&apos;t published any harvest produce listings yet. Post your first crop harvest to start receiving wholesale buyer inquiries.
                </p>
                <Link
                  href="/dashboard/create-listing"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-forest text-pure-white text-xs font-bold rounded-xl"
                >
                  <PlusCircle className="w-4 h-4" /> Create Produce Listing
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
