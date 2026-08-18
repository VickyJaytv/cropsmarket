import { Search, MapPin, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-[500px] md:h-[500px] flex items-end md:items-center bg-surface-container">
      {/* Desktop Background */}
      <div className="hidden md:block absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.png')" }}
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Mobile Background */}
      <div className="md:hidden absolute inset-0 z-0 bg-primary">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVjdlWKXLGr94S6Kz789ZeSWj_G4rIeLstpMUxussX9BvnIuK8ZXIQnQI0JYbQdV5Q29J8Yn1e5rbPQoNMNEDZoFclZ7_uW4JmXuQCjNpLKJluT8BGtEffBGBnPDqA5Mc1g2e9h_RwbLCXmX83YeSXxfkQGXzNUUTjQVBN9cdUClV3XEnREi2YXSc92Ak-jfMnedSfL8P6kRam5tDyhN323g5s00BrfScM7-7leLmEfZz89q7rWgHu"
          alt="Farmer in field"
          className="w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
      </div>

      {/* Desktop Content */}
      <div className="hidden md:block relative z-10 w-full max-w-7xl mx-auto px-20">
        <div className="max-w-2xl mb-6">
          <h1 className="font-display text-[40px] leading-[48px] tracking-[-0.02em] font-bold text-primary mb-2">
            Connect. Trade. Grow.
          </h1>
          <p className="text-base leading-6 text-on-surface-variant">
            A climate-smart marketplace for farmers and buyers.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-surface rounded-xl soft-shadow p-1 flex flex-col md:flex-row items-center gap-1 max-w-4xl border border-outline-variant">
          <div className="flex-grow flex items-center px-3 w-full md:w-auto">
            <Search className="w-5 h-5 text-on-surface-variant mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search for produce (e.g., Onion, Rice, Tomato)"
              className="w-full bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder-on-surface-variant py-3 outline-none"
            />
          </div>
          <div className="hidden md:block w-px h-8 bg-outline-variant mx-1" />
          <div className="flex items-center px-3 w-full md:w-auto border-t md:border-t-0 border-outline-variant pt-3 md:pt-0">
            <MapPin className="w-5 h-5 text-on-surface-variant mr-2 shrink-0" />
            <select className="bg-transparent border-none focus:ring-0 text-sm text-on-surface cursor-pointer w-full md:w-40 appearance-none outline-none">
              <option>All Locations</option>
              <option>Coimbatore</option>
              <option>Madurai</option>
            </select>
            <ChevronDown className="w-4 h-4 text-on-surface-variant ml-1 shrink-0" />
          </div>
          <button className="w-full md:w-auto bg-primary text-on-primary text-xs font-semibold tracking-wider uppercase px-6 py-3 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
            Search
          </button>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="md:hidden relative z-10 p-4 pt-6 pb-[120px] flex flex-col w-full">
        <h1 className="font-heading text-[24px] leading-[32px] font-bold text-white mb-2 max-w-[250px]">
          Smart farming starts with better insights
        </h1>
        <p className="text-sm leading-5 text-white/90 max-w-[200px]">
          Get weather forecasts, list your produce, and connect with trusted buyers.
        </p>
      </div>

      {/* Mobile Farmer Cutout */}
      <div className="md:hidden absolute bottom-0 right-0 w-2/3 h-[180px] z-20 pointer-events-none">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6uYzkINQSQV7f-ZNe08Z84X4MWiGOM0V9PASLIo6ix-Oi3aNXquY4jEAeA6KBS13vyxq8oGHosbm6FquouIT1dDqp4XznQatsAm7s_I8yxvX2e9Q-3I5ZeLKc6Q-D5DvsmI-4sikku4E1kocNcadzcbgz_RcxPKAKRKjGVkm_fPryg1NauzXc0oLPJdxhyeIoQbE1DLEWJfuYUPqoysxq5nkXpc4xHnQjBHOP8SOfpUG5_41Gfx2P"
          alt="Farmer with phone"
          className="w-full h-full object-contain object-bottom right-0 absolute"
        />
      </div>
    </section>
  );
}
