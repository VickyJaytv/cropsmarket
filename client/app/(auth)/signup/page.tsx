"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, ArrowRight } from "lucide-react";
import { signup } from "@/app/services/auth.service";
import { signupSchema, type SignupInput } from "@/app/schema/auth.schema";
import ToastContainer, { showToast } from "@/app/components/ui/Toast";

type Role = "farmer" | "buyer";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("farmer");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.terms) {
      showToast("Please agree to the Terms of Service and Privacy Policy", "error");
      return;
    }

    const payload: SignupInput = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      role,
      accountType: "INDIVIDUAL",
      password: formData.password,
    };

    const result = signupSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await signup(result.data);
      showToast("Account created successfully! Please sign in.", "success");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: unknown) {
      const error = err as { message?: string | string[] };
      if (Array.isArray(error.message)) {
        showToast("Please check your input and try again", "error");
      } else if (
        error.message?.includes("unable to create account") ||
        error.message?.includes("Duplicate")
      ) {
        showToast("An account with this email already exists", "error");
      } else {
        showToast("Something went wrong. Please try again later", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex flex-col md:flex-row overflow-hidden">
      <ToastContainer />

      {/* Left Side - Hero (Desktop only) */}
      <div className="hidden md:flex md:w-1/2 relative bg-surface-container-high overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10" />
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfdN_EnnibV6GTk1W2JKBsoNxs60JgTwQtBdx9HiqunwnvoWn8tqpnQSd_NUFsrnLkzv5iOrGQMKhUpN84nTMRIIF9OG-kwHDcrNebYOrnaVMuaV4YeGGZkszBctn70Kp21lqXEH5cu4gGvvHRpMOIaS07riI5X5IjaUK4Cvx9ol7nn986ikmlel3vEkLRmnwRwszyZlb8-jwJQ27iiOXW1jypTs5zZ80YKlMhBqUmdQ4l6r9goZ5x"
          alt="Agricultural field at golden hour"
          className="object-cover w-full h-full absolute inset-0 z-0"
        />
        <div className="relative z-20 flex flex-col justify-end p-20 h-full w-full text-white">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-10 h-10" fill="currentColor" />
            <span className="font-heading text-xl font-semibold">Cropsmarket</span>
          </div>
          <h1 className="font-display text-[40px] leading-[48px] tracking-[-0.02em] font-bold mb-4">
            Grow your business with smart connections.
          </h1>
          <p className="text-base leading-6 max-w-md opacity-90">
            Join thousands of verified farmers and buyers in a climate-smart
            marketplace designed for transparency and growth.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto bg-surface flex flex-col items-center justify-center p-6 md:p-12 relative">
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-2 mb-6 self-start">
          <Leaf className="w-8 h-8 text-primary" fill="currentColor" />
          <span className="font-heading text-xl font-bold text-primary">
            Cropsmarket
          </span>
        </div>

        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 p-8">
          <h2 className="font-heading text-[32px] leading-[40px] font-bold text-on-surface mb-2">
            Create Account
          </h2>
          <p className="text-sm text-on-surface-variant mb-6">
            Connect. Trade. Grow. Join the marketplace today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selector */}
            <div className="mb-6">
              <label className="block text-xs font-medium tracking-wider text-on-surface mb-2">
                Select your role
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("farmer")}
                  className={`rounded-lg border-2 p-4 flex flex-col items-center text-center transition-colors ${
                    role === "farmer"
                      ? "border-primary bg-primary/5"
                      : "border-outline-variant bg-surface hover:bg-surface-container-low"
                  }`}
                >
                  <span className="material-symbols-outlined text-primary mb-2 text-[28px]">
                    agriculture
                  </span>
                  <span className="text-sm font-semibold text-on-surface">
                    I am a Farmer
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`rounded-lg border-2 p-4 flex flex-col items-center text-center transition-colors ${
                    role === "buyer"
                      ? "border-primary bg-primary/5"
                      : "border-outline-variant bg-surface hover:bg-surface-container-low"
                  }`}
                >
                  <span className="material-symbols-outlined text-primary mb-2 text-[28px]">
                    storefront
                  </span>
                  <span className="text-sm font-semibold text-on-surface">
                    I am a Buyer
                  </span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium tracking-wider text-on-surface mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-surface text-on-surface text-sm py-2.5 px-3 focus:ring-primary focus:border-primary outline-none ${
                  errors.firstName ? "border-red-500" : "border-outline-variant"
                }`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium tracking-wider text-on-surface mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-surface text-on-surface text-sm py-2.5 px-3 focus:ring-primary focus:border-primary outline-none ${
                  errors.email ? "border-red-500" : "border-outline-variant"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium tracking-wider text-on-surface mb-1">
                Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-outline-variant bg-surface-container-low text-on-surface-variant text-sm">
                  +91
                </span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="00000 00000"
                  className={`flex-1 rounded-r-lg border bg-surface text-on-surface text-sm py-2.5 px-3 focus:ring-primary focus:border-primary outline-none ${
                    errors.phoneNumber
                      ? "border-red-500"
                      : "border-outline-variant"
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium tracking-wider text-on-surface mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-lg border bg-surface text-on-surface text-sm py-2.5 px-3 focus:ring-primary focus:border-primary outline-none ${
                  errors.password ? "border-red-500" : "border-outline-variant"
                }`}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-primary text-on-primary font-semibold py-3 px-4 rounded-full hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-on-surface-variant">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-auto pt-8 text-center opacity-60">
          <p className="text-xs text-on-surface-variant">
            By registering, you agree to our Terms of Service &amp; Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
