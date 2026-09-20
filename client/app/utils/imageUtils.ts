export function getImageUrl(
  imagePath?: string | null,
  fallbackUrl?: string | null
): string {
  const defaultFallback =
    fallbackUrl ||
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600";

  if (!imagePath) return defaultFallback;

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090/api/v1";
    // Strip '/api/v1' to get base origin e.g. http://localhost:8090
    const origin = apiBaseUrl.replace(/\/api\/v1\/?$/, "");
    return `${origin}${imagePath}`;
  }

  return defaultFallback;
}
