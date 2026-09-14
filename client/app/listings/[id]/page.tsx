"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { listingService } from "../../services/listing.service";
import { ProduceListing } from "../../store/useListingStore";
import { getImageUrl } from "../../utils/imageUtils";
import {
  ShieldCheck,
  MapPin,
  MessageCircle,
  Send,
  ArrowLeft,
  Calendar,
  Award,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const listingId = Number(resolvedParams.id);

  const [listing, setListing] = useState<ProduceListing | null>(null);
  const [loading, setLoading] = useState(true);

  // Inquiry Form State
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [quantityReq, setQuantityReq] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        const res = await listingService.getListingById(listingId);
        if (res.success && res.data) {
          setListing(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch listing detail", err);
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
      setSubmitted(true);
    }
  };

  const whatsappPhone =
    listing?.farmer?.phoneNumber || "2348012345678";
  const whatsappMessage = encodeURIComponent(
    `Hello! I am inquiring about your harvest listing for "${
      listing?.productName || "Dry White Maize"
    }" on CropsMarket. I would like to discuss order volume and dispatch terms.`
  );
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-20 flex-1">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Back */}
          <Link
            href="/browse-produce"
            className="inline-flex items-center gap-2 text-xs font-bold text-natural-gray hover:text-deep-forest mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Produce Marketplace
          </Link>

          {loading ? (
            <div className="bg-pure-white p-8 rounded-2xl border border-border-gray h-96 animate-pulse" />
          ) : listing ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: Produce Image & Specs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Image Gallery */}
                <div className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden bg-soft-sage border border-border-gray/70 shadow-sm">
                  <Image
                    src={getImageUrl(listing.image)}
                    alt={listing.productName || "Produce harvest"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-pure-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-deep-forest border border-border-gray flex items-center gap-1.5 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-fresh-leaf" />
                    Verified Farm-Gate Origin
                  </div>
                </div>

                {/* Produce Specs & Details */}
                <div className="bg-pure-white p-6 sm:p-8 rounded-2xl border border-border-gray/70 shadow-2xs space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-fresh-leaf uppercase mb-1">
                      <span>{listing.categoryName || "Grains & Crops"}</span>
                      <span>•</span>
                      <span>{listing.status || "Active Listing"}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text">
                      {listing.productName || "Dry White Maize (Commercial Harvest)"}
                    </h1>
                    <div className="flex items-center gap-4 text-xs text-natural-gray mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-deep-forest" />
                        {listing.locationState || "Oyo State"}, Nigeria
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-deep-forest" />
                        Harvested Sept 2026
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-soft-sage border border-border-gray/60 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-natural-gray">Commodity Price</p>
                      <p className="text-2xl font-black text-deep-forest">
                        ₦{listing.price ? listing.price.toLocaleString() : "285,000"}{" "}
                        <span className="text-sm font-normal text-natural-gray">
                          / {listing.unit || "Metric Ton"}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-natural-gray">Available Stock</p>
                      <p className="text-sm font-bold text-charcoal-text">
                        {listing.quantity ? listing.quantity.toLocaleString() : "50"}{" "}
                        {listing.unit || "Tons"}
                      </p>
                    </div>
                  </div>

                  {/* Produce Description */}
                  <div>
                    <h3 className="font-bold text-sm text-charcoal-text uppercase mb-2">
                      Harvest &amp; Commodity Description
                    </h3>
                    <p className="text-sm text-natural-gray leading-relaxed">
                      {listing.description ||
                        "Premium dry white maize harvested from accredited commercial farms in Oyo State. Mechanically threshed, winnowed, and dried down to 12.5% moisture content suitable for immediate industrial milling or long-term warehouse storage."}
                    </p>
                  </div>

                  {/* Certified Quality Specs Table */}
                  <div>
                    <h3 className="font-bold text-sm text-charcoal-text uppercase mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-harvest-gold" /> Quality Grading &amp; Inspection Specs
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 bg-warm-cream rounded-xl border border-border-gray text-center">
                        <p className="text-xs text-natural-gray">Moisture</p>
                        <p className="text-sm font-bold text-deep-forest">12.5% Max</p>
                      </div>
                      <div className="p-3 bg-warm-cream rounded-xl border border-border-gray text-center">
                        <p className="text-xs text-natural-gray">Grain Purity</p>
                        <p className="text-sm font-bold text-deep-forest">99% Clean</p>
                      </div>
                      <div className="p-3 bg-warm-cream rounded-xl border border-border-gray text-center">
                        <p className="text-xs text-natural-gray">Aflatoxin</p>
                        <p className="text-sm font-bold text-fresh-leaf">Screened</p>
                      </div>
                      <div className="p-3 bg-warm-cream rounded-xl border border-border-gray text-center">
                        <p className="text-xs text-natural-gray">Packaging</p>
                        <p className="text-sm font-bold text-deep-forest">50kg Bags</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Farmer Info & Inquiry Card */}
              <div className="lg:col-span-5 space-y-6">
                {/* Farmer Profile Card */}
                <div className="bg-pure-white p-6 rounded-2xl border border-border-gray/70 shadow-2xs space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-deep-forest text-pure-white flex items-center justify-center font-bold text-lg">
                      {listing.farmer?.name ? listing.farmer.name[0] : "F"}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-charcoal-text">
                        {listing.farmer?.farmName || "Green Acres Commercial Farm"}
                      </h3>
                      <p className="text-xs text-natural-gray">
                        Managed by {listing.farmer?.name || "Farmer Representative"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-gray/60 space-y-2 text-xs text-natural-gray">
                    <div className="flex items-center justify-between">
                      <span>Verification Status:</span>
                      <span className="font-semibold text-fresh-leaf flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified Farmer
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Farm Hub:</span>
                      <span className="font-semibold text-charcoal-text">
                        {listing.locationState || "Oyo State"}
                      </span>
                    </div>
                  </div>

                  {/* Direct WhatsApp Contact CTA */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-pure-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" /> Chat Farmer on WhatsApp
                  </a>
                </div>

                {/* Inquiry Submission Form */}
                <div className="bg-pure-white p-6 rounded-2xl border border-border-gray/70 shadow-2xs space-y-4">
                  <h3 className="font-bold text-base text-charcoal-text flex items-center gap-2">
                    <Send className="w-4 h-4 text-deep-forest" /> Send Direct Inquiry
                  </h3>
                  <p className="text-xs text-natural-gray">
                    Submit your commodity quantity request directly to the seller for pricing negotiation and weighbridge delivery schedules.
                  </p>

                  {submitted ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-success-green text-xs space-y-2">
                      <p className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Inquiry Sent Successfully!
                      </p>
                      <p>The farmer has received your request and will contact your phone number shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                          Your Name / Company
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Flour Mills Rep"
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          className="w-full px-3 py-2 border border-border-gray rounded-xl text-xs text-charcoal-text"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="08012345678"
                          value={buyerPhone}
                          onChange={(e) => setBuyerPhone(e.target.value)}
                          className="w-full px-3 py-2 border border-border-gray rounded-xl text-xs text-charcoal-text"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                          Quantity Needed ({listing.unit || "Tons"})
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 20"
                          value={quantityReq}
                          onChange={(e) => setQuantityReq(e.target.value)}
                          className="w-full px-3 py-2 border border-border-gray rounded-xl text-xs text-charcoal-text"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                          Inquiry Message
                        </label>
                        <textarea
                          rows={3}
                          placeholder="State delivery destination and payment terms..."
                          value={inquiryMessage}
                          onChange={(e) => setInquiryMessage(e.target.value)}
                          className="w-full px-3 py-2 border border-border-gray rounded-xl text-xs text-charcoal-text"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-deep-forest hover:bg-primary text-pure-white font-bold text-xs rounded-xl shadow-2xs transition-colors"
                      >
                        Submit Buyer Inquiry
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-pure-white p-12 rounded-2xl border border-border-gray text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-error-red mx-auto" />
              <h2 className="text-xl font-bold text-charcoal-text">Listing Not Found</h2>
              <p className="text-sm text-natural-gray">
                The requested produce harvest listing could not be found or has been paused by the seller.
              </p>
              <Link
                href="/browse-produce"
                className="inline-flex px-4 py-2 bg-deep-forest text-pure-white font-bold text-xs rounded-xl"
              >
                Browse Available Produce
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
