import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CropsMarket - Direct Farm-Gate Agricultural Marketplace",
  description:
    "Connect directly with verified local farmers. Source fresh wholesale and retail harvest at fair market prices with zero hidden middlemen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-warm-cream text-charcoal-text font-manrope">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
