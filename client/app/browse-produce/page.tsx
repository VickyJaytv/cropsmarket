"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  MapPin,
  Tag,
  SlidersHorizontal,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Package,
  X,
  ArrowRight,
  ChevronDown,
  UserCheck,
  Tractor,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { getImageUrl } from "@/app/utils/imageUtils";

interface Category {
  id: number;
  name: string;
  slug?: string;
  image?: string;
}

interface FarmerUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string;
}

interface FarmerProfile {
  id: number;
  farmName: string;
  address?: string;
  state?: string;
  lga?: string;
  profilePicture?: string | null;
  user?: FarmerUser;
}

interface ListingItem {
  id: number;
  quantity: number;
  unit: number;
  price: number;
  description: string;
  location: string;
  isAvailable: boolean;
  image?: string;
  status?: string;
  createdAt: string;
  productName?: string;
  categoryName?: string;
  product?: {
    id: number;
    name: string;
    slug: string;
    description: string;
    image?: string;
    category?: {
      id: number;
      name: string;
    };
  };
  farmer?: FarmerProfile;
}

const nigerianStates = [
  "All Nigeria",
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

function BrowseProduceContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  // Filter States
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedState, setSelectedState] = useState<string>("All Nigeria");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  // View & Pagination
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"createdAt" | "price" | "quantity">("createdAt");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Data & Loading
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch Categories from Backend
  useEffect(() => {
    let ignore = false;
    async function loadCategories() {
      try {
        const res = await fetch("http://localhost:8090/api/v1/categories");
        if (res.ok && !ignore) {
          const result = await res.json();
          if ((result.success || result.status === "success") && Array.isArray(result.data)) {
            setCategories(result.data);
          }
        }
      } catch (e: unknown) {
        console.error("Failed to load categories:", e);
      }
    }
    loadCategories();
    return () => {
      ignore = true;
    };
  }, []);

  // Fetch Listings with Filters from Backend
  const fetchListings = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", "9");

      if (selectedCategory && selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }
      if (selectedState && selectedState !== "All Nigeria") {
        params.append("state", selectedState);
      }
      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }
      if (minPrice) {
        params.append("minPrice", minPrice);
      }
      if (maxPrice) {
        params.append("maxPrice", maxPrice);
      }

      params.append("sortBy", sortBy);
      params.append("sortOrder", sortOrder);

      const res = await fetch(`http://localhost:8090/api/v1/listings?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if ((json.success || json.status === "success") && json.data) {
          const items = Array.isArray(json.data.listings) ? json.data.listings : [];
          setListings(items);
          setTotalCount(json.data.pagination?.total || items.length);
          setTotalPages(json.data.pagination?.totalPages || 1);
        }
      }
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory, selectedState, searchTerm, minPrice, maxPrice, sortBy, sortOrder]);

  useEffect(() => {
    let ignore = false;
    async function execute() {
      if (!ignore) {
        await fetchListings();
      }
    }
    execute();
    return () => {
      ignore = true;
    };
  }, [fetchListings]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchListings();
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedState("All Nigeria");
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-24 pb-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* PAGE BANNER / HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border-gray/80">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-fresh-leaf font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Direct Farm-Gate Marketplace</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal-text tracking-tight">
                Browse Agricultural Produce
              </h1>
              <p className="text-xs sm:text-sm text-natural-gray max-w-2xl leading-relaxed">
                Connect directly with verified local farmers across 36 states. Wholesale and retail farm-gate prices with zero middlemen markups and verified trade security.
              </p>
            </div>

            {/* Live Indicator */}
            <div className="hidden xl:flex items-center gap-3 bg-soft-sage/80 border border-border-gray/70 px-4 py-2.5 rounded-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-success-green animate-ping" />
              <div className="flex flex-col text-xs">
                <span className="font-bold text-deep-forest">
                  {totalCount} Verified Batches Listed
                </span>
                <span className="text-[11px] text-natural-gray">Real-time data from registered farm hubs</span>
              </div>
            </div>
          </div>

          {/* SEARCH & DISCOVERY DECK */}
          <div className="bg-pure-white rounded-2xl p-4 sm:p-6 shadow-sm border border-border-gray/70 flex flex-col gap-4">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
              {/* Search Query Input */}
              <div className="lg:col-span-5 relative flex items-center">
                <Search className="w-5 h-5 text-natural-gray absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search produce (e.g. Yellow Maize, Cassava Tubers, Roma Tomatoes)..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-warm-cream/40 border border-border-gray text-xs sm:text-sm text-charcoal-text focus:outline-hidden focus:border-deep-forest focus:bg-pure-white transition-all font-medium"
                />
              </div>

              {/* Category Selector */}
              <div className="lg:col-span-3 relative">
                <div className="relative flex items-center">
                  <Tag className="w-4 h-4 text-natural-gray absolute left-3.5 pointer-events-none" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-8 py-3 rounded-xl bg-warm-cream/40 border border-border-gray text-xs sm:text-sm text-charcoal-text focus:outline-hidden focus:border-deep-forest focus:bg-pure-white transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-natural-gray absolute right-3 pointer-events-none" />
                </div>
              </div>

              {/* Location State Selector */}
              <div className="lg:col-span-2 relative">
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 text-natural-gray absolute left-3.5 pointer-events-none" />
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-8 py-3 rounded-xl bg-warm-cream/40 border border-border-gray text-xs sm:text-sm text-charcoal-text focus:outline-hidden focus:border-deep-forest focus:bg-pure-white transition-all font-medium appearance-none cursor-pointer"
                  >
                    {nigerianStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-natural-gray absolute right-3 pointer-events-none" />
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-deep-forest hover:bg-primary text-pure-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter Produce</span>
                </button>
              </div>
            </form>

            {/* Quick Pick Category Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
              <span className="font-bold text-charcoal-text whitespace-nowrap mr-1">Quick Categories:</span>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap font-semibold transition-colors cursor-pointer ${
                  selectedCategory === "All"
                    ? "bg-deep-forest text-pure-white"
                    : "bg-soft-sage text-deep-forest hover:bg-border-gray"
                }`}
              >
                All Produce
              </button>
              {categories.slice(0, 6).map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCategory(c.name);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap font-semibold transition-colors cursor-pointer ${
                    selectedCategory === c.name
                      ? "bg-deep-forest text-pure-white"
                      : "bg-soft-sage text-deep-forest hover:bg-border-gray"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE STATUS & SORT CONTROLS BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-pure-white/80 backdrop-blur-xs p-4 rounded-xl border border-border-gray/60 shadow-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-charcoal-text">
                {totalCount} <span className="font-normal text-natural-gray">available listings</span>
              </span>

              {(selectedCategory !== "All" || selectedState !== "All Nigeria" || searchTerm) && (
                <>
                  <div className="h-4 w-px bg-border-gray hidden sm:block" />
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedCategory !== "All" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-soft-sage text-deep-forest text-xs font-bold">
                        Category: {selectedCategory}
                        <button
                          onClick={() => setSelectedCategory("All")}
                          className="hover:text-error-red cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedState !== "All Nigeria" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-soft-sage text-deep-forest text-xs font-bold">
                        State: {selectedState}
                        <button
                          onClick={() => setSelectedState("All Nigeria")}
                          className="hover:text-error-red cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    <button
                      onClick={handleResetFilters}
                      className="text-error-red hover:underline text-xs font-bold ml-1 cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Sorting & Layout View Controls */}
            <div className="flex items-center gap-4 self-end sm:self-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-natural-gray">Sort By:</span>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sb, so] = e.target.value.split("-");
                    setSortBy(sb as "createdAt" | "price" | "quantity");
                    setSortOrder(so as "ASC" | "DESC");
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-soft-sage text-charcoal-text text-xs font-bold border-none focus:outline-hidden cursor-pointer"
                >
                  <option value="createdAt-DESC">Newest Harvest</option>
                  <option value="price-ASC">Price: Low to High</option>
                  <option value="price-DESC">Price: High to Low</option>
                  <option value="quantity-DESC">Highest Stock</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-soft-sage p-1 rounded-lg border border-border-gray/50">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-pure-white text-deep-forest shadow-xs font-bold"
                      : "text-natural-gray hover:text-charcoal-text"
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === "list"
                      ? "bg-pure-white text-deep-forest shadow-xs font-bold"
                      : "text-natural-gray hover:text-charcoal-text"
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* MAIN 2-COLUMN LAYOUT: SIDEBAR FILTERS & PRODUCE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT SIDEBAR FILTERS */}
            <aside className="lg:col-span-3 bg-pure-white rounded-2xl p-6 shadow-sm border border-border-gray/70 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border-gray/60">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-deep-forest" />
                  <h2 className="font-bold text-sm text-charcoal-text">Filter Criteria</h2>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-fresh-leaf hover:underline font-bold cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Category Radio */}
              <div className="space-y-3">
                <span className="block text-xs font-bold text-charcoal-text uppercase">
                  Categories
                </span>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  <label className="flex items-center gap-2 text-xs text-charcoal-text cursor-pointer hover:text-deep-forest">
                    <input
                      type="radio"
                      name="catRadio"
                      checked={selectedCategory === "All"}
                      onChange={() => {
                        setSelectedCategory("All");
                        setCurrentPage(1);
                      }}
                      className="text-deep-forest accent-deep-forest"
                    />
                    <span>All Produce Categories</span>
                  </label>
                  {categories.map((c) => (
                    <label
                      key={c.id}
                      className="flex items-center gap-2 text-xs text-charcoal-text cursor-pointer hover:text-deep-forest"
                    >
                      <input
                        type="radio"
                        name="catRadio"
                        checked={selectedCategory === c.name}
                        onChange={() => {
                          setSelectedCategory(c.name);
                          setCurrentPage(1);
                        }}
                        className="text-deep-forest accent-deep-forest"
                      />
                      <span>{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter (Naira) */}
              <div className="space-y-3 pt-3 border-t border-border-gray/60">
                <span className="block text-xs font-bold text-charcoal-text uppercase">
                  Price Range (₦)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-natural-gray mb-1">Min (₦)</label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Min ₦"
                      className="w-full px-2.5 py-1.5 bg-warm-cream/40 rounded-lg border border-border-gray text-xs text-charcoal-text focus:outline-hidden focus:border-deep-forest"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-natural-gray mb-1">Max (₦)</label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Max ₦"
                      className="w-full px-2.5 py-1.5 bg-warm-cream/40 rounded-lg border border-border-gray text-xs text-charcoal-text focus:outline-hidden focus:border-deep-forest"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    fetchListings();
                  }}
                  className="w-full py-2 bg-soft-sage text-deep-forest hover:bg-border-gray rounded-lg text-xs font-bold cursor-pointer transition-colors"
                >
                  Apply Price Range
                </button>
              </div>

              {/* Trade Assurance Panel */}
              <div className="p-4 rounded-xl bg-soft-sage/70 border border-border-gray/60 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-deep-forest">
                  <ShieldCheck className="w-4 h-4 text-fresh-leaf" />
                  <span>CropsMarket Assurance</span>
                </div>
                <p className="text-[11px] text-natural-gray leading-relaxed">
                  Every order is protected by institutional verification. Payments are released only when quality specifications are inspected and confirmed.
                </p>
              </div>
            </aside>

            {/* PRODUCE LISTINGS GRID */}
            <section className="lg:col-span-9 space-y-6">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((idx) => (
                    <div
                      key={idx}
                      className="bg-pure-white rounded-2xl border border-border-gray/70 overflow-hidden animate-pulse flex flex-col h-[380px]"
                    >
                      <div className="h-48 bg-soft-sage" />
                      <div className="p-5 space-y-3 flex-1">
                        <div className="h-4 bg-soft-sage rounded w-3/4" />
                        <div className="h-3 bg-soft-sage rounded w-1/2" />
                        <div className="h-6 bg-soft-sage rounded w-1/3 mt-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : listings.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {listings.map((item) => {
                    const productName = item.product?.name || item.productName || "Farm Produce";
                    const categoryName = item.product?.category?.name || item.categoryName || "Grains & Crops";
                    const location = item.location || (item.farmer?.state ? `${item.farmer.lga ? item.farmer.lga + ", " : ""}${item.farmer.state} State` : "Nigeria");
                    const farmName = item.farmer?.farmName || "Accredited Farm Hub";
                    const farmerFullName = item.farmer?.user
                      ? `${item.farmer.user.firstName} ${item.farmer.user.lastName}`
                      : farmName;
                    const imageUrl = getImageUrl(item.image || item.product?.image);

                    return (
                      <div
                        key={item.id}
                        className={`bg-pure-white rounded-2xl border border-border-gray/70 shadow-xs hover:shadow-md hover:border-fresh-leaf/40 transition-all duration-200 overflow-hidden flex ${
                          viewMode === "grid" ? "flex-col" : "flex-col sm:flex-row"
                        }`}
                      >
                        {/* Image Banner */}
                        <div
                          className={`relative overflow-hidden bg-soft-sage shrink-0 ${
                            viewMode === "grid" ? "h-52 w-full" : "h-52 sm:w-64 w-full"
                          }`}
                        >
                          <Image
                            src={imageUrl}
                            alt={productName}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 bg-pure-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-deep-forest shadow-xs">
                            {categoryName}
                          </div>
                          <div className="absolute bottom-3 right-3 bg-charcoal-text/80 backdrop-blur-xs text-pure-white px-2 py-0.5 rounded-md text-[11px] font-bold">
                            {Number(item.quantity).toLocaleString()} In Stock
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col justify-between flex-1 gap-3.5">
                          <div className="space-y-2">
                            {/* Location & Verification */}
                            <div className="flex items-center justify-between text-xs text-natural-gray">
                              <span className="flex items-center gap-1 font-medium truncate">
                                <MapPin className="w-3.5 h-3.5 text-fresh-leaf shrink-0" />
                                <span className="truncate">{location}</span>
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-success-green shrink-0">
                                <CheckCircle2 className="w-3 h-3" /> Verified
                              </span>
                            </div>

                            {/* Product Title */}
                            <Link href={`/listings/${item.id}`}>
                              <h3 className="font-extrabold text-base text-charcoal-text hover:text-deep-forest transition-colors line-clamp-1">
                                {productName}
                              </h3>
                            </Link>

                            {/* Product Description */}
                            <p className="text-xs text-natural-gray line-clamp-2 leading-relaxed">
                              {item.description || item.product?.description || "Freshly harvested premium agricultural produce available directly from verified farm gate."}
                            </p>
                          </div>

                          {/* Real Farmer Profile Attribution Card */}
                          <div className="pt-2.5 border-t border-border-gray/50 flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-deep-forest/10 border border-deep-forest/20 text-deep-forest flex items-center justify-center shrink-0">
                              <Tractor className="w-4 h-4 text-deep-forest" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1">
                                <p className="text-xs font-bold text-charcoal-text truncate">
                                  {farmName}
                                </p>
                                <UserCheck className="w-3 h-3 text-fresh-leaf shrink-0" />
                              </div>
                              <p className="text-[10px] text-natural-gray truncate">
                                Producer: <span className="font-medium text-charcoal-text">{farmerFullName}</span>
                              </p>
                            </div>
                          </div>

                          {/* Price & Action */}
                          <div className="pt-3 border-t border-border-gray/50 flex items-center justify-between">
                            <div>
                              <p className="text-[10px] text-natural-gray font-medium uppercase">Farm-Gate Price</p>
                              <p className="text-base sm:text-lg font-extrabold text-deep-forest">
                                ₦{Number(item.price).toLocaleString()}
                              </p>
                            </div>

                            <Link
                              href={`/listings/${item.id}`}
                              className="px-4 py-2 bg-deep-forest hover:bg-primary text-pure-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                            >
                              <span>Inspect</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-pure-white rounded-2xl border border-border-gray/70 p-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-soft-sage text-deep-forest flex items-center justify-center mx-auto">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-charcoal-text">No Produce Listings Found</h3>
                  <p className="text-xs text-natural-gray max-w-md mx-auto">
                    No active produce listings matched your current filter criteria. Try clearing filters or searching for another commodity.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-deep-forest text-pure-white rounded-xl text-xs font-bold hover:bg-primary transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-6 border-t border-border-gray/60">
                  <p className="text-xs text-natural-gray font-medium">
                    Showing Page <span className="font-bold text-charcoal-text">{currentPage}</span> of{" "}
                    <span className="font-bold text-charcoal-text">{totalPages}</span>
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage <= 1}
                      className="p-2 rounded-lg border border-border-gray text-charcoal-text hover:bg-soft-sage disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button
                        key={pg}
                        onClick={() => setCurrentPage(pg)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                          currentPage === pg
                            ? "bg-deep-forest text-pure-white"
                            : "border border-border-gray text-charcoal-text hover:bg-soft-sage"
                        }`}
                      >
                        {pg}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage >= totalPages}
                      className="p-2 rounded-lg border border-border-gray text-charcoal-text hover:bg-soft-sage disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BrowseProducePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-natural-gray">Loading marketplace produce...</div>}>
      <BrowseProduceContent />
    </Suspense>
  );
}
