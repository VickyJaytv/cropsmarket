"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { listingService } from "../../services/listing.service";
import { getImageUrl } from "../../utils/imageUtils";
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
  MapPin,
  ExternalLink,
  Search,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Boxes,
} from "lucide-react";

export default function MyListingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "sold" | "paused">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user && (user.role || "").toLowerCase() !== "farmer") {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, authLoading, user, router]);

  const loadPersonalListings = async () => {
    setLoading(true);
    setActionError(null);
    try {
      const res = await listingService.getPersonalListings();
      if (res.success && Array.isArray(res.data?.listings)) {
        setListings(res.data.listings);
      } else if (Array.isArray(res.data)) {
        setListings(res.data);
      } else {
        setListings([]);
      }
    } catch (err: any) {
      console.error("Failed to load personal listings:", err);
      setActionError("Could not load your listings from the marketplace.");
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
    if (window.confirm("Are you sure you want to permanently delete this produce listing?")) {
      try {
        await listingService.deleteListing(id);
        setListings((prev) => prev.filter((l) => l.id !== id));
        setActionSuccess("Produce listing deleted successfully.");
        setTimeout(() => setActionSuccess(null), 3000);
      } catch (err) {
        console.error("Failed to delete listing:", err);
        setActionError("Failed to delete listing. Please try again.");
      }
    }
  };

  const handleToggleStatus = async (id: number, currentStatus?: string) => {
    const nextStatus = currentStatus === "paused" ? "active" : "paused";
    try {
      await listingService.updateListing(id, { status: nextStatus });
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: nextStatus } : l))
      );
      setActionSuccess(`Listing marked as ${nextStatus}.`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      console.error("Failed to toggle listing status:", err);
      setActionError("Failed to update status. Please try again.");
    }
  };

  // Filter listings
  const filteredListings = listings.filter((item) => {
    const statusMatch =
      filterStatus === "all" ? true : item.status?.toLowerCase() === filterStatus;
    const nameMatch = searchQuery.trim()
      ? (item.product?.name || item.description || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true;
    return statusMatch && nameMatch;
  });

  // Calculate Metrics
  const activeCount = listings.filter((l) => (l.status || "active") === "active").length;
  const grossValue = listings.reduce(
    (acc, l) => acc + (Number(l.price) || 0) * (Number(l.quantity) || 0),
    0
  );
  const totalQuantity = listings.reduce((acc, l) => acc + (Number(l.quantity) || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-20 grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        {/* TOP GREETING & QUICK ACTIONS BAR */}
        <section className="bg-pure-white border border-border-gray/80 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-soft-sage text-fresh-leaf text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-fresh-leaf animate-pulse" />
                <span>Harvest Season Active • Direct Farm-Gate Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text tracking-tight">
                My Produce Listings
              </h1>
              <p className="text-xs sm:text-sm text-natural-gray flex flex-wrap items-center gap-2">
                <span className="font-bold text-charcoal-text">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Verified Farmer"}
                </span>
                <span>•</span>
                <span>Manage open inventory, pause batches, and update prices in real-time</span>
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard/create-listing"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-forest hover:bg-primary text-pure-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Create New Listing</span>
              </Link>
              <button
                onClick={loadPersonalListings}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-soft-sage hover:bg-border-gray text-deep-forest text-xs sm:text-sm font-bold border border-border-gray/60 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </section>

        {/* METRICS ROW */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-pure-white border border-border-gray/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-natural-gray mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active Batches</span>
              <div className="w-8 h-8 rounded-lg bg-soft-sage flex items-center justify-center text-deep-forest">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-charcoal-text">{activeCount} Batches</h3>
              <p className="text-xs text-natural-gray mt-1 font-medium">{totalQuantity} Total units on offer</p>
            </div>
          </div>

          <div className="bg-pure-white border border-border-gray/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-natural-gray mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Gross Produce Value</span>
              <div className="w-8 h-8 rounded-lg bg-soft-sage flex items-center justify-center text-deep-forest">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-deep-forest">₦{grossValue.toLocaleString()}</h3>
              <p className="text-xs text-natural-gray mt-1">Total open inventory valuation</p>
            </div>
          </div>

          <div className="bg-pure-white border border-border-gray/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-natural-gray mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Escrow Security</span>
              <div className="w-8 h-8 rounded-lg bg-soft-sage flex items-center justify-center text-fresh-leaf">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-charcoal-text">100% Protected</h3>
              <p className="text-xs text-natural-gray mt-1">Guaranteed neutral escrow clearing</p>
            </div>
          </div>

          <div className="bg-pure-white border border-border-gray/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-natural-gray mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Marketplace Status</span>
              <div className="w-8 h-8 rounded-lg bg-soft-sage flex items-center justify-center text-deep-forest">
                <CheckCircle2 className="w-4 h-4 text-success-green" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-success-green">Verified Active</h3>
              <p className="text-xs text-natural-gray mt-1">Live in marketplace produce index</p>
            </div>
          </div>
        </section>

        {/* FEEDBACK ALERTS */}
        {actionError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-error-red text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{actionError}</span>
          </div>
        )}
        {actionSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-success-green text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* LISTINGS MANAGEMENT TABLE & CONTROLS */}
        <section className="bg-pure-white border border-border-gray/80 rounded-2xl p-6 shadow-sm space-y-6">
          {/* Header, Search & Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border-gray/60">
            {/* Status Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {(["all", "active", "paused", "sold"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                    filterStatus === st
                      ? "bg-deep-forest text-pure-white shadow-xs"
                      : "bg-soft-sage text-charcoal-text hover:bg-border-gray/60"
                  }`}
                >
                  {st} Listings (
                  {st === "all"
                    ? listings.length
                    : listings.filter((l) => (l.status || "active").toLowerCase() === st).length}
                  )
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-natural-gray absolute left-3.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search my batches..."
                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-border-gray text-xs text-charcoal-text bg-warm-cream/30 focus:outline-hidden focus:border-deep-forest"
              />
            </div>
          </div>

          {/* Table / List */}
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-8 h-8 border-4 border-deep-forest border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold text-natural-gray">Loading your produce listings...</p>
            </div>
          ) : filteredListings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border-gray/60 text-natural-gray uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Produce / Product</th>
                    <th className="py-3 px-4">Available Stock</th>
                    <th className="py-3 px-4">Unit Price</th>
                    <th className="py-3 px-4">Total Value</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-gray/40">
                  {filteredListings.map((item) => {
                    const productName = item.product?.name || item.productName || "Produce";
                    const categoryName = item.product?.category?.name || item.categoryName || "Grains & Crops";
                    const location = item.location || "Nigeria";
                    const imageUrl = getImageUrl(item.image || item.product?.image);
                    const totalLot = (Number(item.price) || 0) * (Number(item.quantity) || 0);
                    const isPaused = (item.status || "active").toLowerCase() === "paused";

                    return (
                      <tr key={item.id} className="hover:bg-warm-cream/30 transition-colors">
                        {/* Produce Column */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-soft-sage shrink-0 border border-border-gray/60">
                              <Image
                                src={imageUrl}
                                alt={productName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <Link
                                href={`/listings/${item.id}`}
                                className="font-bold text-sm text-charcoal-text hover:text-deep-forest hover:underline"
                              >
                                {productName}
                              </Link>
                              <p className="text-[11px] text-natural-gray">{categoryName}</p>
                            </div>
                          </div>
                        </td>

                        {/* Quantity */}
                        <td className="py-4 px-4">
                          <span className="font-bold text-charcoal-text text-sm">
                            {item.quantity}
                          </span>{" "}
                          <span className="text-natural-gray">Units</span>
                        </td>

                        {/* Unit Price */}
                        <td className="py-4 px-4 font-bold text-deep-forest text-sm">
                          ₦{Number(item.price).toLocaleString()}
                        </td>

                        {/* Total Value */}
                        <td className="py-4 px-4 font-bold text-charcoal-text">
                          ₦{totalLot.toLocaleString()}
                        </td>

                        {/* Location */}
                        <td className="py-4 px-4 text-natural-gray font-medium">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-fresh-leaf shrink-0" />
                            <span className="truncate max-w-[140px]">{location}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              isPaused
                                ? "bg-amber-100 text-warning-amber"
                                : item.status === "sold"
                                ? "bg-gray-100 text-charcoal-text"
                                : "bg-emerald-100 text-success-green"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isPaused
                                  ? "bg-warning-amber"
                                  : item.status === "sold"
                                  ? "bg-charcoal-text"
                                  : "bg-success-green"
                              }`}
                            />
                            {item.status || "Active"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/listings/${item.id}`}
                              className="p-1.5 rounded-lg text-natural-gray hover:text-deep-forest hover:bg-soft-sage transition-colors"
                              title="View Public Listing"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleToggleStatus(item.id, item.status)}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                isPaused
                                  ? "text-success-green hover:bg-emerald-50"
                                  : "text-warning-amber hover:bg-amber-50"
                              }`}
                              title={isPaused ? "Activate Listing" : "Pause Listing"}
                            >
                              {isPaused ? (
                                <PlayCircle className="w-4 h-4" />
                              ) : (
                                <PauseCircle className="w-4 h-4" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 rounded-lg text-natural-gray hover:text-error-red hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-soft-sage text-deep-forest flex items-center justify-center mx-auto">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-charcoal-text">No Produce Listings Found</h3>
              <p className="text-xs text-natural-gray max-w-sm mx-auto">
                You haven&apos;t listed any crop batches under this filter yet. Create your first listing to start receiving buyer inquiries.
              </p>
              <Link
                href="/dashboard/create-listing"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-forest text-pure-white rounded-xl text-xs font-bold hover:bg-primary transition-colors"
              >
                <PlusCircle className="w-4 h-4" /> + Create First Listing
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
