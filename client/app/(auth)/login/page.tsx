"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Star,
  Layers,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { authService } from "@/app/services/auth.service";
import { useAuthStore } from "@/app/store/authStore";
import { useAuth } from "@/app/context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid business email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function AuthFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const { setUser: setStoreUser } = useAuthStore();
  const { login: setAuthLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const res = await authService.login(data);
      if (res.success || res.status === "success" || res.data) {
        const user = res.data;
        const token = res.token || res.data?.token || "";
        if (typeof window !== "undefined") {
          if (token) localStorage.setItem("cropsmarket_token", token);
          if (user) localStorage.setItem("cropsmarket_user", JSON.stringify(user));
        }
        setAuthLogin(token, user);
        setStoreUser(user);
        setSuccessMessage("Authentication successful! Redirecting to workspace...");
        setTimeout(() => {
          router.push(redirectPath);
        }, 400);
      } else {
        setErrorMessage(res.message || "Authentication failed. Please check your credentials.");
      }
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string | string[] } } };
      const rawMsg = errorObj?.response?.data?.message;
      const serverMsg = Array.isArray(rawMsg)
        ? rawMsg.join(", ")
        : (typeof rawMsg === "string" ? rawMsg : "Authentication failed. Please check your credentials.");
      setErrorMessage(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="bg-pure-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-border-gray/70 min-h-[580px] lg:min-h-[640px]">
        
        {/* LEFT COLUMN: Agricultural Trade & Market Value Props */}
        <div className="lg:col-span-5 bg-deep-forest p-8 lg:p-10 text-pure-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-fresh-leaf/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-harvest-gold/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Branding */}
          <div className="relative z-10 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-fresh-leaf flex items-center justify-center text-deep-forest font-black text-xl shadow-md">
                CM
              </div>
              <span className="font-extrabold text-xl tracking-tight text-pure-white">
                Crops<span className="text-harvest-gold">Market</span>
              </span>
            </Link>

            <div className="pt-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-pure-white tracking-tight leading-snug">
                Nigeria&apos;s Institutional Commodity Trading Hub
              </h2>
              <p className="text-xs text-soft-sage mt-2 leading-relaxed">
                Empowering accredited agricultural cooperatives, food processing conglomerates, and grain aggregators with verified farm-gate prices.
              </p>
            </div>
          </div>

          {/* Value Propositions */}
          <div className="relative z-10 space-y-3.5 my-6">
            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-full bg-fresh-leaf/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-pure-white">Direct Farm Aggregation</p>
                <p className="text-[11px] text-soft-sage/80">Direct wholesale access across 36 states with zero middlemen markups.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-full bg-fresh-leaf/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-pure-white">Verified Farm Gate Sourcing</p>
                <p className="text-[11px] text-soft-sage/80">Every crop batch is sourced directly from KYC-vetted Nigerian farms.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <div className="w-8 h-8 rounded-full bg-fresh-leaf/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-pure-white">Agronomist Certified Grading</p>
                <p className="text-[11px] text-soft-sage/80">Moisture, aflatoxin, and purity certificates logged per consignment.</p>
              </div>
            </div>
          </div>

          {/* Bottom: Verified Trade Quote Card */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center gap-1 text-harvest-gold">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-harvest-gold" />
              ))}
              <span className="text-[11px] text-pure-white ml-2 font-bold">180 MT Fulfilled</span>
            </div>
            <p className="text-[11px] text-soft-sage italic leading-relaxed">
              &ldquo;We secured 180 metric tons of export-grade soybeans and yellow maize without payment disputes. Verified trade security gives our executive board complete peace of mind.&rdquo;
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px]">
              <span className="font-bold text-pure-white">AgroAllied Mills Ltd, Ibadan</span>
              <span className="font-semibold text-emerald-300">Verified Buyer</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Login Form Centered Vertically */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 bg-pure-white flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6 my-auto">
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
                Log in to monitor live commodity bids, manage storage manifests, and track your trade transactions.
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
                    className="absolute right-3 top-2.5 text-natural-gray hover:text-charcoal-text cursor-pointer"
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
                className="w-full py-3.5 bg-deep-forest hover:bg-primary text-pure-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? "Signing In..." : "Sign In to Marketplace"} <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Don't have an account? Sign Up Link */}
            <div className="pt-4 text-center border-t border-border-gray/60">
              <p className="text-xs sm:text-sm text-natural-gray">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-deep-forest hover:text-fresh-leaf hover:underline transition-colors"
                >
                  Sign up for free
                </Link>
              </p>
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
