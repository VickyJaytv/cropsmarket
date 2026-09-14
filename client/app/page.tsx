"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import { getImageUrl } from "./utils/imageUtils";
import {
  ShieldCheck,
  TrendingDown,
  Lock,
  Truck,
  CheckCircle2,
  Tag,
  Factory,
  Sparkles,
  Award,
  Filter,
  FileCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Store,
  DollarSign,
  Users,
  Globe,
  Smile,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { isBuyer } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categoriesPills = [
    { label: "Maize & Corn", category: "Grains" },
    { label: "Soybeans", category: "Legumes" },
    { label: "Cassava Tubers", category: "Tubers" },
    { label: "Paddy Rice", category: "Grains" },
    { label: "Sorghum", category: "Grains" },
    { label: "Fresh Tomatoes", category: "Vegetables" },
  ];

  const partners = [
    { name: "Flour Mills Nig.", icon: Factory, color: "text-deep-forest" },
    { name: "Nestlé Nigeria", icon: Award, color: "text-primary" },
    { name: "Olam Agri", icon: Sparkles, color: "text-fresh-leaf" },
    { name: "Honeywell Group", icon: Store, color: "text-harvest-gold" },
    { name: "Kobo360 Haulage", icon: Truck, color: "text-info-blue" },
    { name: "Grand Cereals", icon: Tag, color: "text-deep-forest" },
    { name: "Bisi Supermarkets", icon: Store, color: "text-fresh-leaf" },
    { name: "Dangote Agro", icon: Factory, color: "text-deep-forest" },
  ];

  const faqs = [
    {
      q: "How does CropsMarket escrow protection guarantee my trade?",
      a: "Funds deposited by corporate buyers or agro-processors are securely locked in Moniepoint escrow and are only released to the farmer after physical quality inspection, moisture audit, and signed weighbridge departure at the farm gate.",
    },
    {
      q: "How are produce quality and moisture levels verified?",
      a: "Independent agronomists and certified state ADP extension officers physically test crop batches at registered farm depots. Moisture readings (e.g. under 12.5% for maize) and aflatoxin certifications are attached to every commercial batch.",
    },
    {
      q: "Who handles logistics and freight haulage across Nigeria?",
      a: "CropsMarket partners with vetted transit fleets including Kobo360, GIG Logistics, and local haulage unions. All trucks are equipped with real-time GPS tracking and transit goods insurance from farm gate to your factory silo.",
    },
    {
      q: "Are there any listing or brokerage fees for farmers?",
      a: "No. Listing harvested crops or upcoming harvest cycles on CropsMarket is completely free with zero commission brokers. Farmers receive 100% of their negotiated farm-gate price directly into their accounts.",
    },
    {
      q: "What is the Minimum Order Quantity (MOQ) for bulk purchases?",
      a: "Minimum order quantities vary by crop variety—typically 20 bags (1.0 Metric Ton) for grains and legumes, and 50–100 tubers for yams. Check individual listing tags for specific batch MOQs.",
    },
    {
      q: "How quickly can dispatched farm produce arrive at my warehouse?",
      a: "Intra-state deliveries typically arrive within 12–24 hours, while interstate haulage between northern grain belts and southern industrial corridors takes 2–3 business days with continuous GPS updates.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-20 flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-warm-cream border-b border-border-gray/40">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Hero Text & Actions */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-soft-sage border border-fresh-leaf/20 text-deep-forest text-xs font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-fresh-leaf" />
                  <span>Direct Farm-Gate Marketplace</span>
                </div>

                <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-charcoal-text tracking-tight leading-[1.15]">
                  Fresh Produce From{" "}
                  <span className="text-deep-forest font-black underline decoration-fresh-leaf/40">
                    Trusted Farmers
                  </span>
                </h1>

                <p className="text-lg text-natural-gray max-w-2xl leading-relaxed">
                  Connect directly with verified local farmers. Source fresh wholesale and retail harvest at fair market prices with zero hidden middlemen.
                </p>

                {/* CTAs & Direct Access */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {isBuyer ? (
                    <Link
                      href="/browse-produce"
                      className="inline-flex items-center justify-center h-12 px-6 bg-deep-forest hover:bg-primary text-pure-white font-bold text-sm rounded-xl transition-colors shadow-xs"
                    >
                      Browse produce
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center h-12 px-6 bg-deep-forest hover:bg-primary text-pure-white font-bold text-sm rounded-xl transition-colors shadow-xs"
                    >
                      Browse produce
                    </Link>
                  )}
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center h-12 px-6 bg-pure-white hover:bg-soft-sage text-deep-forest border border-border-gray font-bold text-sm rounded-xl transition-colors shadow-xs"
                  >
                    Sell Your Produce
                  </Link>
                </div>

                {/* Category Quick Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1 max-w-xl">
                  <span className="text-xs font-semibold text-natural-gray flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Popular:
                  </span>
                  {categoriesPills.map((item, idx) => (
                    <Link
                      key={idx}
                      href={`/browse-produce?search=${encodeURIComponent(item.label)}`}
                      className="text-xs bg-pure-white hover:bg-soft-sage border border-border-gray px-2.5 py-1 rounded-full text-natural-gray hover:text-deep-forest transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Trust Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border-gray/60 max-w-xl">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-fresh-leaf shrink-0" />
                    <span className="text-xs font-semibold text-charcoal-text">
                      4,500+ Verified Farmers
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-harvest-gold shrink-0" />
                    <span className="text-xs font-semibold text-charcoal-text">
                      Direct Gate Pricing
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-fresh-leaf shrink-0" />
                    <span className="text-xs font-semibold text-charcoal-text">
                      100% Inspected Quality
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Image & Bento Dispatch Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-4/5 sm:aspect-1/1 lg:aspect-4/5 rounded-2xl overflow-hidden shadow-xl border border-border-gray/60 bg-soft-sage">
                  <Image
                    src={getImageUrl("https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=1000")}
                    alt="African farmer with fresh agricultural harvest"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-deep-forest/80 via-transparent to-transparent" />

                  {/* Overlaid Float Card: Live Field Dispatch */}
                  <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-6 p-4 bg-pure-white/95 backdrop-blur-md rounded-xl shadow-lg border border-border-gray/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-soft-sage flex items-center justify-center text-deep-forest shrink-0">
                        <Sparkles className="w-6 h-6 text-fresh-leaf" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-charcoal-text">
                          Morning Harvest Dispatched
                        </p>
                        <p className="text-xs text-natural-gray">
                          Oyo Agricultural Hub • 20 mins ago
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full shrink-0">
                      Fresh Stock
                    </span>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="hidden sm:flex absolute -top-4 -right-4 p-3 bg-pure-white rounded-xl shadow-md border border-border-gray items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-harvest-gold" />
                  <span className="text-xs font-bold text-charcoal-text">
                    Certified Origin Guaranteed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CROPSMARKET VALUE PROPOSITION */}
        <section className="py-16 lg:py-24 bg-warm-cream border-b border-border-gray/40">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-sage text-deep-forest text-xs font-bold mb-3">
                <ShieldCheck className="w-4 h-4 text-fresh-leaf" />
                <span>Institutional Quality &amp; Trust</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-text tracking-tight">
                Why Leading Agro-Buyers Trust CropsMarket
              </h2>
              <p className="text-natural-gray text-base mt-3">
                Engineered to solve market opacity, commodity price inflation, and quality disputes through transparent gate sourcing and secured escrow settlement.
              </p>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <div className="bg-pure-white rounded-xl p-6 shadow-xs hover:shadow-md transition-all border border-border-gray/60 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest mb-4 group-hover:bg-deep-forest group-hover:text-pure-white transition-colors">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal-text mb-2">
                    Direct Farm-Gate Pricing
                  </h3>
                  <p className="text-sm text-natural-gray leading-relaxed">
                    Zero commission brokers and no hidden middleman markups. Inquire and negotiate commodity pricing directly with accredited commercial farming cooperatives.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-gray/40 flex items-center gap-1.5 text-fresh-leaf text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save 18%–25% on procurement</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-pure-white rounded-xl p-6 shadow-xs hover:shadow-md transition-all border border-border-gray/60 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest mb-4 group-hover:bg-deep-forest group-hover:text-pure-white transition-colors">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal-text mb-2">
                    Certified Quality Grading
                  </h3>
                  <p className="text-sm text-natural-gray leading-relaxed">
                    Stringent moisture content analysis, aflatoxin screening, and physical grain purity certified by certified agronomists prior to dispatch approval.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-gray/40 flex items-center gap-1.5 text-fresh-leaf text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% Quality inspection pass</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-pure-white rounded-xl p-6 shadow-xs hover:shadow-md transition-all border border-border-gray/60 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest mb-4 group-hover:bg-deep-forest group-hover:text-pure-white transition-colors">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal-text mb-2">
                    Moniepoint Escrow Protection
                  </h3>
                  <p className="text-sm text-natural-gray leading-relaxed">
                    Your payments are safely held in an institutional escrow account and released only when weighbridge tonnage and quality specs match your signed bill.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-gray/40 flex items-center gap-1.5 text-fresh-leaf text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Bank-grade safety guarantee</span>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="bg-pure-white rounded-xl p-6 shadow-xs hover:shadow-md transition-all border border-border-gray/60 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest mb-4 group-hover:bg-deep-forest group-hover:text-pure-white transition-colors">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal-text mb-2">
                    Verified Haulage &amp; Logistics
                  </h3>
                  <p className="text-sm text-natural-gray leading-relaxed">
                    Coordinated fleet trucks with real-time GPS tracking and transit insurance from farm gate to your factory silos or distribution hubs nationwide.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-gray/40 flex items-center gap-1.5 text-fresh-leaf text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Real-time GPS transit tracking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED PARTNERS CAROUSEL */}
        <section className="py-12 bg-soft-sage border-b border-border-gray/60">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-bold uppercase tracking-wider text-natural-gray mb-8">
              Trusted by Leading Agribusinesses, FMCG Leaders &amp; Food Processors Across West Africa
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center">
              {partners.map((partner, idx) => {
                const IconComponent = partner.icon;
                return (
                  <div
                    key={idx}
                    className="bg-pure-white/80 hover:bg-pure-white border border-border-gray/60 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all shadow-2xs group cursor-pointer"
                  >
                    <IconComponent className={`w-6 h-6 ${partner.color} transition-colors mb-1.5`} />
                    <span className="text-xs font-bold text-natural-gray group-hover:text-deep-forest transition-colors line-clamp-1">
                      {partner.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="w-full bg-soft-sage py-16 lg:py-24 border-t border-border-gray/60">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-fresh-leaf">
                End-to-End Procurement Flow
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-charcoal-text tracking-tight mt-1">
                How CropsMarket Works
              </h2>
              <p className="text-natural-gray text-base mt-2">
                A transparent, four-step institutional journey connecting verified Nigerian farming hubs to bulk processors, supermarkets, and export aggregators.
              </p>
            </div>

            {/* 4 Step Flow Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-pure-white rounded-xl p-6 shadow-xs border border-border-gray/60 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-warm-cream flex items-center justify-center text-deep-forest text-xl font-extrabold mb-4">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-charcoal-text mb-2">
                    Source or List Produce
                  </h3>
                  <p className="text-xs text-natural-gray leading-relaxed">
                    Buyers browse harvested grain, tuber, and vegetable batches by state and MOQ. Verified farmers list bulk yields directly with zero listing fees.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-gray/40 flex items-center gap-1.5 text-fresh-leaf text-xs font-bold">
                  <Filter className="w-4 h-4" /> Verified farm-gate origin
                </div>
              </div>

              <div className="bg-pure-white rounded-xl p-6 shadow-xs border border-border-gray/60 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-warm-cream flex items-center justify-center text-deep-forest text-xl font-extrabold mb-4">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-charcoal-text mb-2">
                    Inspection &amp; Pricing
                  </h3>
                  <p className="text-xs text-natural-gray leading-relaxed">
                    Agree on transparent unit prices with farmers. Independent field agronomists conduct physical batch quality checks, moisture testing, and weight audits.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-gray/40 flex items-center gap-1.5 text-fresh-leaf text-xs font-bold">
                  <FileCheck className="w-4 h-4" /> Certified lab verification
                </div>
              </div>

              <div className="bg-pure-white rounded-xl p-6 shadow-xs border border-border-gray/60 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-warm-cream flex items-center justify-center text-deep-forest text-xl font-extrabold mb-4">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-charcoal-text mb-2">
                    Secure Escrow Deposit
                  </h3>
                  <p className="text-xs text-natural-gray leading-relaxed">
                    Buyers deposit payment into Moniepoint Escrow. Funds are protected and only disbursed once produce arrives and weighbridge tonnage is signed off.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-gray/40 flex items-center gap-1.5 text-fresh-leaf text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" /> 100% Escrow protected
                </div>
              </div>

              <div className="bg-pure-white rounded-xl p-6 shadow-xs border border-border-gray/60 hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-warm-cream flex items-center justify-center text-deep-forest text-xl font-extrabold mb-4">
                    04
                  </div>
                  <h3 className="text-lg font-bold text-charcoal-text mb-2">
                    Farm-Gate Dispatch
                  </h3>
                  <p className="text-xs text-natural-gray leading-relaxed">
                    Vetted haulage operators load and seal trucks directly at the farm gate with real-time GPS tracking and transit insurance all the way to destination.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-gray/40 flex items-center gap-1.5 text-fresh-leaf text-xs font-bold">
                  <Truck className="w-4 h-4" /> Direct gate-to-store logistics
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FARMER CTA BANNER SECTION */}
        <section className="w-full bg-warm-cream py-16">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl bg-deep-forest text-pure-white overflow-hidden p-8 sm:p-12 lg:p-16 shadow-xl">
              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fresh-leaf/30 text-secondary-fixed text-xs font-bold">
                  <Store className="w-4 h-4" /> Farmer Empowerment Network
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Are You a Farmer? Sell Your Produce Directly to Bulk Buyers
                </h2>

                <p className="text-base sm:text-lg text-soft-sage/90 leading-relaxed">
                  Eliminate commission middlemen, reach thousands of food processors, restaurants, and grocery distributors across the country, and get guaranteed transparent payments.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-harvest-gold shrink-0" />
                    <span className="text-xs font-semibold">Free listing creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-harvest-gold shrink-0" />
                    <span className="text-xs font-semibold">Direct buyer chat access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-harvest-gold shrink-0" />
                    <span className="text-xs font-semibold">Zero listing fees</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    href="/login"
                    className="px-6 py-3.5 bg-fresh-leaf hover:bg-emerald-600 text-pure-white font-bold text-sm rounded-xl transition-colors shadow-md"
                  >
                    Farmer Access Portal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRACK RECORD & IMPACT STATS */}
        <section className="w-full bg-soft-sage py-16 lg:py-24 border-t border-border-gray/60">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-fresh-leaf">
                Track Record &amp; Impact
              </span>
              <h2 className="text-3xl font-bold text-charcoal-text tracking-tight mt-1">
                Built for Agricultural Trust
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-pure-white rounded-xl p-6 shadow-xs text-center flex flex-col items-center border border-border-gray/60">
                <div className="w-12 h-12 rounded-full bg-soft-sage flex items-center justify-center text-deep-forest mb-3">
                  <DollarSign className="w-6 h-6" />
                </div>
                <p className="text-3xl font-extrabold text-deep-forest mb-1">₦1.8B+</p>
                <p className="text-xs font-medium text-natural-gray">Produce Traded</p>
              </div>

              <div className="bg-pure-white rounded-xl p-6 shadow-xs text-center flex flex-col items-center border border-border-gray/60">
                <div className="w-12 h-12 rounded-full bg-soft-sage flex items-center justify-center text-deep-forest mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-3xl font-extrabold text-deep-forest mb-1">4,500+</p>
                <p className="text-xs font-medium text-natural-gray">Verified Farmers</p>
              </div>

              <div className="bg-pure-white rounded-xl p-6 shadow-xs text-center flex flex-col items-center border border-border-gray/60">
                <div className="w-12 h-12 rounded-full bg-soft-sage flex items-center justify-center text-deep-forest mb-3">
                  <Globe className="w-6 h-6" />
                </div>
                <p className="text-3xl font-extrabold text-deep-forest mb-1">36 States</p>
                <p className="text-xs font-medium text-natural-gray">Covered Nationwide</p>
              </div>

              <div className="bg-pure-white rounded-xl p-6 shadow-xs text-center flex flex-col items-center border border-border-gray/60">
                <div className="w-12 h-12 rounded-full bg-soft-sage flex items-center justify-center text-deep-forest mb-3">
                  <Smile className="w-6 h-6" />
                </div>
                <p className="text-3xl font-extrabold text-deep-forest mb-1">99.4%</p>
                <p className="text-xs font-medium text-natural-gray">Order Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS SECTION */}
        <section id="faq-section" className="w-full bg-warm-cream py-16 lg:py-24 border-t border-border-gray/60">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-sage text-deep-forest text-xs font-bold mb-2">
                <HelpCircle className="w-4 h-4 text-fresh-leaf" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-3xl font-bold text-charcoal-text tracking-tight">
                Got Questions? We Have Answers
              </h2>
              <p className="text-natural-gray text-sm mt-2">
                Everything you need to know about sourcing, escrow protection, haulage, and selling directly on CropsMarket.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-pure-white rounded-xl border border-border-gray/60 shadow-2xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm text-charcoal-text flex items-center justify-between gap-4 hover:text-deep-forest transition-colors"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-deep-forest shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-deep-forest shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-0 text-xs text-natural-gray leading-relaxed border-t border-border-gray/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
