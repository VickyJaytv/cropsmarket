"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { listingService } from "../services/listing.service";
import { useListingStore, ProduceListing } from "../store/useListingStore";
import {
  PlusCircle,
  Package,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  Trash2,
  PauseCircle,
  PlayCircle,
  MapPin,
  Tag,
  ShieldCheck,
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
    try {
      const res = await listingService.getPersonalListings();
      if (res.success && Array.isArray(res.data)) {
        setPersonalListings(res.data);
      } else if (res.data?.listings) {
        setPersonalListings(res.data.listings);
      } else {
        setPersonalListings([]);
      }
    } catch (err) {
      console.error("Error loading farmer personal listings", err);
      setPersonalListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadPersonalListings();
    }
  }, [isAuthenticated]);

  // Handle Delete Listing
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this produce listing?")) {
      try {
        await listingService.deleteListing(id);
        loadPersonalListings();
      } catch (err) {
        setActionError("Failed to delete listing.");
      }
    }
  };

  // Handle Toggle Pause/Activate
  const handleToggleStatus = async (id: number, currentStatus?: string) => {
    const nextStatus = currentStatus === "paused" ? "active" : "paused";
    try {
      await listingService.updateListing(id, { status: nextStatus });
      loadPersonalListings();
    } catch (err) {
      setActionError("Failed to update listing status.");
    }
  };

  const activeCount = personalListings.filter((l) => l.status !== "paused" && l.status !== "sold").length;
  const totalVolume = personalListings.reduce((sum, l) => sum + (l.quantity || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-20 flex-1">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header & Quick Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border-gray/60">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-sage text-deep-forest text-xs font-bold mb-2">
                <ShieldCheck className="w-4 h-4 text-fresh-leaf" />
                <span>Farmer Control Panel</span>
              </div>
              <h1 className="text-3xl font-extrabold text-charcoal-text tracking-tight">
                Farmer Trading Dashboard
              </h1>
              <p className="text-natural-gray text-sm mt-1">
                Manage your active produce listings, track stock volumes, and view buyer inquiries.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadPersonalListings}
                className="p-2.5 bg-pure-white border border-border-gray rounded-xl text-natural-gray hover:text-deep-forest transition-colors shadow-2xs"
                title="Refresh Listings"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
              <Link
                href="/dashboard/create-listing"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-forest hover:bg-primary text-pure-white font-bold text-sm rounded-xl shadow-xs transition-colors"
              >
                <PlusCircle className="w-5 h-5" /> Post New Harvest
              </Link>
            </div>
          </div>

          {actionError && (
            <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-error-red text-xs font-bold flex items-center justify-between">
              <span>{actionError}</span>
              <button onClick={() => setActionError(null)}>Dismiss</button>
            </div>
          )}

          {/* METRIC OVERVIEW CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-pure-white p-6 rounded-2xl border border-border-gray/70 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-natural-gray uppercase">Active Listings</span>
                <div className="w-9 h-9 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-charcoal-text">{activeCount}</p>
              <p className="text-xs text-fresh-leaf font-semibold mt-1">Live on Marketplace</p>
            </div>

            <div className="bg-pure-white p-6 rounded-2xl border border-border-gray/70 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-natural-gray uppercase">Total Volume</span>
                <div className="w-9 h-9 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-charcoal-text">{totalVolume.toLocaleString()}</p>
              <p className="text-xs text-natural-gray mt-1">Units / Tons Listed</p>
            </div>

            <div className="bg-pure-white p-6 rounded-2xl border border-border-gray/70 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-natural-gray uppercase">Buyer Inquiries</span>
                <div className="w-9 h-9 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-black text-charcoal-text">12</p>
              <p className="text-xs text-fresh-leaf font-semibold mt-1">Direct WhatsApp Requests</p>
            </div>

            <div className="bg-pure-white p-6 rounded-2xl border border-border-gray/70 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-natural-gray uppercase">Verification</span>
                <div className="w-9 h-9 rounded-xl bg-soft-sage flex items-center justify-center text-fresh-leaf">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <p className="text-xl font-bold text-deep-forest">Accredited</p>
              <p className="text-xs text-natural-gray mt-1">Certified Farm Gate</p>
            </div>
          </div>

          {/* PRODUCE LISTINGS TABLE & CARDS */}
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
              <div className="p-8 text-center text-natural-gray animate-pulse">
                Loading your farm produce listings...
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
                    {personalListings.map((item) => (
                      <tr key={item.id} className="hover:bg-warm-cream/40 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-soft-sage border border-border-gray shrink-0">
                              <Image
                                src={
                                  item.image ||
                                  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=200"
                                }
                                alt={item.productName || "Crop"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <Link
                                href={`/listings/${item.id}`}
                                className="font-bold text-charcoal-text hover:text-deep-forest transition-colors line-clamp-1"
                              >
                                {item.productName || "Dry White Maize"}
                              </Link>
                              <span className="text-xs text-natural-gray">
                                {item.categoryName || "Grains"}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 font-bold text-deep-forest">
                          ₦{item.price ? item.price.toLocaleString() : "285,000"}{" "}
                          <span className="text-xs font-normal text-natural-gray">
                            / {item.unit || "Ton"}
                          </span>
                        </td>

                        <td className="py-4 px-6 font-semibold text-charcoal-text">
                          {item.quantity} {item.unit || "Tons"}
                        </td>

                        <td className="py-4 px-6 text-xs text-natural-gray">
                          {item.locationState || "Oyo State"}
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
                            onClick={() => handleToggleStatus(item.id, item.status)}
                            className="p-1.5 text-natural-gray hover:text-deep-forest transition-colors"
                            title={item.status === "paused" ? "Activate Listing" : "Pause Listing"}
                          >
                            {item.status === "paused" ? (
                              <PlayCircle className="w-5 h-5 text-fresh-leaf" />
                            ) : (
                              <PauseCircle className="w-5 h-5 text-amber-600" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-natural-gray hover:text-error-red transition-colors"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
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
