"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Check,
  Shield,
  Tractor,
  ShoppingCart,
} from "lucide-react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { authService, SignupPayload } from "@/app/services/auth.service";

export default function SignupPage() {
  const router = useRouter();

  const [role, setRole] = useState<"farmer" | "buyer">("buyer");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validate individual field or form
  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^(?:\+234|0)[789][01]\d{8}$/.test(formData.phoneNumber.replace(/\s+/g, ""))) {
      errors.phoneNumber = "Enter a valid Nigerian phone number (e.g. 08012345678)";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least 1 uppercase letter";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = "Password must contain at least 1 lowercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = "Password must contain at least 1 number";
    } else if (!/[!@#$%^&*()_+\-=[\]{};':"\|,.<>/?]/.test(formData.password)) {
      errors.password = "Password must contain at least 1 special character";
    }

    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.terms) {
      errors.terms = "You must accept the terms of service to proceed";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for field
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!validate()) return;
    setLoading(true);

    const payload: SignupPayload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim().replace(/\s+/g, ""),
      password: formData.password,
      role: role,
      accountType: "INDIVIDUAL",
    };

    try {
      const res = await authService.signup(payload);
      if (res.status === "success" || res.data) {
        setSuccessMessage("Account registered successfully! Redirecting to login portal...");
        setTimeout(() => {
          router.push("/login");
        }, 1200);
      } else {
        setErrorMessage(res.message || "Registration failed. Please verify your details.");
      }
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string | string[] } } };
      const rawMsg = errorObj?.response?.data?.message;
      const serverMsg = Array.isArray(rawMsg)
        ? rawMsg.join(", ")
        : (typeof rawMsg === "string" ? rawMsg : "Registration failed. Please verify your details.");
      setErrorMessage(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  // Live password validation checklist
  const passwordCriteria = [
    { id: "len", label: "8+ chars", valid: formData.password.length >= 8 },
    { id: "upper", label: "Uppercase", valid: /[A-Z]/.test(formData.password) },
    { id: "lower", label: "Lowercase", valid: /[a-z]/.test(formData.password) },
    { id: "num", label: "Number", valid: /[0-9]/.test(formData.password) },
    { id: "spec", label: "Special char", valid: /[!@#$%^&*()_+\-=[\]{};':"\|,.<>/?]/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-20 flex-1 flex items-center justify-center py-8">
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-pure-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-border-gray/70 min-h-[620px] lg:min-h-[680px]">
            
            {/* LEFT COLUMN: Agricultural Brand Banner */}
            <div className="lg:col-span-5 bg-deep-forest p-8 lg:p-10 text-pure-white flex flex-col justify-between relative overflow-hidden">
              {/* Glow Gradients */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-fresh-leaf/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-harvest-gold/15 rounded-full blur-3xl pointer-events-none" />

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
                    {role === "farmer"
                      ? "List Verified Harvests at Institutional Farm-Gate Prices"
                      : "Source Verified Agricultural Commodities with Direct Trade Protection"}
                  </h2>
                  <p className="text-xs text-soft-sage mt-2 leading-relaxed">
                    Join thousands of accredited farmers, millers, and corporate grain aggregators trading securely on Nigeria&apos;s digital agricultural exchange.
                  </p>
                </div>
              </div>

              {/* Verified Platform Features */}
              <div className="relative z-10 space-y-3 my-6">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                  <div className="w-7 h-7 rounded-full bg-fresh-leaf/30 flex items-center justify-center text-emerald-300 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-pure-white">Zero Intermediary Exploitation</p>
                    <p className="text-[10px] text-soft-sage/80">Direct connection between verified growers and volume aggregators.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                  <div className="w-7 h-7 rounded-full bg-fresh-leaf/30 flex items-center justify-center text-emerald-300 shrink-0">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-pure-white">Guaranteed Direct Settlements</p>
                    <p className="text-[10px] text-soft-sage/80">Payments are secured until delivery inspection passes.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="relative z-10 p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10 text-center">
                <p className="text-[11px] font-semibold text-emerald-300">
                  🔒 FMARD Standards Aligned • 256-Bit SSL Encrypted
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Sign Up Form Centered Vertically */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 bg-pure-white flex flex-col justify-center">
              <div className="max-w-lg mx-auto w-full space-y-5 my-auto">
                {/* Header */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal-text tracking-tight">
                    Create Your Account
                  </h1>
                  <p className="text-xs sm:text-sm text-natural-gray mt-1">
                    Select your operational role and register to access live agricultural trade pipelines.
                  </p>
                </div>

                {/* ROLE SWITCHER TABS */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-warm-cream/70 rounded-xl border border-border-gray/60">
                  <button
                    type="button"
                    onClick={() => setRole("buyer")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      role === "buyer"
                        ? "bg-deep-forest text-pure-white shadow-xs"
                        : "text-natural-gray hover:text-charcoal-text"
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>I&apos;m a Commodity Buyer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("farmer")}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      role === "farmer"
                        ? "bg-deep-forest text-pure-white shadow-xs"
                        : "text-natural-gray hover:text-charcoal-text"
                    }`}
                  >
                    <Tractor className="w-3.5 h-3.5" />
                    <span>I&apos;m a Farmer / Producer</span>
                  </button>
                </div>

                {/* Alerts */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-error-red text-xs font-bold flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                {successMessage && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-success-green text-xs font-bold flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{successMessage}</span>
                  </div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                        First Name <span className="text-error-red">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-natural-gray absolute left-3 top-2.5" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Adebayo"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-gray text-xs text-charcoal-text focus:outline-hidden focus:border-deep-forest bg-warm-cream/30"
                        />
                      </div>
                      {fieldErrors.firstName && (
                        <p className="text-[11px] text-error-red mt-0.5">{fieldErrors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                        Last Name <span className="text-error-red">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-natural-gray absolute left-3 top-2.5" />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Ogunlesi"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-gray text-xs text-charcoal-text focus:outline-hidden focus:border-deep-forest bg-warm-cream/30"
                        />
                      </div>
                      {fieldErrors.lastName && (
                        <p className="text-[11px] text-error-red mt-0.5">{fieldErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                        Email Address <span className="text-error-red">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-natural-gray absolute left-3 top-2.5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="adebayo@company.ng"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-gray text-xs text-charcoal-text focus:outline-hidden focus:border-deep-forest bg-warm-cream/30"
                        />
                      </div>
                      {fieldErrors.email && (
                        <p className="text-[11px] text-error-red mt-0.5">{fieldErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                        Phone Number <span className="text-error-red">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-natural-gray absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="08031234567"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-gray text-xs text-charcoal-text focus:outline-hidden focus:border-deep-forest bg-warm-cream/30"
                        />
                      </div>
                      {fieldErrors.phoneNumber && (
                        <p className="text-[11px] text-error-red mt-0.5">{fieldErrors.phoneNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                        Password <span className="text-error-red">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-natural-gray absolute left-3 top-2.5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••••••"
                          className="w-full pl-9 pr-9 py-2 rounded-xl border border-border-gray text-xs text-charcoal-text focus:outline-hidden focus:border-deep-forest bg-warm-cream/30"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-2.5 text-natural-gray hover:text-charcoal-text cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      {fieldErrors.password && (
                        <p className="text-[11px] text-error-red mt-0.5">{fieldErrors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-text uppercase mb-1">
                        Confirm Password <span className="text-error-red">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-natural-gray absolute left-3 top-2.5" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••••••"
                          className="w-full pl-9 pr-9 py-2 rounded-xl border border-border-gray text-xs text-charcoal-text focus:outline-hidden focus:border-deep-forest bg-warm-cream/30"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2.5 top-2.5 text-natural-gray hover:text-charcoal-text cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      {fieldErrors.confirmPassword && (
                        <p className="text-[11px] text-error-red mt-0.5">{fieldErrors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  {/* Password Strength Criteria Badges - Compact & Cleanly Aligned */}
                  <div className="p-2.5 rounded-xl bg-warm-cream/60 border border-border-gray/50 space-y-1">
                    <p className="text-[10px] font-bold text-charcoal-text uppercase tracking-wider">
                      Password Requirements:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-1 text-[10px] leading-tight">
                      {passwordCriteria.map((c) => (
                        <div
                          key={c.id}
                          className={`flex items-center gap-1 font-medium ${
                            c.valid ? "text-success-green font-bold" : "text-natural-gray"
                          }`}
                        >
                          <Check className={`w-2.5 h-2.5 shrink-0 ${c.valid ? "text-success-green" : "opacity-30"}`} />
                          <span className="truncate">{c.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="space-y-1 pt-0.5">
                    <label className="flex items-start gap-2 cursor-pointer text-[11px] text-charcoal-text">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleChange}
                        className="mt-0.5 rounded border-border-gray text-deep-forest accent-deep-forest"
                      />
                      <span>
                        I agree to the CropsMarket{" "}
                        <span className="font-bold text-deep-forest underline">Terms of Service</span>,{" "}
                        <span className="font-bold text-deep-forest underline">Settlement Protocol</span>, and{" "}
                        <span className="font-bold text-deep-forest underline">Privacy Policy</span>.
                      </span>
                    </label>
                    {fieldErrors.terms && (
                      <p className="text-[11px] text-error-red">{fieldErrors.terms}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-deep-forest hover:bg-primary text-pure-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading
                      ? "Creating Account..."
                      : `Create Verified ${role === "farmer" ? "Farmer" : "Buyer"} Account`}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Already have an account? Log In Link */}
                <div className="pt-3 text-center border-t border-border-gray/60">
                  <p className="text-xs sm:text-sm text-natural-gray">
                    Already have an accredited account?{" "}
                    <Link
                      href="/login"
                      className="font-bold text-deep-forest hover:text-fresh-leaf hover:underline transition-colors"
                    >
                      Sign in to Portal
                    </Link>
                  </p>
                </div>

                {/* Footnote */}
                <div className="pt-2 flex flex-wrap items-center justify-between text-[10px] text-natural-gray gap-2">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-fresh-leaf" /> FMARD Standards Aligned
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-fresh-leaf" /> 256-Bit SSL Encrypted
                  </span>
                  <span>•</span>
                  <span>Desk: 0800-AGRI-OYO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
