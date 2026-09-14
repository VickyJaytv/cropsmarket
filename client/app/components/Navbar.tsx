"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  Sprout,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isBuyer, isFarmer, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    ...(isBuyer ? [{ label: "Browse produce", href: "/browse-produce" }] : []),
    { label: "About", href: "/#about" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-pure-white/95 backdrop-blur-md border-b border-border-gray/60 shadow-xs">
      <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-deep-forest flex items-center justify-center text-pure-white shadow-sm transition-transform group-hover:scale-105">
              <Sprout className="w-6 h-6 text-fresh-leaf" />
            </div>
            <span className="font-bold text-xl text-deep-forest tracking-tight">
              Crops<span className="text-fresh-leaf">Market</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-deep-forest ${
                  isActive(link.href)
                    ? "text-deep-forest font-semibold"
                    : "text-natural-gray"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {isFarmer && (
                <Link
                  href="/dashboard/create-listing"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-deep-forest bg-soft-sage hover:bg-border-gray/60 rounded-lg transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Post Listing
                </Link>
              )}
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-pure-white bg-deep-forest hover:bg-primary rounded-lg shadow-xs transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={() => logout()}
                className="p-2 text-natural-gray hover:text-error-red transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-pure-white bg-deep-forest hover:bg-primary rounded-lg shadow-xs transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-charcoal-text hover:text-deep-forest focus:outline-hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-pure-white border-b border-border-gray px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-1.5 transition-colors ${
                  isActive(link.href)
                    ? "text-deep-forest font-semibold"
                    : "text-natural-gray"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-border-gray/60 flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 py-2 px-1 text-sm font-semibold text-deep-forest">
                  <UserIcon className="w-4 h-4" />
                  {user?.firstName} {user?.lastName} ({user?.role})
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-deep-forest text-pure-white rounded-lg text-sm font-semibold"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                {isFarmer && (
                  <Link
                    href="/dashboard/create-listing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-soft-sage text-deep-forest rounded-lg text-sm font-semibold"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create Produce Listing
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-error-red border border-error-red/30 rounded-lg text-sm font-semibold mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </>
            ) : (
              <div className="pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 text-center text-sm font-semibold bg-deep-forest text-pure-white rounded-lg"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
