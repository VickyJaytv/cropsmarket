"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { listingService } from "../../services/listing.service";
import { getImageUrl } from "../../utils/imageUtils";
import {
  ShieldCheck,
  MapPin,
  MessageCircle,
  Phone,
  ArrowLeft,
    CheckCircle2,
  AlertCircle,
  Package,
  Tag,
    Truck,
  Warehouse,
  Shield,
    Send,
    } from "lucide-react";

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const listingId = Number(resolvedParams.id);

  interface ListingDetailType {
  id: number;
  quantity: number;
  unit: string | number;
  price: number;
  description?: string;
  location?: string;
  locationState?: string;
  locationLGA?: string;
  image?: string;
  status?: string;
  createdAt?: string;
  productName?: string;
  categoryName?: string;
  product?: {
    id: number;
    name: string;
    description?: string;
    image?: string;
    category?: {
      id: number;
      name: string;
    };
  };
  farmer?: {
    id: number;
    farmName?: string;
    address?: string;
    state?: string;
    lga?: string;
    user?: {
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      email?: string;
    };
  };
}

  const [listing, setListing] = useState<ListingDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inquiry form states
  const [requestedVolume, setRequestedVolume] = useState<number>(1);
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [inquiryNotes, setInquiryNotes] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      setError(null);
      try {
        const res = await listingService.getListingById(listingId);
        if (res.success && res.data) {
          setListing(res.data);
          if (res.data.quantity) {
            setRequestedVolume(Math.min(10, res.data.quantity));
          }
        } else {
          setError("Produce listing not found.");
        }
      } catch (err: unknown) {
        console.error("Failed to fetch listing detail:", err);
        setError("Failed to load listing information from the marketplace.");
      } finally {
        setLoading(false);
      }
    }
    if (listingId) {
      fetchDetail();
    }
  }, [listingId]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (buyerName && buyerPhone) {
      setInquirySubmitted(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-warm-cream">
        <Navbar />
        <main className="pt-24 grow max-w-7xl mx-auto px-4 w-full flex items-center justify-center">
          <div className="p-8 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-deep-forest border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-charcoal-text">Loading produce specification...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex flex-col bg-warm-cream">
        <Navbar />
        <main className="pt-24 grow max-w-7xl mx-auto px-4 w-full flex items-center justify-center">
          <div className="bg-pure-white rounded-2xl p-8 border border-border-gray max-w-md text-center space-y-4 shadow-sm">
            <AlertCircle className="w-10 h-10 text-error-red mx-auto" />
            <h2 className="text-lg font-bold text-charcoal-text">Listing Not Found</h2>
            <p className="text-xs text-natural-gray">{error || "The requested listing does not exist."}</p>
            <Link
              href="/browse-produce"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-deep-forest text-pure-white rounded-xl text-xs font-bold hover:bg-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Marketplace
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const productName = listing.product?.name || listing.productName || "Fresh Farm Produce";
  const categoryName = listing.product?.category?.name || listing.categoryName || "Grains & Cereals";
  const farmer = listing.farmer;
  const farmName = farmer?.farmName || "Accredited Farm Cooperative";
  const farmerFullName = farmer?.user
    ? `${farmer.user.firstName} ${farmer.user.lastName}`
    : "Verified Farmer";
  const farmerPhone = farmer?.user?.phoneNumber || (farmer as unknown as { phoneNumber?: string })?.phoneNumber || "08000000000";
  const farmerState = farmer?.state || (listing as unknown as { locationState?: string })?.locationState || "Nigeria";
  const farmerLga = farmer?.lga || (listing as unknown as { locationLGA?: string })?.locationLGA || "";
  const locationText = listing.location || `${farmerLga ? farmerLga + ", " : ""}${farmerState} State`;
  const unitPrice = Number(listing.price) || 0;
  const availableQty = Number(listing.quantity) || 0;
  const totalValuation = unitPrice * requestedVolume;
  const imageUrl = getImageUrl(listing.image || listing.product?.image);

  const whatsappPhone = farmerPhone.startsWith("0")
    ? `234${farmerPhone.slice(1)}`
    : farmerPhone;

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-20 grow">
        {/* TRADE ASSURANCE TOP RIBBON */}
        <aside className="w-full bg-soft-sage text-deep-forest border-b border-border-gray/70 py-2.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-fresh-leaf shrink-0" />
              <span className="font-bold text-charcoal-text">CropsMarket Trade Protection:</span>
              <span className="text-natural-gray hidden md:inline">
                Funds remain securely guarded until moisture, weight, and grade specs are verified on delivery.
              </span>
            </div>
            <span className="text-deep-forest font-bold text-[11px] flex items-center gap-1">
              <span>ADP Inspection Aligned</span>
              <span>•</span>
              <span>100% Farm-Gate Guarantee</span>
            </span>
          </div>
        </aside>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* 1. BREADCRUMBS */}
          <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-natural-gray">
            <Link href="/" className="hover:text-deep-forest transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/browse-produce" className="hover:text-deep-forest transition-colors">
              Marketplace Listings
            </Link>
            <span>/</span>
            <span className="text-deep-forest font-semibold">{categoryName}</span>
            <span>/</span>
            <span className="text-charcoal-text font-bold truncate max-w-xs">{productName}</span>
          </nav>

          {/* 2. HEADER SIGNALS & TITLE */}
          <section className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-success-green">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Farmer
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-soft-sage text-deep-forest">
                <Package className="w-3.5 h-3.5" /> In Stock ({availableQty} Available)
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-warning-amber">
                <Tag className="w-3.5 h-3.5" /> Direct Farm-Gate Price
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-charcoal-text">
                <Shield className="w-3.5 h-3.5 text-deep-forest" /> Trade Protected
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal-text tracking-tight">
                  {productName}
                </h1>
                <p className="text-xs sm:text-sm text-natural-gray flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1 text-charcoal-text font-semibold">
                    <MapPin className="w-4 h-4 text-fresh-leaf" />
                    {locationText}
                  </span>
                  <span>•</span>
                  <span>Batch ID: #OYS-LST-{listing.id.toString().padStart(4, "0")}</span>
                  <span>•</span>
                  <span>Listed on {listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : "Active Batch"}</span>
                </p>
              </div>

              {/* Top Quick Price Badge */}
              <div className="bg-pure-white border border-border-gray/80 p-3.5 rounded-2xl shadow-xs flex items-center gap-4">
                <div>
                  <p className="text-[11px] text-natural-gray font-semibold uppercase">Farm-Gate Unit Price</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-deep-forest">
                    ₦{unitPrice.toLocaleString()}
                  </p>
                </div>
                <div className="h-8 w-px bg-border-gray" />
                <div>
                  <p className="text-[11px] text-natural-gray font-semibold uppercase">Total Available</p>
                  <p className="text-base sm:text-lg font-bold text-charcoal-text">
                    {availableQty} Units
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. MAIN SPLIT LAYOUT (LEFT: 65% SPECIFICATIONS, RIGHT: 35% ACTION / FARMER CARD) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-8 space-y-8">
              {/* Image Preview Banner */}
              <section className="bg-pure-white rounded-2xl border border-border-gray/70 overflow-hidden shadow-xs space-y-3">
                <div className="relative w-full aspect-16/10 bg-soft-sage overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={productName}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-pure-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-2 text-xs font-bold text-deep-forest">
                    <span className="w-2.5 h-2.5 rounded-full bg-fresh-leaf animate-pulse" />
                    <span>Verified Real Produce Photo</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-charcoal-text/80 backdrop-blur-xs text-pure-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5" />
                    <span>{categoryName}</span>
                  </div>
                </div>
              </section>

              {/* Detailed Produce Specifications Table */}
              <section className="bg-pure-white p-6 sm:p-8 rounded-2xl border border-border-gray/70 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border-gray/60">
                  <div>
                    <h2 className="text-lg font-bold text-charcoal-text">
                      Produce Specifications &amp; Metadata
                    </h2>
                    <p className="text-xs text-natural-gray mt-0.5">
                      Verified from direct farm-gate batch inspection logs.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-fresh-leaf bg-soft-sage px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active Listing
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-warm-cream/50 border border-border-gray/40">
                    <span className="text-xs text-natural-gray font-medium">Commodity Product</span>
                    <span className="text-xs font-bold text-charcoal-text">{productName}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-warm-cream/50 border border-border-gray/40">
                    <span className="text-xs text-natural-gray font-medium">Category</span>
                    <span className="text-xs font-bold text-charcoal-text">{categoryName}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-warm-cream/50 border border-border-gray/40">
                    <span className="text-xs text-natural-gray font-medium">Available Quantity</span>
                    <span className="text-xs font-bold text-deep-forest">{availableQty} Units</span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-warm-cream/50 border border-border-gray/40">
                    <span className="text-xs text-natural-gray font-medium">Unit Price</span>
                    <span className="text-xs font-bold text-deep-forest">₦{unitPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-warm-cream/50 border border-border-gray/40">
                    <span className="text-xs text-natural-gray font-medium">Farm Origin</span>
                    <span className="text-xs font-bold text-charcoal-text">{locationText}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-warm-cream/50 border border-border-gray/40">
                    <span className="text-xs text-natural-gray font-medium">Listing Status</span>
                    <span className="text-xs font-bold text-success-green uppercase">
                      {listing.status || "Active"}
                    </span>
                  </div>
                </div>

                {/* Description Narrative */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-sm font-bold text-charcoal-text">Field &amp; Harvest Quality Notes</h3>
                  <p className="text-xs sm:text-sm text-natural-gray leading-relaxed bg-warm-cream/30 p-4 rounded-xl border border-border-gray/50">
                    {listing.description ||
                      listing.product?.description ||
                      "Freshly harvested commercial-grade agricultural produce available directly from verified farm gate with zero middlemen markup. Available for immediate weighbridge inspection, haulage scheduling, and secure payment settlement."}
                  </p>
                </div>

                {/* Logistics & Fulfillment Methods */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-charcoal-text">Fulfillment &amp; Dispatch Options</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-soft-sage/60 border border-border-gray/60 space-y-1.5">
                      <div className="flex items-center gap-2 text-deep-forest font-bold text-xs">
                        <Warehouse className="w-4 h-4" />
                        <span>Self-Pickup at Farm Depot</span>
                      </div>
                      <p className="text-[11px] text-natural-gray leading-relaxed">
                        Dedicated loading access for trailers, 30-ton haulage trucks, and vans at the farm warehouse.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-soft-sage/60 border border-border-gray/60 space-y-1.5">
                      <div className="flex items-center gap-2 text-deep-forest font-bold text-xs">
                        <Truck className="w-4 h-4" />
                        <span>Verified Logistics Network</span>
                      </div>
                      <p className="text-[11px] text-natural-gray leading-relaxed">
                        Haulage dispatch available to Lagos, Ibadan, Abuja, Kano, and Port Harcourt with tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: ACTION PANEL & FARMER PROFILE */}
            <aside className="lg:col-span-4 space-y-6 sticky top-24">
              {/* Order & Price Calculator Card */}
              <div className="bg-pure-white rounded-2xl p-6 border border-border-gray/70 shadow-sm space-y-5">
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-natural-gray uppercase tracking-wider">
                    Total Order Value Estimate
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-deep-forest">
                      ₦{totalValuation.toLocaleString()}
                    </span>
                    <span className="text-xs text-natural-gray">({requestedVolume} units)</span>
                  </div>
                </div>

                {/* Volume Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-charcoal-text uppercase">
                    Select Purchase Volume (Units)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={availableQty || 1000}
                      value={requestedVolume}
                      onChange={(e) => setRequestedVolume(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border-gray text-sm font-bold text-charcoal-text bg-warm-cream/30 focus:outline-hidden focus:border-deep-forest"
                    />
                    <span className="text-xs font-bold text-natural-gray whitespace-nowrap">
                      / {availableQty} max
                    </span>
                  </div>
                </div>

                {/* Direct Negotiation CTAs */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                      `Hello ${farmerFullName}, I am interested in procuring ${requestedVolume} units of ${productName} (Batch #${listing.id}) listed on CropsMarket for ₦${totalValuation.toLocaleString()}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-pure-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Negotiate via WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${farmerPhone}`}
                    className="w-full py-3 bg-soft-sage hover:bg-border-gray text-deep-forest font-bold text-xs rounded-xl transition-colors border border-border-gray/70 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Direct Farm Desk ({farmerPhone})</span>
                  </a>
                </div>

                {/* Protection Badge */}
                <div className="pt-4 border-t border-border-gray/60 flex items-center gap-2 text-[11px] text-natural-gray">
                  <ShieldCheck className="w-4 h-4 text-fresh-leaf shrink-0" />
                  <span>Secure direct payment guaranteed by CropsMarket clearing protocol.</span>
                </div>
              </div>

              {/* Verified Farmer Profile Card */}
              <div className="bg-pure-white rounded-2xl p-6 border border-border-gray/70 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-soft-sage border-2 border-fresh-leaf/30 flex items-center justify-center text-deep-forest font-bold text-base">
                    {farmerFullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-charcoal-text flex items-center gap-1.5">
                      <span>{farmerFullName}</span>
                      <CheckCircle2 className="w-4 h-4 text-success-green" />
                    </h3>
                    <p className="text-xs text-natural-gray">{farmName}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-charcoal-text pt-2 border-t border-border-gray/50">
                  <div className="flex items-center justify-between">
                    <span className="text-natural-gray">Farm Address:</span>
                    <span className="font-semibold text-right">{farmer?.address || locationText}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-natural-gray">LGA / State:</span>
                    <span className="font-semibold">{farmerLga ? `${farmerLga}, ` : ""}{farmerState}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-natural-gray">Identity Verification:</span>
                    <span className="font-bold text-success-green">ADP &amp; FMARD Verified</span>
                  </div>
                </div>
              </div>

              {/* Direct Quote Request Form */}
              <div className="bg-pure-white rounded-2xl p-6 border border-border-gray/70 shadow-sm space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-charcoal-text flex items-center gap-1.5">
                    <Send className="w-4 h-4 text-deep-forest" />
                    <span>Submit Inquiry to Farmer</span>
                  </h3>
                  <p className="text-[11px] text-natural-gray">
                    Receive verified weighbridge scheduling and pricing confirmation.
                  </p>
                </div>

                {inquirySubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-success-green text-xs font-bold text-center space-y-1">
                    <p>Inquiry Sent Successfully!</p>
                    <p className="text-[11px] font-normal text-natural-gray">
                      The farmer has been notified and will reach out via phone or WhatsApp.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="e.g. Alhaji Tunde Bakare"
                        className="w-full px-3 py-2 rounded-xl border border-border-gray text-xs text-charcoal-text bg-warm-cream/30 focus:outline-hidden focus:border-deep-forest"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                        Your Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="08012345678"
                        className="w-full px-3 py-2 rounded-xl border border-border-gray text-xs text-charcoal-text bg-warm-cream/30 focus:outline-hidden focus:border-deep-forest"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                        Message / Custom Requirements
                      </label>
                      <textarea
                        rows={2}
                        value={inquiryNotes}
                        onChange={(e) => setInquiryNotes(e.target.value)}
                        placeholder="e.g. Inquiring for 50 bags dispatch to Lagos..."
                        className="w-full px-3 py-2 rounded-xl border border-border-gray text-xs text-charcoal-text bg-warm-cream/30 focus:outline-hidden focus:border-deep-forest"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-deep-forest hover:bg-primary text-pure-white font-bold text-xs rounded-xl transition-colors shadow-xs cursor-pointer"
                    >
                      Send Inquiry Request
                    </button>
                  </form>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
