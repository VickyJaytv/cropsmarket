import React from "react";
import Image from "next/image";

export const InsightCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
      <div className="bg-pure-white rounded-2xl p-6 border border-border-gray shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-full sm:w-1/2 h-44 rounded-xl overflow-hidden bg-soft-sage shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=600"
            alt="Farm Gate Quality Standards"
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <span className="text-[11px] font-bold text-fresh-leaf uppercase tracking-wider">
            Verified Standards
          </span>
          <h4 className="font-bold text-lg text-charcoal-text leading-snug">
            Agronomist Batch Verification
          </h4>
          <p className="text-xs text-natural-gray leading-relaxed">
            Every listed consignment undergoes moisture and grade purity tests before haulage dispatch.
          </p>
        </div>
      </div>

      <div className="bg-pure-white rounded-2xl p-6 border border-border-gray shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-full sm:w-1/2 h-44 rounded-xl overflow-hidden bg-soft-sage shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=600"
            alt="Cold-Chain & Tracked Haulage"
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <span className="text-[11px] font-bold text-fresh-leaf uppercase tracking-wider">
            Logistics &amp; Transport
          </span>
          <h4 className="font-bold text-lg text-charcoal-text leading-snug">
            Nationwide Transit Fleet
          </h4>
          <p className="text-xs text-natural-gray leading-relaxed">
            Vetted truck operators with GPS tracking transport grain batches directly from farm gates across 36 states.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsightCards;
