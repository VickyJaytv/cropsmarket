import { MapPin } from "lucide-react";
import Link from "next/link";

const listings = [
  {
    name: "Red Onion",
    weight: "500 kg",
    location: "Coimbatore, TN",
    price: 20,
    time: "2 hours ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrDRWFMGUs-XNs_e6JbGGZbVyN65MgVLQgl0XJeR_czooEGIcUthv7a0mgcNnbYr66hRr7vuknFR5-e44ObJeUhGkTHGGr5YVCiALgwaFwVznBkvJk5z8NHUsMI4ShXnfPBBJzH2gj_XJQnIKNEVGsOhnwRDraVgzjEWQ9sekscM1LHytCSdAUO-RdYX7VY22m0phElLyf79NI62vbXJq6kOp_ACtdl6nhnqYAy3m2fPcNCwAaqNk9",
  },
  {
    name: "Paddy (Raw)",
    weight: "1000 kg",
    location: "Thanjavur, TN",
    price: 18,
    time: "5 hours ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-VAsF7uwLRHkcmDaioBHlOoeoNSFUIRId9CCAaWH5ojiAzwwD4hjnJhfZ79eCbo5oHSJkh0i2uDT6FletWOPD5OCrPa33gNPjd36-PHkHkNTrPv4FHQ6hbNuVTLG-fSJLrpBZqc0fYxcIZv_rSeY_kah1vXM2NnxUxIIpdxejjB4YZ2-I19FdYpKA5jXLm2oGqGWTp8e3LamZWubN9aKHzkvBG-Sp67e4n2mwCA0Cjz_YCGNemCJq",
  },
];

export default function RecentListings() {
  return (
    <section className="px-4 md:px-20 mb-6 md:hidden flex-1">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-heading text-lg font-semibold text-on-surface">
          Recent Listings
        </h3>
        <Link
          href="/listings"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {listings.map((item) => (
          <div
            key={item.name}
            className="flex bg-surface-container-lowest rounded-lg border border-outline-variant shadow-sm overflow-hidden p-2 gap-3 hover:shadow-md transition-shadow"
          >
            {/* Thumbnail */}
            <div className="w-20 h-20 rounded bg-surface-variant shrink-0 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <h4 className="text-base font-semibold text-on-surface line-clamp-1">
                  {item.name}
                </h4>
                <span className="text-xs font-medium text-on-surface-variant">
                  {item.weight}
                </span>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-medium truncate">
                  {item.location}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col items-end justify-between py-1 pl-2">
              <span className="text-lg font-bold text-primary">
                ₹ {item.price}
                <span className="text-xs font-normal text-on-surface-variant">
                  /kg
                </span>
              </span>
              <span className="text-[10px] text-on-surface-variant whitespace-nowrap">
                {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
