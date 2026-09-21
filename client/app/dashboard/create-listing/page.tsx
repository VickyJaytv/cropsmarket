"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  UploadCloud,
  X,
  ImageIcon,
} from "lucide-react";

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export default function CreateListingPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user && (user.role || "").toLowerCase() !== "farmer") {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, authLoading, user, router]);

  useEffect(() => {
    async function loadProducts() {
      setLoadingProducts(true);
      try {
        const res = await productService.getProducts();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Failed to load products list:", err);
      } finally {
        setLoadingProducts(false);
      }
    }
    loadProducts();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateListingFormData>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      productId: 1,
      quantity: 50,
      unit: "50kg Bag",
      price: 28000,
      locationState: "Oyo",
      locationLGA: "Ibadan North",
      description: "",
      availability: true,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setImageError("Please select a valid image (JPG, PNG, or WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image file size must be less than 5MB.");
      return;
    }

    setSelectedImage(file);
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: CreateListingFormData) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("quantity", String(data.quantity));
      formData.append("unit", "1");
      formData.append("price", String(data.price));
      if (data.description) {
        formData.append("description", data.description);
      }
      formData.append("locationState", data.locationState);
      formData.append("locationLGA", data.locationLGA);
      formData.append(
        "location",
        `${data.locationLGA}, ${data.locationState} State`
      );

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const res = await listingService.createListing(data.productId, formData);

      if (res.success || res.data) {
        setSuccessMessage("Harvest listing published successfully!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setErrorMessage(res.message || "Failed to create listing.");
      }
    } catch (err: any) {
      console.error("Listing creation error:", err);
      const serverMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "An error occurred while creating the listing.";
      setErrorMessage(serverMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-bg">
      <Navbar />

      <main className="grow py-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-deep-forest hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Farmer Dashboard
          </Link>
        </div>

        <div className="bg-pure-white rounded-3xl border border-border-gray/70 shadow-sm p-6 sm:p-10">
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-border-gray">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-soft-sage flex items-center justify-center">
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
            {/* Produce Photo Upload */}
            <div>
              <label className="block text-xs font-bold text-charcoal-text uppercase mb-1.5 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-deep-forest" /> Produce Harvest Photo (Optional)
              </label>

              {!imagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed border-border-gray hover:border-deep-forest/60 rounded-2xl cursor-pointer bg-cream-bg/40 hover:bg-soft-sage/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-soft-sage/60 group-hover:bg-soft-sage flex items-center justify-center mb-3 transition-colors">
                    <UploadCloud className="w-6 h-6 text-deep-forest" />
                  </div>
                  <p className="text-xs font-semibold text-charcoal-text mb-1">
                    Click to browse or drag and drop photo
                  </p>
                  <p className="text-[11px] text-natural-gray">
                    PNG, JPG, WEBP up to 5MB (Clear picture of harvest stock)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/jpg"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative mt-2 rounded-2xl overflow-hidden border border-border-gray bg-soft-sage/30 p-2 flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-pure-white shrink-0 border border-border-gray">
                    <Image
                      src={imagePreview}
                      alt="Listing preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grow min-w-0">
                    <p className="text-xs font-bold text-charcoal-text truncate">
                      {selectedImage?.name || "Uploaded photo"}
                    </p>
                    <p className="text-[11px] text-natural-gray mt-0.5">
                      {selectedImage ? `${(selectedImage.size / 1024).toFixed(1)} KB` : ""}
                    </p>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="mt-2 inline-flex items-center gap-1 text-xs text-error-red hover:underline font-semibold"
                    >
                      <X className="w-3.5 h-3.5" /> Remove Photo
                    </button>
                  </div>
                </div>
              )}

              {imageError && (
                <p className="text-xs text-error-red mt-1.5 font-medium">
                  {imageError}
                </p>
              )}
            </div>

            {/* Product Selection */}
            <div>
              <label className="block text-xs font-bold text-charcoal-text uppercase mb-1.5 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-deep-forest" /> Select Product
              </label>
              <select
                {...register("productId", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 rounded-xl border border-border-gray text-sm text-charcoal-text bg-pure-white focus:outline-hidden focus:border-deep-forest font-medium"
              >
                {loadingProducts ? (
                  <option value="">Loading products...</option>
                ) : products.length > 0 ? (
                  products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))
                ) : (
                  <option value="">No products available</option>
                )}
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
              className="w-full py-3.5 bg-deep-forest hover:bg-primary text-pure-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
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
