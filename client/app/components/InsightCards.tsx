export default function InsightCards() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-20 mb-20 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Weather Card */}
      <div className="bg-blue-50 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden border border-blue-100">
        <div className="relative z-10 w-2/3">
          <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
            Check Weather Forecast
          </h3>
          <p className="text-sm text-on-surface-variant mb-6">
            Plan your farming with accurate regional weather updates.
          </p>
          <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity w-fit">
            View Weather
          </button>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-80">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvIWPzNpLR2J__bypOQX5zZa1FOZuMqD9e--LpdOIlUhaYHL3_Pmra0so8_8phpOzkMsZQSCu_N20En_LdJH3Fox9cQZ4yrOKafYk16HFWOiGnEKp3yLmpqEF6vJyALh_gP7ZK4-rFDXawhHB5I4alVM2Wt_hftGV3WlYIeyoyVjo0nC9uxErHqPvk6aj1Cr8vhFNnQv74-1VOIB3qm7Hi5u9rllduWzs1cX5lJ12vA0eVK3ZHspUQ"
            alt="Weather illustration"
            className="w-full h-full object-contain object-bottom right-0 bottom-0 absolute translate-x-4 translate-y-4"
          />
        </div>
      </div>

      {/* Buyer Card */}
      <div className="bg-orange-50 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden border border-orange-100">
        <div className="relative z-10 w-2/3">
          <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
            Are you a Buyer?
          </h3>
          <p className="text-sm text-on-surface-variant mb-6">
            Find quality produce directly from verified farmers.
          </p>
          <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity w-fit">
            Browse Listings
          </button>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-90">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATi9_iizwpKUro0twoSMrHlxe-6cB3c8ftUf27xXAQpmXCZyYJbUAXLEbzLhKjGMxUyobOVjA5Pf1d7CsZaWKhkA6UnBtcW3Pwj7Qc6CJo5SU68xz3k8tBR1-NunnsFSz_uDbskfhfGAAZ1QUiZSLIphRTPgHGIDRftkR30ET-bIBmmvx412hBS7FoDfUBF-9XUNquaOWIa5ulCTKu3DxIc8Pb4V00GnceEIXfBTu1R-b-S_bqietZ"
            alt="Vegetable basket illustration"
            className="w-full h-full object-contain object-bottom right-0 bottom-0 absolute translate-x-2"
          />
        </div>
      </div>
    </section>
  );
}
