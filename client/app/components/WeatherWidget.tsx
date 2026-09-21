import React from "react";
import { Cloud, Droplets, Wind, Thermometer } from "lucide-react";

export const WeatherWidget: React.FC = () => {
  return (
    <section className="bg-pure-white rounded-2xl p-6 border border-border-gray shadow-xs my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border-gray/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-soft-sage flex items-center justify-center text-deep-forest">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-charcoal-text">Agro-Climatic Intelligence</h3>
            <p className="text-xs text-natural-gray">Live regional weather &amp; harvest drying conditions</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-fresh-leaf bg-soft-sage/60 px-3 py-1.5 rounded-full">
          <Thermometer className="w-3.5 h-3.5" />
          <span>Optimal Harvest Conditions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {/* Oyo State Hub */}
        <div className="p-4 rounded-xl bg-warm-cream/50 border border-border-gray/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-charcoal-text">Oyo &amp; Southwest Hub</span>
            <span className="text-lg font-extrabold text-deep-forest">29°C</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-natural-gray">
            <div className="flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-fresh-leaf" />
              <span>Wind 12 km/h</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-info-blue" />
              <span>Humidity 48%</span>
            </div>
          </div>
        </div>

        {/* Regional Hubs */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-soft-sage/40 p-2 rounded-lg">
            <span className="text-[11px] text-natural-gray block">Kano Hub</span>
            <span className="font-bold text-charcoal-text">31°C Sunny</span>
          </div>
          <div className="bg-soft-sage/40 p-2 rounded-lg">
            <span className="text-[11px] text-natural-gray block">Benue Hub</span>
            <span className="font-bold text-charcoal-text">28°C Clear</span>
          </div>
          <div className="bg-soft-sage/40 p-2 rounded-lg">
            <span className="text-[11px] text-natural-gray block">Ogun Hub</span>
            <span className="font-bold text-charcoal-text">27°C Mild</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;
