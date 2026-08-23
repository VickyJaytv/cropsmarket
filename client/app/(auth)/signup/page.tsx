"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Leaf,
  ArrowRight,
  ArrowLeft,
  Store,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { signup } from "@/app/services/auth.service";
import { signupSchema, type SignupInput } from "@/app/schema/auth.schema";
import ToastContainer, { showToast } from "@/app/components/ui/Toast";
import Image from "next/image";

type Role = "farmer" | "buyer";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("farmer");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    terms: false,
  });

  // Password criteria validation checks
  const passwordCriteria = useMemo(() => {
    const pwd = formData.password;
    return [
      {
        id: "length",
        label: "At least 8 characters",
        valid: pwd.length >= 8,
      },
      {
        id: "digit",
        label: "At least 1 digit (0-9)",
        valid: /[0-9]/.test(pwd),
      },
      {
        id: "special",
        label: "At least 1 special character (!@#$...)",
        valid: /[!@#$%^&*()_\-+=\[\]{};:'"\\|,.<>/?`~]/.test(pwd),
      },
      {
        id: "uppercase",
        label: "At least 1 uppercase letter (A-Z)",
        valid: /[A-Z]/.test(pwd),
      },
      {
        id: "lowercase",
        label: "At least 1 lowercase letter (a-z)",
        valid: /[a-z]/.test(pwd),
      },
    ];
  }, [formData.password]);

  const passedCriteriaCount = useMemo(() => {
    return passwordCriteria.filter((c) => c.valid).length;
  }, [passwordCriteria]);

  const passwordStrength = useMemo(() => {
    if (!formData.password)
      return { label: "", percent: 0, color: "bg-outline-variant" };
    if (passedCriteriaCount <= 2) {
      return {
        label: "Weak",
        percent: (passedCriteriaCount / 5) * 100,
        color: "bg-red-500",
      };
    }
    if (passedCriteriaCount <= 4) {
      return {
        label: "Medium",
        percent: (passedCriteriaCount / 5) * 100,
        color: "bg-amber-500",
      };
    }
    return { label: "Strong", percent: 100, color: "bg-primary" };
  }, [formData.password, passedCriteriaCount]);

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
      showToast(
        "Please agree to the Terms of Service and Privacy Policy",
        "error",
      );
      setErrors((prev) => ({
        ...prev,
        terms: "You must agree to the terms to create an account",
      }));
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
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfdN_EnnibV6GTk1W2JKBsoNxs60JgTwQtBdx9HiqunwnvoWn8tqpnQSd_NUFsrnLkzv5iOrGQMKhUpN84nTMRIIF9OG-kwHDcrNebYOrnaVMuaV4YeGGZkszBctn70Kp21lqXEH5cu4gGvvHRpMOIaS07riI5X5IjaUK4Cvx9ol7nn986ikmlel3vEkLRmnwRwszyZlb8-jwJQ27iiOXW1jypTs5zZ80YKlMhBqUmdQ4l6r9goZ5x"
          className="object-cover w-full h-full absolute inset-0 z-0"
          fill
          alt="Agricultural field at golden hour"
        />
        <div className="relative z-20 flex flex-col justify-end p-20 h-full w-full text-white">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-10 h-10" fill="currentColor" />
            <span className="font-heading text-xl font-semibold">
              Cropsmarket
            </span>
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
      <div className="w-full md:w-1/2 h-full overflow-y-auto bg-surface flex flex-col items-center justify-center p-6 md:p-12">
        {/* Top Navigation aligned with card */}
        <div className="w-full max-w-lg mb-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-on-surface-variant/75 hover:text-primary transition-colors py-1.5 px-2 -ml-2 rounded-lg hover:bg-surface-container-low group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
            <span>Back to home</span>
          </Link>

          {/* Mobile Logo */}
          <div className=" flex items-center gap-1.5 text-primary">
            <Leaf className="w-5 h-5" fill="currentColor" />
            <span className="font-heading text-sm font-bold">Cropsmarket</span>
          </div>
        </div>

        <div className="w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 p-6 md:p-8 my-auto">
          <h2 className="font-heading text-[28px] md:text-[32px] leading-9 md:leading-10 font-bold text-on-surface mb-2">
            Create Account
          </h2>
          <p className="text-sm text-on-surface-variant mb-6">
            Connect. Trade. Grow. Join the marketplace today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selector */}
            <div className="mb-4">
              <label className="block text-xs font-medium tracking-wider text-on-surface mb-2">
                Select your role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("farmer")}
                  className={`rounded-lg border-2 p-3 flex flex-col items-center text-center transition-colors cursor-pointer ${
                    role === "farmer"
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-outline-variant bg-surface hover:bg-surface-container-low"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                    <Leaf className="w-5 h-5 text-primary" />Farmer
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`rounded-lg border-2 p-3 flex flex-col items-center text-center transition-colors cursor-pointer ${
                    role === "buyer"
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-outline-variant bg-surface hover:bg-surface-container-low"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                    <Store className="w-5 h-5 text-primary" />Buyer
                  </span>
                </button>
              </div>
            </div>

            {/* Names (First & Last) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium tracking-wider text-on-surface mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className={`w-full rounded-lg border bg-surface text-on-surface text-sm py-2.5 px-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors ${
                    errors.firstName
                      ? "border-red-500"
                      : "border-outline-variant"
                  }`}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium tracking-wider text-on-surface mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`w-full rounded-lg border bg-surface text-on-surface text-sm py-2.5 px-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors ${
                    errors.lastName
                      ? "border-red-500"
                      : "border-outline-variant"
                  }`}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                )}
              </div>
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
                placeholder="farmer@example.com"
                className={`w-full rounded-lg border bg-surface text-on-surface text-sm py-2.5 px-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors ${
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
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-outline-variant bg-surface-container-low text-on-surface-variant text-sm font-medium">
                  +234
                </span>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="08012345678"
                  className={`flex-1 rounded-r-lg border bg-surface text-on-surface text-sm py-2.5 px-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors ${
                    errors.phoneNumber
                      ? "border-red-500"
                      : "border-outline-variant"
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium tracking-wider text-on-surface mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full rounded-lg border bg-surface text-on-surface text-sm py-2.5 pl-3 pr-10 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors ${
                    errors.password
                      ? "border-red-500"
                      : "border-outline-variant"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}

              {/* Password Progress Check UI */}
              <div className="mt-2.5 p-3 rounded-lg bg-surface-container-low/70 border border-outline-variant/50 space-y-2">
                {/* Strength Meter Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-medium text-on-surface-variant">
                      Password strength
                    </span>
                    {formData.password && (
                      <span
                        className={`font-semibold ${
                          passedCriteriaCount <= 2
                            ? "text-red-500"
                            : passedCriteriaCount <= 4
                              ? "text-amber-600"
                              : "text-primary"
                        }`}
                      >
                        {passwordStrength.label} ({passedCriteriaCount}/5)
                      </span>
                    )}
                  </div>
                  <div className="h-1.5 w-full bg-outline-variant/30 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.percent}%` }}
                    />
                  </div>
                </div>

                {/* Criteria Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                  {passwordCriteria.map((criterion) => (
                    <div
                      key={criterion.id}
                      className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${
                        criterion.valid
                          ? "text-primary font-medium"
                          : "text-on-surface-variant/70"
                      }`}
                    >
                      {criterion.valid ? (
                        <div className="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-outline-variant/80 flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
                        </div>
                      )}
                      <span className="text-[11px] leading-tight">
                        {criterion.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-2">
              <div className="flex items-start gap-2.5">
                <input
                  id="terms"
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary shrink-0"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-on-surface-variant leading-relaxed select-none cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-primary font-medium hover:underline inline-block"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-primary font-medium hover:underline inline-block"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <p className="text-xs text-red-500 mt-1 pl-6.5">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !formData.terms}
              className={`w-full mt-2 bg-primary text-on-primary font-semibold py-3 px-4 rounded-full transition-all duration-200 shadow-sm flex items-center justify-center gap-2 ${
                !formData.terms || loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:opacity-90 hover:shadow cursor-pointer"
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-on-surface-variant">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-auto pt-6 text-center opacity-60">
          <p className="text-xs text-on-surface-variant">
            By registering, you agree to our Terms of Service &amp; Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
