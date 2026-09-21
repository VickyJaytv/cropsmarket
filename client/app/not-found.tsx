"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import {
  Sprout,
  ArrowLeft,
  Home,
  Store,
  LayoutDashboard,
  HelpCircle,
  ShieldCheck,
  Search,
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number>(10);
  const [autoRedirect, setAutoRedirect] = useState<boolean>(false);

  useEffect(() => {
    if (!autoRedirect) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoRedirect, router]);

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-24 grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full bg-pure-white rounded-3xl border border-border-gray/80 shadow-xl p-8 sm:p-12 text-center space-y-6">
          {/* Top Badge & Graphic */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-soft-sage flex items-center justify-center text-deep-forest mb-2">
              <Sprout className="w-10 h-10 text-fresh-leaf animate-bounce" />
            </div>
            <span className="absolute -bottom-1 bg-harvest-gold text-charcoal-text text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
              404 Error
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-charcoal-text tracking-tight">
              Page Not Found
            </h1>
            <p className="text-xs sm:text-sm text-natural-gray max-w-md mx-auto leading-relaxed">
              The page, harvest consignment, or marketplace route you are looking for does not exist, has been relocated, or is temporarily unavailable.
            </p>
          </div>

          {/* Action Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/"
              className="py-3 px-4 bg-deep-forest hover:bg-primary text-pure-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/browse-produce"
              className="py-3 px-4 bg-soft-sage hover:bg-border-gray text-deep-forest font-bold text-xs rounded-xl transition-colors border border-border-gray/70 flex items-center justify-center gap-2"
            >
              <Store className="w-4 h-4" />
              <span>Browse Produce</span>
            </Link>

            <Link
              href="/dashboard"
              className="py-3 px-4 bg-warm-cream/50 hover:bg-warm-cream text-charcoal-text font-bold text-xs rounded-xl transition-colors border border-border-gray/60 flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-deep-forest" />
              <span>User Dashboard</span>
            </Link>

            <Link
              href="/signup"
              className="py-3 px-4 bg-warm-cream/50 hover:bg-warm-cream text-charcoal-text font-bold text-xs rounded-xl transition-colors border border-border-gray/60 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-fresh-leaf" />
              <span>Create Account</span>
            </Link>
          </div>

          {/* Auto-redirect Toggle */}
          <div className="pt-4 border-t border-border-gray/60 flex items-center justify-between text-[11px] text-natural-gray">
            {autoRedirect ? (
              <p>
                Redirecting to home in <span className="font-bold text-deep-forest">{countdown}s</span>...
              </p>
            ) : (
              <p>Need assistance finding a crop lot?</p>
            )}
            <button
              type="button"
              onClick={() => setAutoRedirect(!autoRedirect)}
              className="font-bold text-deep-forest hover:underline cursor-pointer"
            >
              {autoRedirect ? "Cancel Auto-Redirect" : "Auto-Redirect to Home"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
