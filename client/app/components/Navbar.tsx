"use client";

import { useState } from "react";
import { Leaf, Bell, Menu, ChevronDown, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Listings", href: "/listings", active: false },
  { label: "Weather", href: "/weather", active: false },
  { label: "About Us", href: "/about", active: false },
  { label: "Contact", href: "/contact", active: false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-outline-variant shadow-sm w-full top-0 sticky z-50">
      <div className="flex justify-between items-center px-4 md:px-20 h-16 md:h-20 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
          <Leaf className="w-7 h-7" fill="currentColor" />
          <span className="font-heading text-2xl font-bold text-primary">Cropsmarket</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-base">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`py-2 transition-colors hover:text-primary ${
                link.active
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "text-on-surface-variant"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* List Produce Button */}
          <button className="hidden md:flex items-center justify-center bg-primary text-on-primary text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap">
            + List Produce
          </button>

          {/* Notification Bell */}
          <button className="flex items-center justify-center p-2 rounded-full hover:bg-surface-variant transition-colors">
            <Bell className="w-5 h-5 text-on-surface-variant" />
          </button>

          {/* User Avatar */}
          <button className="hidden md:flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-surface-variant transition-colors">
            <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=Ramesh&background=2E7D32&color=fff&size=32"
                alt="Ramesh"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:flex flex-col items-start">
              <span className="text-xs font-semibold text-on-surface">Ramesh</span>
              <span className="text-[10px] text-on-surface-variant">Farmer</span>
            </div>
            <ChevronDown className="w-4 h-4 text-on-surface-variant" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-outline-variant bg-surface">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  link.active
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button className="mt-2 flex items-center justify-center bg-primary text-on-primary text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
              + List Produce
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
