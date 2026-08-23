import Link from "next/link";
import { Search, MapPin, ChevronDown, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[580px] md:min-h-[660px] lg:min-h-[720px] flex items-end bg-surface-container overflow-hidden">
      {/* Full-Bleed Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfdN_EnnibV6GTk1W2JKBsoNxs60JgTwQtBdx9HiqunwnvoWn8tqpnQSd_NUFsrnLkzv5iOrGQMKhUpN84nTMRIIF9OG-kwHDcrNebYOrnaVMuaV4YeGGZkszBctn70Kp21lqXEH5cu4gGvvHRpMOIaS07riI5X5IjaUK4Cvx9ol7nn986ikmlel3vEkLRmnwRwszyZlb8-jwJQ27iiOXW1jypTs5zZ80YKlMhBqUmdQ4l6r9goZ5x')",
          }}
        />
        {/* Cinematic Gradient Overlays for optimal contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Hero Content (Bottom-Left Aligned matching Reference Pattern) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 pt-24">
        <div className="max-w-3xl space-y-4 md:space-y-6">
          {/* Main Large Editorial Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
            Fresh farm produce just got way closer.
          </h1>

          {/* Subtitle / Tagline */}
          <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 font-medium max-w-xl leading-relaxed">
            Direct from verified local farmers to smart buyers. No middlemen, full transparency.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="#browse-produce"
              className="inline-flex items-center justify-center bg-primary hover:bg-secondary text-on-primary font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
            >
              Shop Produce
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-colors"
            >
              <span>+ List Produce</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          {/* Integrated Search Bar */}
          <div className="pt-4 max-w-2xl">
            <div className="bg-surface/95 backdrop-blur-md rounded-2xl md:rounded-full p-1.5 shadow-2xl flex flex-col md:flex-row items-center gap-1 border border-outline-variant/60">
              <div className="flex-grow flex items-center px-4 w-full md:w-auto py-1">
                <Search className="w-5 h-5 text-primary mr-2.5 shrink-0" />
                <input
                  type="text"
                  placeholder="Search produce (e.g., Tomato, Onion, Maize)..."
                  className="w-full bg-transparent border-none text-sm text-on-surface placeholder-on-surface-variant/80 py-2.5 outline-none"
                />
              </div>

              <div className="hidden md:block w-px h-6 bg-outline-variant/80 mx-1" />

              <div className="flex items-center px-4 w-full md:w-auto py-1 border-t md:border-t-0 border-outline-variant/40">
                <MapPin className="w-4 h-4 text-on-surface-variant mr-2 shrink-0" />
                <select className="bg-transparent border-none text-xs sm:text-sm font-medium text-on-surface cursor-pointer w-full md:w-36 appearance-none outline-none pr-4">
                  <option>All Locations</option>
                  <option>Lagos</option>
                  <option>Kano</option>
                  <option>Oyo</option>
                  <option>Kaduna</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant -ml-3 pointer-events-none shrink-0" />
              </div>

              <button
                type="button"
                className="w-full md:w-auto bg-primary hover:bg-secondary text-on-primary text-xs font-bold tracking-wider uppercase px-6 py-3 rounded-xl md:rounded-full transition-all shrink-0 cursor-pointer shadow-sm"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

