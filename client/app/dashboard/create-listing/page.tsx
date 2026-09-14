"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { productService } from "../../services/product.service";
import { listingService } from "../../services/listing.service";
import {
  createListingSchema,
  CreateListingFormData,
} from "../../schema/listingSchema";
import {
  Sprout,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Package,
  MapPin,
  Tag,
  DollarSign,
  FileText,
} from "lucide-react";

export default function CreateListingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [products, setProducts] = useState<{ id: number; name: string }[]>([
    { id: 1, name: "Dry White Maize" },
    { id: 2, name: "Yellow Maize" },
    { id: 3, name: "Soybeans (Commercial Grade)" },
    { id: 4, name: "Cassava Tubers" },
    { id: 5, name: "Paddy Rice" },
    { id: 6, name: "Sorghum" },
    { id: 7, name: "Fresh Tomatoes" },
  ]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await productService.getProducts();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        // keep defaults if server returns error or empty
      }
    }
    loadProducts();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateListingFormData>({
    resolver: zodResolver(createListingSchema) as any,
    defaultValues: {
      productId: 1,
      unit: "Metric Ton",
      availability: true,
      locationState: "Oyo",
      locationLGA: "Ibadan North",
    },
  });

  const onSubmit = async (data: CreateListingFormData) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setSubmitting(true);

    try {
      const payload = {
        quantity: Number(data.quantity),
        unit: data.unit,
        price: Number(data.price),
        description: data.description,
        locationState: data.locationState,
        locationLGA: data.locationLGA,
        availability: Boolean(data.availability),
      };

      const res = await listingService.createListing(Number(data.productId), payload);
      if (res.success) {
        setSuccessMessage("Harvest listing published successfully! Redirecting to dashboard...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      } else {
        setErrorMessage(res.message || "Failed to create produce listing.");
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed to post listing. Ensure you are logged in as a Farmer."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const nigerianStates = [
    "Oyo",
    "Benue",
    "Ogun",
    "Kaduna",
    "Kano",
    "Taraba",
    "Niger",
    "Enugu",
    "Lagos",
    "Kwara",
    "Plateau",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream">
      <Navbar />

      <main className="pt-20 flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb Back */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-bold text-natural-gray hover:text-deep-forest mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          {/* Form Header */}
          <div className="bg-pure-white p-6 sm:p-8 rounded-2xl border border-border-gray/70 shadow-2xs mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest">
                <Sprout className="w-6 h-6 text-fresh-leaf" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-charcoal-text tracking-tight">
                  Post Produce Harvest Listing
                </h1>
                <p className="text-xs text-natural-gray">
                  List your harvested crops directly on Nigeria&apos;s farm-gate wholesale marketplace.
                </p>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {errorMessage && (
            <div className="p-4 mb-6 rounded-xl bg-red-50 border border-red-200 text-error-red text-xs font-bold flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-success-green text-xs font-bold flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* MAIN FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-pure-white p-6 sm:p-8 rounded-2xl border border-border-gray/70 shadow-xs space-y-6"
          >
            {/* Product Selection */}
            <div>
              <label className="block text-xs font-bold text-charcoal-text uppercase mb-1.5 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-deep-forest" /> Select Crop Commodity
              </label>
              <select
                {...register("productId", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 rounded-xl border border-border-gray text-sm text-charcoal-text bg-pure-white focus:outline-hidden focus:border-deep-forest font-medium"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.productId && (
                <p className="text-xs text-error-red mt-1 font-medium">
                  {errors.productId.message}
                </p>
              )}
            </div>

            {/* Quantity & Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-text uppercase mb-1.5 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-deep-forest" /> Total Available Stock
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  {...register("quantity", { valueAsNumber: true })}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-gray text-sm text-charcoal-text focus:outline-hidden focus:border-deep-forest"
                />
                {errors.quantity && (
                  <p className="text-xs text-error-red mt-1 font-medium">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-text uppercase mb-1.5">
                  Unit of Measurement
                </label>
                <select
                  {...register("unit")}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-gray text-sm text-charcoal-text bg-pure-white focus:outline-hidden focus:border-deep-forest font-medium"
                >
                  <option value="Metric Ton">Metric Ton</option>
                  <option value="Ton">Ton</option>
                  <option value="50kg Bag">50kg Bag</option>
                  <option value="100kg Bag">100kg Bag</option>
                  <option value="Kg">Kilogram (Kg)</option>
                  <option value="Crate">Crate</option>
                </select>
                {errors.unit && (
                  <p className="text-xs text-error-red mt-1 font-medium">
                    {errors.unit.message}
                  </p>
                )}
              </div>
            </div>

            {/* Price Per Unit */}
            <div>
              <label className="block text-xs font-bold text-charcoal-text uppercase mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-deep-forest" /> Price per Unit (₦)
              </label>
              <input
                type="number"
                placeholder="e.g. 285000"
                {...register("price", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 rounded-xl border border-border-gray text-sm text-charcoal-text focus:outline-hidden focus:border-deep-forest"
              />
              {errors.price && (
                <p className="text-xs text-error-red mt-1 font-medium">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Location State & LGA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-text uppercase mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-deep-forest" /> Farm State
                </label>
                <select
                  {...register("locationState")}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-gray text-sm text-charcoal-text bg-pure-white focus:outline-hidden focus:border-deep-forest font-medium"
                >
                  {nigerianStates.map((st) => (
                    <option key={st} value={st}>
                      {st} State
                    </option>
                  ))}
                </select>
                {errors.locationState && (
                  <p className="text-xs text-error-red mt-1 font-medium">
                    {errors.locationState.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-text uppercase mb-1.5">
                  Local Government Area (LGA)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ibadan North"
                  {...register("locationLGA")}
                  className="w-full px-4 py-2.5 rounded-xl border border-border-gray text-sm text-charcoal-text focus:outline-hidden focus:border-deep-forest"
                />
                {errors.locationLGA && (
                  <p className="text-xs text-error-red mt-1 font-medium">
                    {errors.locationLGA.message}
                  </p>
                )}
              </div>
            </div>

            {/* Harvest Description */}
            <div>
              <label className="block text-xs font-bold text-charcoal-text uppercase mb-1.5 flex items-center gap-1.5">
                Crop Description &amp; Quality Notes
              </label>
              <textarea
                rows={4}
                placeholder="Mention moisture content %, grain purity, processing status, warehouse location, or dispatch availability..."
                {...register("description")}
                className="w-full px-4 py-2.5 rounded-xl border border-border-gray text-sm text-charcoal-text focus:outline-hidden focus:border-deep-forest"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-deep-forest hover:bg-primary text-pure-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              {submitting ? "Publishing Listing..." : "Publish Produce Listing"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
