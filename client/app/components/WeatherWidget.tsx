"use client";

import { CloudSun, CloudRain, Sun, Droplets, MapPin } from "lucide-react";

export default function WeatherWidget() {
  return (
    <section id="weather-widget" className="px-4 md:px-20 -mt-10 relative z-30 mb-6 md:hidden scroll-mt-24">
      <div className="bg-surface-container-lowest rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-4 border border-outline-variant/30">
        {/* Header */}
        <div className="flex flex-col mb-4">
          <div className="flex items-center gap-1 text-deep-forest">
            <MapPin className="w-4 h-4" />
            <h2 className="font-heading text-base font-bold text-on-surface">
              Nigerian Agricultural Hubs
            </h2>
          </div>
          <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider mt-0.5">
            Real-time Farm Region Forecast
          </span>
        </div>

        {/* Current Weather */}
        <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-4">
          <div className="flex items-center gap-3">
            <CloudSun className="w-10 h-10 text-[#FDB813]" fill="currentColor" />
            <div>
              <div className="text-3xl leading-none font-extrabold text-on-surface">
                29°C
              </div>
              <div className="text-xs text-on-surface-variant font-medium mt-1">Oyo Grain Belt</div>
            </div>
          </div>
          <div className="text-right flex flex-col gap-1">
            <span className="text-xs font-medium text-on-surface-variant">
              Dry Harvest Weather
            </span>
            <div className="flex items-center gap-1 text-primary">
              <Droplets className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Humidity 48%</span>
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
}
