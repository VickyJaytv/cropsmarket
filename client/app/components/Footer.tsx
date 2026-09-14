"use client";

import React from "react";
import Link from "next/link";
import { Sprout, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-pure-white border-t border-border-gray/60 pt-12 pb-8 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-deep-forest flex items-center justify-center text-pure-white">
                <Sprout className="w-5 h-5 text-fresh-leaf" />
              </div>
              <span className="font-bold text-xl text-deep-forest tracking-tight">
                Crops<span className="text-fresh-leaf">Market</span>
              </span>
            </Link>
            <p className="text-natural-gray text-sm max-w-sm leading-relaxed">
              Nigeria&apos;s direct farm-gate marketplace bridging commercial farmers with buyers, food processors, and commodity traders with total pricing transparency.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-deep-forest bg-soft-sage px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4 text-fresh-leaf" />
              Accredited Quality &amp; Verified Farmers
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-charcoal-text text-sm mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm text-natural-gray">
              <li>
                <Link href="/browse-produce" className="hover:text-deep-forest transition-colors">
                  All Grains &amp; Cereals
                </Link>
              </li>
              <li>
                <Link href="/browse-produce?category=Legumes" className="hover:text-deep-forest transition-colors">
                  Legumes &amp; Pulses
                </Link>
              </li>
              <li>
                <Link href="/browse-produce?category=Tubers" className="hover:text-deep-forest transition-colors">
                  Tubers &amp; Roots
                </Link>
              </li>
              <li>
                <Link href="/browse-produce?category=Vegetables" className="hover:text-deep-forest transition-colors">
                  Fresh Vegetables
                </Link>
              </li>
              <li>
                <Link href="/browse-produce?category=Fruits" className="hover:text-deep-forest transition-colors">
                  Fresh Fruits
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-charcoal-text text-sm mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-natural-gray">
              <li>
                <Link href="/login" className="hover:text-deep-forest transition-colors">
                  Farmer Portal
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-deep-forest transition-colors">
                  Buyer Terminal
                </Link>
              </li>
              <li>
                <Link href="/#faq-section" className="hover:text-deep-forest transition-colors">
                  Escrow Protection
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-deep-forest transition-colors">
                  User Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-charcoal-text text-sm mb-4">
              Contact &amp; Hubs
            </h4>
            <ul className="space-y-3 text-sm text-natural-gray">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-deep-forest shrink-0 mt-0.5" />
                <span>Agricultural Trade Hub, Oyo State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-deep-forest shrink-0" />
                <span>+234 (0) 800 CROPS MARKET</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-deep-forest shrink-0" />
                <span>support@cropsmarket.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border-gray/60 flex flex-col sm:flex-row items-center justify-between text-xs text-natural-gray gap-4">
          <p>© {new Date().getFullYear()} CropsMarket. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-deep-forest">Privacy Policy</Link>
            <Link href="#" className="hover:text-deep-forest">Terms of Service</Link>
            <Link href="#" className="hover:text-deep-forest">Quality Guarantee</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
