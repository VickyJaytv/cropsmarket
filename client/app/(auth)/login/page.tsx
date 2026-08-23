"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Leaf, Mail, Lock, Eye, EyeOff, Shield, ArrowLeft } from "lucide-react";
import { login } from "@/app/services/auth.service";
import { loginSchema, type LoginInput } from "@/app/schema/auth.schema";
import { useAuthStore } from "@/app/store/authStore";
import ToastContainer, { showToast } from "@/app/components/ui/Toast";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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

    const payload: LoginInput = {
      email: formData.email,
      password: formData.password,
    };

    const result = loginSchema.safeParse(payload);
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
      const response = await login(result.data);
      if (response.data) {
        setUser(response.data);
      }
      showToast("Welcome back!", "success");
      setTimeout(() => router.push("/"), 1000);
    } catch (err: unknown) {
      const error = err as { message?: string | string[] };
      if (Array.isArray(error.message)) {
        showToast("Please check your input and try again", "error");
      } else if (error.message?.includes("invalid email or password")) {
        showToast("Invalid email or password", "error");
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
        <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent z-10" />
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfdN_EnnibV6GTk1W2JKBsoNxs60JgTwQtBdx9HiqunwnvoWn8tqpnQSd_NUFsrnLkzv5iOrGQMKhUpN84nTMRIIF9OG-kwHDcrNebYOrnaVMuaV4YeGGZkszBctn70Kp21lqXEH5cu4gGvvHRpMOIaS07riI5X5IjaUK4Cvx9ol7nn986ikmlel3vEkLRmnwRwszyZlb8-jwJQ27iiOXW1jypTs5zZ80YKlMhBqUmdQ4l6r9goZ5x"
          alt="Agricultural field at golden hour"
          fill
          className="object-cover w-full h-full absolute inset-0 z-0"
        />
        {/* Hero Image Icon */}
        <div className="relative z-20 flex flex-col justify-end p-20 h-full w-full text-white">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-10 h-10" fill="currentColor" />
              <span className="font-heading text-xl font-semibold">
                Cropsmarket
              </span>
            </div>
          </div>
          <h1 className="font-display text-[40px] leading-12 tracking-[-0.02em] font-bold mb-4">
            Grow your business with smart connections.
          </h1>
          <p className="text-base leading-6 max-w-md opacity-90">
            Join thousands of verified farmers and buyers in a climate-smart
            marketplace designed for transparency and growth.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto bg-surface flex flex-col items-center justify-center p-6 md:p-12">
        {/* Top Navigation aligned with card */}
        <div className="w-full max-w-md mb-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-variant/75 hover:text-primary transition-colors py-1.5 px-2 -ml-2 rounded-lg hover:bg-surface-container-low group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
            <span>Back to home</span>
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-1.5 text-primary">
            <Leaf className="w-5 h-5" fill="currentColor" />
            <span className="font-heading text-sm font-bold">Cropsmarket</span>
          </div>
        </div>

        <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden relative">
          {/* Green top bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary to-secondary" />

          <div className="p-8 md:p-10 flex flex-col items-center">
            {/* Header */}
            <div className="w-full text-center mb-8">
              <h1 className="font-heading text-[24px] leading-8 font-bold text-on-surface mb-2">
                Welcome Back
              </h1>
              <p className="text-sm text-on-surface-variant">
                Sign in to manage your listings and connect with buyers.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-medium tracking-wider text-on-surface mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-outline" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="farmer@example.com"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-surface-container-lowest text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-primary placeholder-outline outline-none ${
                      errors.email ? "border-red-500" : "border-outline-variant"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-medium tracking-wider text-on-surface">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-outline" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`block w-full pl-10 pr-10 py-3 border rounded-lg bg-surface-container-lowest text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-primary placeholder-outline outline-none ${
                      errors.password
                        ? "border-red-500"
                        : "border-outline-variant"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface-variant transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center pt-1 pb-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-outline-variant rounded cursor-pointer"
                />
                <label className="ml-2 block text-sm text-on-surface-variant cursor-pointer">
                  Remember me
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-on-primary bg-primary hover:bg-secondary transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-primary hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="bg-surface-container-low px-8 py-4 border-t border-outline-variant/30 text-center">
            <p className="text-xs text-on-surface-variant flex items-center justify-center gap-1">
              <Shield className="w-4 h-4" />
              Verified Marketplace for Farmers &amp; Buyers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
