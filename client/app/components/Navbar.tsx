"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Leaf,
  Menu,
  X,
  ShoppingBasket,
  User,
  ChevronDown,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Produce", href: "/#browse-produce" },
  { label: "Weather", href: "/#weather-widget" },
  { label: "About Us", href: "/#about-us" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, clearUser } = useAuthStore();

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="w-full bg-secondary text-on-primary py-2 px-4 text-center text-xs md:text-sm font-medium tracking-wide flex items-center justify-center gap-2">
        <span>Direct Farm-to-Buyer Marketplace • Zero Middleman Fees</span>
        <Link
          href="/signup"
          className="underline hover:opacity-80 font-semibold transition-opacity hidden sm:inline"
        >
          Join Marketplace
        </Link>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 w-full bg-surface/95 backdrop-blur-md border-b border-outline-variant/40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Mobile Menu Toggle (Left on Mobile) */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="p-2 -ml-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Logo & Desktop Nav Links (Left side) */}
          <div className="flex items-center gap-8 lg:gap-10">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity"
            >
              <Leaf className="w-7 h-7 text-primary" fill="currentColor" />
              <span className="font-heading text-xl md:text-2xl font-bold tracking-tight text-primary">
                Cropsmarket
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Controls (Desktop & Mobile) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop User / Auth */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-low border border-outline-variant/50">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-on-surface max-w-[120px] truncate">
                    {user.firstName}
                  </span>
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded capitalize font-medium">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={() => clearUser()}
                  className="text-xs text-on-surface-variant hover:text-red-600 transition-colors font-medium cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-on-surface hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary text-on-primary text-xs font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-sm"
                >
                  Create Account
                </Link>
              </div>
            )}

            {/* Basket / Cart Icon with 0 counter (Reference style) */}
            <Link
              href="/#browse-produce"
              className="relative p-2 text-on-surface hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-surface-container-low"
              aria-label="Produce Basket"
            >
              <ShoppingBasket className="w-6 h-6 stroke-[1.75]" />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay (matching Reference Image 3) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-xs flex">
          <div className="w-full max-w-sm bg-primary text-white h-full flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/20">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 -ml-1 text-white hover:opacity-80 transition-opacity"
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7" />
                </button>

                <div className="flex items-center gap-1.5">
                  <Leaf className="w-6 h-6 text-white" fill="currentColor" />
                  <span className="font-heading text-lg font-bold">Cropsmarket</span>
                </div>

                <div className="relative p-1">
                  <ShoppingBasket className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-primary text-[10px] font-bold flex items-center justify-center">
                    0
                  </span>
                </div>
              </div>

              {/* Main Vertical Nav Links */}
              <nav className="flex flex-col gap-5 pt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-heading font-bold text-white hover:text-white/80 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-white/90 hover:text-white pt-2 flex items-center gap-2"
                >
                  <span>+ List Produce</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </nav>
            </div>

            {/* Drawer Bottom Section */}
            <div className="pt-6 border-t border-white/20 space-y-4">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    <span>Signed in as {user.firstName} ({user.role})</span>
                  </div>
                  <button
                    onClick={() => {
                      clearUser();
                      setMobileOpen(false);
                    }}
                    className="text-xs text-white/80 underline hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-sm font-semibold text-white hover:opacity-90"
                  >
                    <User className="w-5 h-5" />
                    <span>Log in</span>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="bg-white text-primary text-center font-bold text-sm py-2.5 px-4 rounded-full shadow hover:bg-white/90 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              )}

              {/* Region Info */}
              <div className="flex items-center justify-between text-xs text-white/70 pt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Nigeria • Local Markets</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold">NGN ₦</span>
              </div>
            </div>
          </div>

          {/* Clickable Backdrop to close */}
          <div
            className="flex-1"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
}

