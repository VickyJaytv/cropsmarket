"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/auth.service";
import { loginSchema, LoginFormData } from "../../schema/authSchema";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Lock,
  Mail,
  Sprout,
  Star,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Gavel,
  Headphones,
} from "lucide-react";

function AuthFormContent() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Login Form Hook
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Handle Login Submission
  const onLoginSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await authService.login(data);
      if (res.success && res.data) {
        setSuccessMessage("Login successful! Redirecting...");
        login(res.data.token || "jwt_token_sample", {
          id: res.data.id,
          firstName: res.data.firstName || "User",
          lastName: res.data.lastName || "",
          email: res.data.email,
          role: res.data.role,
        });
        setTimeout(() => {
          router.push(
            res.data.role?.toLowerCase() === "farmer"
              ? "/dashboard"
              : "/browse-produce"
          );
        }, 800);
      } else {
        setErrorMessage(res.message || "Failed to log in. Please check credentials.");
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Invalid credentials or network error."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Contextual Sub-Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border-gray/40">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-forest hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back To Home</span>
          </Link>
          <span className="text-natural-gray">•</span>
          <span className="text-xs font-medium text-natural-gray">
            Farm-Gate Escrow Authenticated
          </span>
        </div>
      </div>

      {/* Main Login Container */}
      <div className="w-full bg-pure-white rounded-2xl border border-border-gray/70 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT COLUMN: Dedicated Agricultural Editorial & Trust Panel */}
        <div className="lg:col-span-5 relative bg-deep-forest text-pure-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden min-h-[520px] lg:min-h-[660px]">
          {/* Ambient Background Scrim */}
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 pointer-events-none"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=1000')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-forest/95 via-primary/90 to-[#143220]/95" />

          {/* Top Content */}
          <div className="relative z-10 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-fresh-leaf" />
              <span>Verified Farm-Gate Trade</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-pure-white tracking-tight leading-snug">
              Bridging Nigerian Farmlands to Commercial Markets.
            </h2>
            <p className="text-sm text-soft-sage/90 max-w-md leading-relaxed">
              Connecting 4,500+ verified cooperative growers directly with FMCG processors and bulk wholesale off-takers across 36 states.
            </p>
          </div>

          {/* Middle Content */}
          <div className="relative z-10 my-6 space-y-3">
            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-full bg-fresh-leaf/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-pure-white">Direct Farm-Gate Pricing</p>
                <p className="text-xs text-soft-sage/80">Eliminate unverified broker margins with auditable crop origins.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-full bg-fresh-leaf/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-pure-white">Moniepoint Escrow Vault</p>
                <p className="text-xs text-soft-sage/80">Settlement releases only after quality confirmation at destination.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-full bg-fresh-leaf/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-pure-white">Agronomist Certified Grading</p>
                <p className="text-xs text-soft-sage/80">Moisture, aflatoxin, and purity certificates logged per consignment.</p>
              </div>
            </div>
          </div>

          {/* Bottom: Verified Trade Quote Card */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center gap-1 text-harvest-gold">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-harvest-gold" />
              ))}
              <span className="text-xs text-pure-white ml-2 font-bold">180 MT Fulfilled</span>
            </div>
            <p className="text-xs text-soft-sage italic leading-relaxed">
              “We secured 180 metric tons of export-grade soybeans and yellow maize without payment disputes. Escrow protection gives our executive board complete peace of mind.”
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
              <span className="font-bold text-pure-white">AgroAllied Mills Ltd, Ibadan</span>
              <span className="font-semibold text-emerald-300">Verified Buyer</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-pure-white flex flex-col justify-between">
          <div className="max-w-xl mx-auto w-full space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-1.5 text-fresh-leaf font-bold text-xs uppercase mb-1">
                <Lock className="w-4 h-4" />
                <span>Secure Access Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text tracking-tight">
                Welcome Back to CropsMarket
              </h1>
              <p className="text-xs sm:text-sm text-natural-gray mt-1">
                Log in to monitor live commodity bids, manage storage manifests, and track your escrow transactions.
              </p>
            </div>

            {/* Alerts */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-error-red text-xs font-bold flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-success-green text-xs font-bold flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* LOGIN FORM */}
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-text uppercase mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-natural-gray absolute left-3.5 top-3" />
                  <input
                    type="email"
                    placeholder="adebayo@agrifarms.ng"
                    {...registerLogin("email")}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-gray text-xs text-charcoal-text focus:outline-hidden focus:border-deep-forest bg-warm-cream/30"
                  />
                </div>
                {loginErrors.email && (
                  <p className="text-xs text-error-red mt-1">{loginErrors.email.message}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-charcoal-text uppercase">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-deep-forest hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-natural-gray absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    {...registerLogin("password")}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border-gray text-xs text-charcoal-text focus:outline-hidden focus:border-deep-forest bg-warm-cream/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-natural-gray hover:text-charcoal-text"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="text-xs text-error-red mt-1">{loginErrors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-charcoal-text">
                  <input
                    type="checkbox"
                    className="rounded border-border-gray text-deep-forest accent-deep-forest"
                  />
                  <span>Remember device for 30 days</span>
                </label>
                <span className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-fresh-leaf">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-deep-forest hover:bg-primary text-pure-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {loading ? "Signing In..." : "Sign In to Marketplace"} <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Regulatory Confidence Strips */}
            <div className="pt-4 border-t border-border-gray/60 flex flex-wrap items-center justify-between text-[11px] text-natural-gray gap-2">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-fresh-leaf" /> FMARD Standards Aligned
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Gavel className="w-3.5 h-3.5 text-fresh-leaf" /> NDPR Data Protection
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5 text-fresh-leaf" /> Desk: 0800-AGRI-OYO
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />
      <main className="pt-20 flex-1 flex items-center justify-center py-8">
        <Suspense fallback={<div className="p-8 text-center text-natural-gray">Loading portal...</div>}>
          <AuthFormContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
