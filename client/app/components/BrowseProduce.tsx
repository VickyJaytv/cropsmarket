import { MapPin, ChevronDown } from "lucide-react";

const categories = ["All", "Grains", "Pulses", "Vegetables", "Fruits", "Spices"];

const products = [
  {
    name: "Red Onion",
    weight: "500 kg",
    location: "Coimbatore, Tamil Nadu",
    price: 20,
    time: "2 hours ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHZCMd840nN_Acj0PPRvW65MeU6qVWFyjP2TQg-3Zeoq7pyDxft9TQSReimUIo6qT1tgnI2zO-tMBCqZvD77UBh9f4oGMyammifjD_pbLZdNM9IQygjxA6R1saCUfn-GwiQpj_Kg0RZd1fKbd-ibn_sLY1AKanb3RHllW7m_GaAp8d2Y8TgK0A6xvk25wj8jA9hO_xJ2J8niOXy93VjrP0H4HU8bU5V-augBdy9mvc4GcJlsIkTQH4",
  },
  {
    name: "Paddy (Raw)",
    weight: "1000 kg",
    location: "Thanjavur, Tamil Nadu",
    price: 18,
    time: "5 hours ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGotIgPhLtxR_XEwz9s480QFkJGzTwc0H0PIO3CO6Jnj9pOOawLrUePtU6TuWXWB6qMZAf4k7o8QWT1_RWZpa1QrOVoCSwDbc3D1FYtmT62b20UMs-bH4WjNxWruaFBiIRxEPKa2II8avlDusmKSvuohVWBnWOyM3aMVPkQHnh7LJw7qiHZ3hbQZMcc6pAFealo5MIfqRGMm25NEFct4v459ykSp6ePVfFe2-Ev2fKc6_8tMCl4v6X",
  },
  {
    name: "Tomato",
    weight: "300 kg",
    location: "Madurai, Tamil Nadu",
    price: 15,
    time: "1 day ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXu88YCpS2oimynuf8nht0UUmbEGTuZcYKN2y9M2XlGXuesCaJGqtGblUrN1SjqQVUd8qDjYzfOQ4UlXIW9HMH0WsiX_l2wQ2bjACQoDNQYgC1DikPF8KGbpmynQh7YBLEeXsbC72LuYRqG8fVpAS1VZTU9ZNIGM3OaSU0VDUu874qiZiq_JNu_LGG6qKJQRxY8OeTSztRQtvSiMAU-toN7VpyGVuLHUzjxK3FloTQ2UOujvc9Ymmc",
  },
  {
    name: "Green Chilli",
    weight: "200 kg",
    location: "Erode, Tamil Nadu",
    price: 40,
    time: "1 day ago",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7YSNf4Px4Q2oh9lmsbLX0QEE8SoIfzNm-96Jf-anRyDG315h2Q4C-oGYyar1stDdLxwivNkxhLTuoZTpQrFXQcoSxpsdC5SUUUd-CfzBgmhE4wXNqRxXq1vqZNs17XryX2gfa6GTblxOl73SadoZwNcP0ZaX0ljlRdvatR4U2YVuNECf23LVeB6llyR5Cd0qlu7pwYXtRb8FmLDrGE4HijFvMg2L5SXsZEfCoTdxV_fM7epuh9Vdo",
  },
];

export default function BrowseProduce() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-20 mb-20">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-6 border-b border-outline-variant pb-3">
        <h2 className="font-heading text-xl font-semibold text-on-surface">
          Browse Produce
        </h2>

        {/* Category Chips */}
        <div className="hidden md:flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-colors ${
                i === 0
                  ? "bg-primary text-on-primary"
                  : "bg-surface border border-outline-variant text-on-surface-variant hover:bg-surface-variant"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="hidden md:flex items-center gap-1 text-on-surface-variant text-sm cursor-pointer hover:text-primary">
          <span>Price: Low to High</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* Mobile Category Chips */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-colors ${
              i === 0
                ? "bg-primary text-on-primary"
                : "bg-surface border border-outline-variant text-on-surface-variant hover:bg-surface-variant"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="bg-surface rounded-lg border border-outline-variant overflow-hidden soft-shadow hover:shadow-md transition-shadow cursor-pointer flex flex-col group"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-3 flex-grow flex flex-col">
              <h3 className="font-heading text-base font-semibold text-on-surface mb-1">
                {product.name}
              </h3>
              <span className="text-sm text-on-surface-variant mb-3">
                {product.weight}
              </span>
              <div className="flex items-center text-on-surface-variant text-xs mb-4 mt-auto">
                <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />
                <span>{product.location}</span>
              </div>

              {/* Price Row */}
              <div className="flex justify-between items-end border-t border-outline-variant pt-3">
                <div>
                  <span className="text-lg font-bold text-primary">
                    ₹ {product.price}
                  </span>
                  <span className="text-sm font-normal text-on-surface-variant ml-1">
                    / kg
                  </span>
                </div>
                <span className="text-[11px] text-outline">{product.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
