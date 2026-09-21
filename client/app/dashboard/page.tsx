"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { listingService } from "../services/listing.service";
import { productService } from "../services/product.service";
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
  MapPin,
    ArrowRight,
  ShieldCheck,
  DollarSign,
  Boxes,
  Store,
  MessageCircle,
    Search,
  Building2,
  Truck,
      X,
} from "lucide-react";

// ==========================================
// 1. FARMER DASHBOARD VIEW (NO BROWSE PRODUCE)
// ==========================================
interface DashboardListingItem {
  id: number;
  quantity: number;
  unit: string | number;
  price: number;
  description?: string;
  location?: string;
  image?: string;
  status?: string;
  createdAt?: string;
  productName?: string;
  categoryName?: string;
  product?: {
    id: number;
    name: string;
    image?: string;
    category?: {
      name: string;
    };
  };
  farmer?: {
    id: number;
    farmName?: string;
    state?: string;
    lga?: string;
    user?: {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
    };
  };
}

interface DashboardUserItem {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
}

function FarmerDashboardView({
  user,
  personalListings,
  loading,
  loadPersonalListings,
  handleDelete,
  handleToggleStatus,
  actionError,
  actionSuccess,
}: {
  user: DashboardUserItem | null;
  personalListings: DashboardListingItem[];
  loading: boolean;
  loadPersonalListings: () => void;
  handleDelete: (id: number) => void;
  handleToggleStatus: (id: number, status?: string) => void;
  actionError: string | null;
  actionSuccess: string | null;
}) {
  const [productsModalOpen, setProductsModalOpen] = useState(false);
  const [catalogProducts, setCatalogProducts] = useState<Array<{ id: number; name: string; description?: string; image?: string; category?: { name: string } }>>([]);
  const [loadingCatalog, setLoadingCatalog] = useState(false);

  const activeCount = personalListings.filter((l) => (l.status || "active") === "active").length;
  const grossValue = personalListings.reduce(
    (acc, l) => acc + (Number(l.price) || 0) * (Number(l.quantity) || 0),
    0
  );
  const totalVolume = personalListings.reduce((acc, l) => acc + (Number(l.quantity) || 0), 0);

  // Load catalog products for farmer
  const openCatalogModal = async () => {
    setProductsModalOpen(true);
    setLoadingCatalog(true);
    try {
      const res = await productService.getProducts();
      if (res.success && Array.isArray(res.data)) {
        setCatalogProducts(res.data);
      }
    } catch (err) {
      console.error("Failed to load catalog products:", err);
    } finally {
      setLoadingCatalog(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. TOP GREETING & FARMER ACTIONS BAR */}
      <section className="bg-pure-white border border-border-gray/80 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-soft-sage text-fresh-leaf text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-fresh-leaf animate-pulse" />
              <span>Harvest Season Q1 Active • Direct Farm-Gate Sourcing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text tracking-tight">
              Welcome Back, {user?.firstName || "Farmer"} 👋
            </h1>
            <p className="text-xs sm:text-sm text-natural-gray flex flex-wrap items-center gap-2">
              <span className="font-bold text-charcoal-text">
                {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Farmer Portal"}
              </span>
              <span>•</span>
              <span className="capitalize font-semibold text-deep-forest">Farmer / Producer Account</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-fresh-leaf font-semibold bg-soft-sage px-2 py-0.5 rounded text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Clearinghouse
              </span>
            </p>
          </div>

          {/* Quick Actions for Farmer */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/create-listing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-forest hover:bg-primary text-pure-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Create Produce Listing</span>
            </Link>
            <Link
              href="/dashboard/my-listings"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-soft-sage hover:bg-border-gray text-deep-forest text-xs sm:text-sm font-bold border border-border-gray/60 transition-colors"
            >
              <Boxes className="w-4 h-4" />
              <span>View All Listings</span>
            </Link>
            <button
              onClick={openCatalogModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pure-white hover:bg-soft-sage text-charcoal-text text-xs sm:text-sm font-medium border border-border-gray/70 transition-colors cursor-pointer"
            >
              <Tag className="w-4 h-4 text-deep-forest" />
              <span>View Approved Products</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. PERFORMANCE & INVENTORY SUMMARY METRICS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-pure-white border border-border-gray/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-natural-gray mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Produce Batches</span>
            <div className="w-8 h-8 rounded-lg bg-soft-sage flex items-center justify-center text-deep-forest">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-charcoal-text">{activeCount} Batches</h3>
            <p className="text-xs text-natural-gray mt-1 font-medium">{totalVolume} Total units listed</p>
          </div>
          <div className="mt-4 pt-3 border-t border-border-gray/50 flex items-center justify-between text-xs">
            <span className="text-fresh-leaf font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% In Stock
            </span>
            <Link href="/dashboard/my-listings" className="text-deep-forest font-bold hover:underline">
              Manage →
            </Link>
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
            <p className="text-xs text-natural-gray mt-1 font-medium">Total open inventory valuation</p>
          </div>
          <div className="mt-4 pt-3 border-t border-border-gray/50 flex items-center justify-between text-xs">
            <span className="text-fresh-leaf font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Live Gate Pricing
            </span>
            <span className="text-natural-gray text-[11px]">Real-Time Sync</span>
          </div>
        </div>

        <div className="bg-pure-white border border-border-gray/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-natural-gray mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Trade Security</span>
            <div className="w-8 h-8 rounded-lg bg-soft-sage flex items-center justify-center text-fresh-leaf">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-charcoal-text">Secured</h3>
            <p className="text-xs text-natural-gray mt-1 font-medium">Funds secured until delivery sign-off</p>
          </div>
          <div className="mt-4 pt-3 border-t border-border-gray/50 flex items-center justify-between text-xs">
            <span className="text-deep-forest font-bold">CBN &amp; FMARD Standards</span>
          </div>
        </div>

        <div className="bg-pure-white border border-border-gray/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-natural-gray mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Approved Products</span>
            <div className="w-8 h-8 rounded-lg bg-soft-sage flex items-center justify-center text-deep-forest">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-charcoal-text">Ready to List</h3>
            <p className="text-xs text-natural-gray mt-1 font-medium">Commodity varieties approved for listing</p>
          </div>
          <div className="mt-4 pt-3 border-t border-border-gray/50 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={openCatalogModal}
              className="text-deep-forest font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View Product List →</span>
            </button>
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

      {/* 3. YOUR HARVEST PRODUCE INVENTORY SECTION */}
      <section className="bg-pure-white border border-border-gray/80 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-gray/60">
          <div>
            <h2 className="text-lg font-bold text-charcoal-text">Your Harvest Produce Inventory</h2>
            <p className="text-xs text-natural-gray mt-0.5">
              Manage your live produce listings, toggle active status, and track buyer inquiries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadPersonalListings}
              className="p-2 rounded-lg bg-soft-sage text-deep-forest hover:bg-border-gray/70 transition-colors cursor-pointer"
              title="Refresh listings"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <Link
              href="/dashboard/my-listings"
              className="text-xs font-bold text-deep-forest hover:underline flex items-center gap-1"
            >
              <span>View Full Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-deep-forest border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-natural-gray">Loading your harvest listings...</p>
          </div>
        ) : personalListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalListings.map((item) => {
              const productName = item.product?.name || item.productName || "Produce";
              const categoryName = item.product?.category?.name || item.categoryName || "Grains & Crops";
              const location = item.location || "Nigeria";
              const imageUrl = getImageUrl(item.image || item.product?.image);
              const isPaused = (item.status || "active").toLowerCase() === "paused";

              return (
                <div
                  key={item.id}
                  className="bg-pure-white rounded-2xl border border-border-gray/80 shadow-xs hover:border-fresh-leaf/50 transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-soft-sage overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={productName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-pure-white/95 px-2.5 py-1 rounded-full text-[11px] font-bold text-deep-forest shadow-xs">
                        {categoryName}
                      </div>
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            isPaused
                              ? "bg-amber-100 text-warning-amber"
                              : item.status === "sold"
                              ? "bg-gray-100 text-charcoal-text"
                              : "bg-emerald-100 text-success-green"
                          }`}
                        >
                          {item.status || "Active"}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-1 text-[11px] text-natural-gray">
                        <MapPin className="w-3.5 h-3.5 text-fresh-leaf shrink-0" />
                        <span className="truncate">{location}</span>
                      </div>

                      <Link href={`/listings/${item.id}`}>
                        <h3 className="font-extrabold text-base text-charcoal-text hover:text-deep-forest line-clamp-1">
                          {productName}
                        </h3>
                      </Link>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-natural-gray">Available:</span>{" "}
                          <span className="font-bold text-charcoal-text">{item.quantity} Units</span>
                        </div>
                        <div>
                          <span className="text-natural-gray">Unit Price:</span>{" "}
                          <span className="font-bold text-deep-forest">₦{Number(item.price).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-warm-cream/30 border-t border-border-gray/50 flex items-center justify-between">
                    <Link
                      href={`/listings/${item.id}`}
                      className="text-xs font-bold text-deep-forest hover:underline flex items-center gap-1"
                    >
                      <span>Inspect Listing</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(item.id, item.status)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isPaused
                            ? "text-success-green hover:bg-emerald-50"
                            : "text-warning-amber hover:bg-amber-50"
                        }`}
                        title={isPaused ? "Activate" : "Pause"}
                      >
                        {isPaused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-natural-gray hover:text-error-red hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-soft-sage text-deep-forest flex items-center justify-center mx-auto">
              <Boxes className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-charcoal-text">No Produce Listed Yet</h3>
            <p className="text-xs text-natural-gray max-w-sm mx-auto">
              You currently have zero active produce batches on CropsMarket. Publish your first harvest lot to start connecting with wholesale buyers.
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

      {/* 4. MODAL: VIEW APPROVED PRODUCTS CATALOG */}
      {productsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-pure-white rounded-2xl max-w-2xl w-full p-6 space-y-5 border border-border-gray max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border-gray/60">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-deep-forest" />
                <h3 className="font-extrabold text-base text-charcoal-text">
                  Approved Commodity Products Catalog
                </h3>
              </div>
              <button
                onClick={() => setProductsModalOpen(false)}
                className="p-1.5 text-natural-gray hover:text-charcoal-text rounded-lg hover:bg-soft-sage cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-natural-gray">
              These are the admin-approved crop commodities available on CropsMarket. You can create new produce listings under any of these items.
            </p>

            <div className="overflow-y-auto space-y-3 grow pr-1">
              {loadingCatalog ? (
                <div className="py-12 text-center text-xs text-natural-gray font-bold">
                  Loading product catalog...
                </div>
              ) : catalogProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {catalogProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3.5 rounded-xl border border-border-gray/70 bg-warm-cream/30 hover:border-deep-forest/50 transition-colors flex items-start gap-3"
                    >
                      <div className="relative w-12 h-12 rounded-lg bg-soft-sage overflow-hidden shrink-0">
                        <Image
                          src={getImageUrl(prod.image)}
                          alt={prod.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="grow min-w-0">
                        <h4 className="font-bold text-xs text-charcoal-text truncate">{prod.name}</h4>
                        <p className="text-[11px] text-natural-gray line-clamp-1 mt-0.5">
                          {prod.description || "Certified agricultural crop"}
                        </p>
                        <Link
                          href="/dashboard/create-listing"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-deep-forest hover:underline mt-1.5"
                        >
                          <span>+ List this Product</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-xs text-natural-gray">
                  No approved products found in catalog.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border-gray/60 flex justify-end">
              <button
                onClick={() => setProductsModalOpen(false)}
                className="px-5 py-2.5 bg-deep-forest text-pure-white text-xs font-bold rounded-xl hover:bg-primary transition-colors cursor-pointer"
              >
                Close Catalog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. BUYER DASHBOARD VIEW (BROWSE & INQUIRE)
// ==========================================
function BuyerDashboardView({ user }: { user: DashboardUserItem | null }) {
  const [marketListings, setMarketListings] = useState<DashboardListingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadMarketData() {
      setLoading(true);
      try {
        const res = await listingService.getAllListings({ page: 1, limit: 6 });
        if (res.success && res.data) {
          const list = Array.isArray(res.data.listings)
            ? res.data.listings
            : Array.isArray(res.data)
            ? res.data
            : [];
          setMarketListings(list);
        }
      } catch (err) {
        console.error("Failed to load marketplace listings for buyer:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMarketData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse-produce?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/browse-produce");
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. TOP GREETING & PROCUREMENT QUICK BAR */}
      <section className="bg-pure-white border border-border-gray/80 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-soft-sage text-fresh-leaf text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-fresh-leaf animate-pulse" />
              <span>Commercial Procurement Active • Direct Farm-Gate Sourcing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text tracking-tight">
              Good day, {user?.firstName || "Procurement Buyer"} 👋
            </h1>
            <p className="text-xs sm:text-sm text-natural-gray flex flex-wrap items-center gap-2">
              <span className="font-bold text-charcoal-text">
                {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Commercial Buyer"}
              </span>
              <span>•</span>
              <span className="capitalize font-semibold text-deep-forest">Wholesale Buyer / Mill Account</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-fresh-leaf font-semibold bg-soft-sage px-2 py-0.5 rounded text-xs">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Trader
              </span>
            </p>
          </div>

          {/* Quick CTAs for Buyer */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/browse-produce"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deep-forest hover:bg-primary text-pure-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <Store className="w-4 h-4" />
              <span>Browse Produce Market</span>
            </Link>
          </div>
        </div>

        {/* Quick Search Input */}
        <form onSubmit={handleSearchSubmit} className="mt-6 flex items-center gap-3">
          <div className="relative grow">
            <Search className="w-4 h-4 text-natural-gray absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Quick search produce (e.g. Yellow Maize, Soybeans, Roma Tomatoes)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-gray text-xs sm:text-sm text-charcoal-text bg-warm-cream/30 focus:outline-hidden focus:border-deep-forest"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-deep-forest hover:bg-primary text-pure-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Search Market</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </section>

      {/* 2. BUYER PROCUREMENT METRICS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-pure-white border border-border-gray/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-natural-gray mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Live Produce Lots</span>
            <div className="w-8 h-8 rounded-lg bg-soft-sage flex items-center justify-center text-deep-forest">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-charcoal-text">{marketListings.length}+ Available</h3>
            <p className="text-xs text-natural-gray mt-1 font-medium">Verified farm-gate consignments</p>
          </div>
          <div className="mt-4 pt-3 border-t border-border-gray/50 flex items-center justify-between text-xs">
            <Link href="/browse-produce" className="text-deep-forest font-bold hover:underline flex items-center gap-1">
              <span>Inspect Market →</span>
            </Link>
          </div>
        </div>

        <div className="bg-pure-white border border-border-gray/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-natural-gray mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Direct Farm Sourcing</span>
            <div className="w-8 h-8 rounded-lg bg-soft-sage flex items-center justify-center text-deep-forest">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-deep-forest">0% Middlemen</h3>
            <p className="text-xs text-natural-gray mt-1 font-medium">Negotiate direct with verified farmers</p>
          </div>
          <div className="mt-4 pt-3 border-t border-border-gray/50 flex items-center justify-between text-xs">
            <span className="text-fresh-leaf font-bold">Gate Price Transparency</span>
          </div>
        </div>

        <div className="bg-pure-white border border-border-gray/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-natural-gray mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Payment Protection</span>
            <div className="w-8 h-8 rounded-lg bg-soft-sage flex items-center justify-center text-fresh-leaf">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-charcoal-text">100% Guarded</h3>
            <p className="text-xs text-natural-gray mt-1 font-medium">Funds secured until delivery sign-off</p>
          </div>
          <div className="mt-4 pt-3 border-t border-border-gray/50 flex items-center justify-between text-xs">
            <span className="text-deep-forest font-bold">CBN &amp; FMARD Standards</span>
          </div>
        </div>

        <div className="bg-pure-white border border-border-gray/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-natural-gray mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Haulage &amp; Logistics</span>
            <div className="w-8 h-8 rounded-lg bg-soft-sage flex items-center justify-center text-deep-forest">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-success-green">Nationwide</h3>
            <p className="text-xs text-natural-gray mt-1 font-medium">Self-pickup or verified haulage dispatch</p>
          </div>
          <div className="mt-4 pt-3 border-t border-border-gray/50 flex items-center justify-between text-xs">
            <span className="text-natural-gray">36 States Covered</span>
          </div>
        </div>
      </section>

      {/* 3. AVAILABLE FARM-GATE HARVESTS (DIRECT WHATSAPP & INQUIRY ACTIONS) */}
      <section className="bg-pure-white border border-border-gray/80 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-gray/60">
          <div>
            <h2 className="text-lg font-bold text-charcoal-text">Available Farm-Gate Produce</h2>
            <p className="text-xs text-natural-gray mt-0.5">
              Contact accredited farmers directly on WhatsApp or submit quotes for bulk order fulfillment.
            </p>
          </div>

          <Link
            href="/browse-produce"
            className="text-xs font-bold text-deep-forest hover:underline flex items-center gap-1"
          >
            <span>View All Marketplace Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-deep-forest border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-natural-gray">Loading live produce batches...</p>
          </div>
        ) : marketListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketListings.map((item) => {
              const productName = item.product?.name || item.productName || "Produce";
              const categoryName = item.product?.category?.name || item.categoryName || "Grains & Crops";
              const location = item.location || "Nigeria";
              const farmer = item.farmer;
              const farmerFullName = farmer?.user
                ? `${farmer.user.firstName} ${farmer.user.lastName}`
                : "Verified Farmer";
              const rawPhone = farmer?.user?.phoneNumber || (farmer as unknown as { phoneNumber?: string })?.phoneNumber || "08000000000";
              const whatsappPhone = rawPhone.startsWith("0") ? `234${rawPhone.slice(1)}` : rawPhone;
              const imageUrl = getImageUrl(item.image || item.product?.image);

              return (
                <div
                  key={item.id}
                  className="bg-pure-white rounded-2xl border border-border-gray/80 shadow-xs hover:border-fresh-leaf/50 transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full bg-soft-sage overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={productName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-pure-white/95 px-2.5 py-1 rounded-full text-[11px] font-bold text-deep-forest shadow-xs">
                        {categoryName}
                      </div>
                      <div className="absolute top-3 right-3 bg-charcoal-text/80 text-pure-white px-2.5 py-1 rounded-full text-[10px] font-bold">
                        {item.quantity} In Stock
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-natural-gray">
                        <span className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-fresh-leaf shrink-0" />
                          <span className="truncate max-w-[140px]">{location}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-success-green">
                          <CheckCircle2 className="w-3 h-3" /> Verified Farm
                        </span>
                      </div>

                      <Link href={`/listings/${item.id}`}>
                        <h3 className="font-extrabold text-base text-charcoal-text hover:text-deep-forest line-clamp-1">
                          {productName}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between pt-1 text-xs">
                        <div>
                          <p className="text-[11px] text-natural-gray">Gate Price</p>
                          <p className="text-base font-extrabold text-deep-forest">
                            ₦{Number(item.price).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[11px] text-natural-gray">Farmer</p>
                          <p className="font-bold text-charcoal-text">{farmerFullName}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buyer Direct Action Buttons: WhatsApp & Inspect */}
                  <div className="p-4 bg-warm-cream/30 border-t border-border-gray/50 grid grid-cols-2 gap-2">
                    <a
                      href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                        `Hello ${farmerFullName}, I am a verified buyer on CropsMarket interested in your listing for ${productName} (₦${Number(
                          item.price
                        ).toLocaleString()}/unit). Are you available for supply negotiation?`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 bg-[#25D366] hover:bg-[#1EBE5D] text-pure-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    <Link
                      href={`/listings/${item.id}`}
                      className="py-2.5 px-3 bg-deep-forest hover:bg-primary text-pure-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>Inspect &amp; Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-soft-sage text-deep-forest flex items-center justify-center mx-auto">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-charcoal-text">No Produce Lots Available</h3>
            <p className="text-xs text-natural-gray max-w-sm mx-auto">
              Check back shortly as farmers publish new seasonal harvest consignments.
            </p>
            <Link
              href="/browse-produce"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-forest text-pure-white rounded-xl text-xs font-bold hover:bg-primary transition-colors"
            >
              <Store className="w-4 h-4" /> Browse Marketplace
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

// ==========================================
// 3. MAIN DASHBOARD PAGE
// ==========================================
export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [personalListings, setPersonalListings] = useState<DashboardListingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const isFarmer = (user?.role || "").toLowerCase() === "farmer";

    const loadPersonalListings = useCallback(async () => {
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
    } catch (err: unknown) {
      console.error("Failed to load personal listings", err);
      setActionError("Could not load your listings from the marketplace.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function init() {
      if (isAuthenticated && isFarmer && !ignore) {
        await loadPersonalListings();
      }
    }
    void init();
    return () => {
      ignore = true;
    };
  }, [isAuthenticated, isFarmer, loadPersonalListings]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to permanently delete this produce listing?")) {
      try {
        await listingService.deleteListing(id);
        setPersonalListings((prev) => prev.filter((l) => l.id !== id));
        setActionSuccess("Listing deleted successfully.");
        setTimeout(() => setActionSuccess(null), 3000);
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
      setPersonalListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: nextStatus } : l))
      );
      setActionSuccess(`Listing marked as ${nextStatus}.`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      console.error("Failed to toggle listing status", err);
      setActionError("Failed to update status. Please try again.");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-warm-cream">
        <Navbar />
        <main className="pt-24 grow max-w-7xl mx-auto px-4 w-full flex items-center justify-center">
          <div className="p-8 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-deep-forest border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-charcoal-text">Authenticating dashboard session...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-20 grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {isFarmer ? (
          <FarmerDashboardView
            user={user}
            personalListings={personalListings}
            loading={loading}
            loadPersonalListings={loadPersonalListings}
            handleDelete={handleDelete}
            handleToggleStatus={handleToggleStatus}
            actionError={actionError}
            actionSuccess={actionSuccess}
          />
        ) : (
          <BuyerDashboardView user={user} />
        )}
      </main>

      <Footer />
    </div>
  );
}
