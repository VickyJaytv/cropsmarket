"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Truck,
  ArrowRight,
  Boxes,
  Lock,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-20 flex-1">
        {/* 1. HERO MISSION SECTION */}
        <section className="bg-deep-forest text-pure-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#40916c_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-harvest-gold" />
              <span>Institutional Commodity Exchange</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Transforming Agricultural Trade Through Direct Farm-Gate Connectivity
            </h1>

            <p className="text-sm sm:text-base text-soft-sage/90 max-w-3xl mx-auto leading-relaxed">
              CropsMarket is Nigeria&apos;s direct farm-gate clearinghouse connecting commercial farming cooperatives with industrial food processors, exporters, and wholesale buyers under institutional trade security.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/signup"
                className="px-6 py-3.5 bg-harvest-gold hover:bg-amber-500 text-charcoal-text font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <span>Create Verified Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/browse-produce"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-pure-white border border-white/20 font-bold text-sm rounded-xl transition-all backdrop-blur-xs flex items-center gap-2"
              >
                <Boxes className="w-4 h-4" />
                <span>Browse Marketplace</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 2. CORE PILLARS / HOW WE OPERATE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-xs font-bold text-fresh-leaf uppercase tracking-wider">
              The CropsMarket Standard
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text tracking-tight">
              Why Commercial Buyers and Farmers Choose Us
            </h3>
            <p className="text-xs sm:text-sm text-natural-gray">
              Eliminating market opacity, quality disputes, and payment risks across Nigerian agricultural corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-pure-white p-8 rounded-2xl border border-border-gray/80 shadow-xs space-y-4 hover:border-fresh-leaf/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-soft-sage text-deep-forest flex items-center justify-center font-bold">
                <Lock className="w-6 h-6 text-fresh-leaf" />
              </div>
              <h4 className="text-lg font-bold text-charcoal-text">Institutional Trade Vault</h4>
              <p className="text-xs sm:text-sm text-natural-gray leading-relaxed">
                Buyer funds stay securely protected and are only disbursed after digital weighbridge and moisture compliance sign-off.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-pure-white p-8 rounded-2xl border border-border-gray/80 shadow-xs space-y-4 hover:border-fresh-leaf/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-soft-sage text-deep-forest flex items-center justify-center font-bold">
                <Award className="w-6 h-6 text-fresh-leaf" />
              </div>
              <h4 className="text-lg font-bold text-charcoal-text">Certified Agronomic Quality</h4>
              <p className="text-xs sm:text-sm text-natural-gray leading-relaxed">
                Every batch listed is verified with moisture percentage, aflatoxin safety, and purity levels aligned with FMARD and export trade standards.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-pure-white p-8 rounded-2xl border border-border-gray/80 shadow-xs space-y-4 hover:border-fresh-leaf/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-soft-sage text-deep-forest flex items-center justify-center font-bold">
                <Truck className="w-6 h-6 text-fresh-leaf" />
              </div>
              <h4 className="text-lg font-bold text-charcoal-text">0% Middlemen &amp; Fair Gate Pricing</h4>
              <p className="text-xs sm:text-sm text-natural-gray leading-relaxed">
                Direct trade between farmers and processors eliminates speculative middleman inflation, ensuring optimal farmer margins and fair wholesale procurement.
              </p>
            </div>
          </div>
        </section>

        {/* 3. AGRICULTURAL CORRIDORS COVERAGE */}
        <section className="bg-pure-white border-y border-border-gray/70 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-fresh-leaf uppercase tracking-wider">
                Nationwide Sourcing Reach
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal-text tracking-tight">
                Sourcing Across Nigeria&apos;s Agricultural Belts
              </h2>
              <p className="text-xs sm:text-sm text-natural-gray leading-relaxed">
                From the grain silos of Kaduna and Kano to the fertile cassava corridors of Oyo and the food basket of Benue, CropsMarket connects commercial buyers directly to accredited cooperatives in 36 states.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-warm-cream/50 border border-border-gray/60 space-y-1">
                  <p className="text-xl font-extrabold text-deep-forest">36 States</p>
                  <p className="text-xs text-natural-gray">Active Farming Hubs</p>
                </div>
                <div className="p-4 rounded-xl bg-warm-cream/50 border border-border-gray/60 space-y-1">
                  <p className="text-xl font-extrabold text-deep-forest">4,500+ MT</p>
                  <p className="text-xs text-natural-gray">Monthly Produce Traded</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-16/10 rounded-2xl overflow-hidden shadow-md border border-border-gray/70">
              <Image
                src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000"
                alt="Nigerian Commercial Farm Harvesting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-xs text-pure-white font-bold">
                  Verified Farm Gate Inspection • Oyo State Agricultural Belt
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CALL TO ACTION */}
        <section className="max-w-5xl mx-auto px-4 py-16 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text">
            Ready to Experience Transparent Farm-Gate Trading?
          </h2>
          <p className="text-xs sm:text-sm text-natural-gray max-w-xl mx-auto">
            Join verified commercial buyers and farmers on Nigeria&apos;s leading agricultural trade clearinghouse.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/signup"
              className="px-6 py-3.5 bg-deep-forest hover:bg-primary text-pure-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              <span>Get Started as Farmer or Buyer</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/browse-produce"
              className="px-6 py-3.5 bg-pure-white hover:bg-soft-sage text-charcoal-text border border-border-gray/80 font-bold text-xs sm:text-sm rounded-xl transition-all"
            >
              Browse Live Marketplace
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
