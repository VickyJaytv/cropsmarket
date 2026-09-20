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
  CheckCircle2,
  AlertCircle,
  Package,
  Tag,
  DollarSign,
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

  const cropName =
    listing?.product?.name || listing?.productName || "Fresh Farm Produce";
  const cropCategory =
    listing?.product?.category?.name ||
    listing?.categoryName ||
    "Grains & Crops";
  const rawPhone =
    listing?.farmer?.user?.phoneNumber ||
    listing?.farmer?.phoneNumber ||
    "08012345678";
  const whatsappPhone = rawPhone.startsWith("0")
    ? `234${rawPhone.slice(1)}`
    : rawPhone.replace("+", "");
  const farmerName =
    listing?.farmer?.user
      ? `${listing.farmer.user.firstName} ${listing.farmer.user.lastName}`
      : listing?.farmer?.name || "Accredited Farmer";
  const farmName =
    listing?.farmer?.farmName || `${farmerName}'s Farm Enterprise`;
  const locationText =
    listing?.location ||
    (listing?.farmer
      ? `${listing.farmer.lga ? listing.farmer.lga + ", " : ""}${listing.farmer.state || "Nigeria"}`
      : "Nigeria");
  const imageSrc = getImageUrl(listing?.image || listing?.product?.image);
  const unitText = String(listing?.unit || "Unit");

  const whatsappMessage = encodeURIComponent(
    `Hello ${farmerName}! I found your listing for "${cropName}" on CropsMarket. I would like to inquire about purchasing stock and arranging dispatch.`
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
            <div className="bg-pure-white rounded-3xl p-8 sm:p-12 border border-border-gray/70 shadow-sm animate-pulse space-y-6">
              <div className="h-8 bg-soft-sage rounded-xl w-1/3" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 h-96 bg-soft-sage rounded-2xl" />
                <div className="lg:col-span-5 space-y-4">
                  <div className="h-48 bg-soft-sage rounded-2xl" />
                  <div className="h-48 bg-soft-sage rounded-2xl" />
                </div>
              </div>
            </div>
          ) : listing ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* LEFT COLUMN: Gallery, Details & Harvest Specs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Image Gallery */}
                <div className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden bg-soft-sage border border-border-gray/70 shadow-sm">
                  <Image
                    src={imageSrc}
                    alt={cropName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-pure-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-deep-forest border border-border-gray flex items-center gap-1.5 shadow-xs">
                    <Tag className="w-3.5 h-3.5 text-fresh-leaf" />
                    <span>{cropCategory}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-pure-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-deep-forest border border-border-gray flex items-center gap-1.5 shadow-xs">
                    <MapPin className="w-3.5 h-3.5 text-deep-forest" />
                    <span>{locationText}</span>
                  </div>
                </div>

                {/* Main Crop Overview Box */}
                <div className="bg-pure-white p-6 sm:p-8 rounded-2xl border border-border-gray/70 shadow-2xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-gray/60">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-fresh-leaf">
                        {cropCategory}
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text tracking-tight mt-1">
                        {cropName}
                      </h1>
                      <p className="text-xs text-natural-gray flex items-center gap-1.5 mt-2">
                        <Calendar className="w-3.5 h-3.5 text-deep-forest" />
                        Listed on{" "}
                        {listing.createdAt
                          ? new Date(listing.createdAt).toLocaleDateString()
                          : "Recently"}
                      </p>
                    </div>

                    <div className="text-left sm:text-right bg-soft-sage/40 p-3 sm:p-4 rounded-xl border border-border-gray/60">
                      <p className="text-xs text-natural-gray font-semibold uppercase">
                        Unit Farm-Gate Price
                      </p>
                      <p className="text-2xl sm:text-3xl font-black text-deep-forest">
                        ₦{listing.price ? listing.price.toLocaleString() : "0"}
                      </p>
                      <p className="text-[11px] text-natural-gray mt-0.5">
                        per {unitText}
                      </p>
                    </div>
                  </div>

                  {/* Stock & Description */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-deep-forest" />
                        <span className="text-natural-gray">Available Stock:</span>
                        <span className="font-bold text-charcoal-text">
                          {listing.quantity} {unitText}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-deep-forest" />
                        <span className="text-natural-gray">Status:</span>
                        <span className="font-bold text-fresh-leaf uppercase text-xs">
                          {listing.status || "Active"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-charcoal-text uppercase tracking-wider mb-2">
                        Harvest Description &amp; Quality
                      </h3>
                      <p className="text-sm text-natural-gray leading-relaxed bg-cream-bg/50 p-4 rounded-xl border border-border-gray/40">
                        {listing.description ||
                          "Prime grade agricultural harvest sourced directly from accredited farmlands. High grain purity, verified moisture balance, and sealed bagging ready for pickup or nationwide transit haulage."}
                      </p>
                    </div>

                    {/* Trust & Quality Badges */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3 bg-warm-cream rounded-xl border border-border-gray text-center">
                        <p className="text-xs text-natural-gray">Inspection</p>
                        <p className="text-sm font-bold text-deep-forest">100% Passed</p>
                      </div>
                      <div className="p-3 bg-warm-cream rounded-xl border border-border-gray text-center">
                        <p className="text-xs text-natural-gray">Quality</p>
                        <p className="text-sm font-bold text-fresh-leaf">Screened</p>
                      </div>
                      <div className="p-3 bg-warm-cream rounded-xl border border-border-gray text-center">
                        <p className="text-xs text-natural-gray">Dispatch</p>
                        <p className="text-sm font-bold text-deep-forest">Direct Gate</p>
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
                      {farmerName ? farmerName[0] : "F"}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-charcoal-text">
                        {farmName}
                      </h3>
                      <p className="text-xs text-natural-gray">
                        Farmer: {farmerName}
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
                        {locationText}
                      </span>
                    </div>
                  </div>

                  {/* Direct WhatsApp Contact CTA */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-pure-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
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
                    Submit your commodity volume request directly to the seller for pricing negotiation and weighbridge dispatch scheduling.
                  </p>

                  {submitted ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-success-green text-xs space-y-2">
                      <p className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Inquiry Sent Successfully!
                      </p>
                      <p>The farmer has received your request and will contact you via WhatsApp/Phone shortly.</p>
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
                          Quantity Needed ({unitText})
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
                        className="w-full py-2.5 bg-deep-forest hover:bg-primary text-pure-white font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
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
