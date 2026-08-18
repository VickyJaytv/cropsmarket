import Link from "next/link";

const desktopLinks = [
  "Privacy Policy",
  "Terms of Service",
  "Help Center",
  "Verified Farmers",
  "Buyer Protection",
];

const mobileLinks = ["Privacy Policy", "Terms of Service", "Help Center"];

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant w-full mt-auto">
      {/* Desktop Footer */}
      <div className="hidden md:flex flex-row justify-between items-center px-20 py-6 w-full max-w-7xl mx-auto gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-lg font-bold text-primary">
            Cropsmarket
          </span>
          <span className="text-sm text-on-surface-variant">
            © 2024 Cropsmarket. All rights reserved. Professional Agricultural
            Marketplace.
          </span>
        </div>
        <nav className="flex flex-wrap gap-3 text-sm justify-center">
          {desktopLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              {link}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden flex flex-col items-center px-4 py-6 w-full gap-4">
        <div className="font-heading text-lg font-bold text-primary mb-2">
          Cropsmarket
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-2">
          {mobileLinks.map((link) => (
            <Link
              key={link}
              href="#"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>
        <div className="text-on-surface-variant text-center opacity-80 text-xs">
          © 2024 Cropsmarket. All rights reserved. Professional Agricultural
          Marketplace.
        </div>
      </div>
    </footer>
  );
}
