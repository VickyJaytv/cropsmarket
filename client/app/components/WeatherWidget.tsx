import { CloudSun, Cloud, CloudRain, Sun, Droplets } from "lucide-react";

const forecast = [
  { day: "Sat", icon: Sun, temp: "23°/32°", color: "text-[#FDB813]" },
  { day: "Sun", icon: CloudSun, temp: "22°/31°", color: "text-[#FDB813]" },
  { day: "Mon", icon: Cloud, temp: "23°/30°", color: "text-outline-variant" },
  { day: "Tue", icon: CloudRain, temp: "22°/31°", color: "text-outline-variant" },
  { day: "Wed", icon: Sun, temp: "23°/32°", color: "text-[#FDB813]" },
];

export default function WeatherWidget() {
  return (
    <section className="px-4 md:px-20 -mt-10 relative z-30 mb-6 md:hidden">
      <div className="bg-surface-container-lowest rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-4 border border-outline-variant/30">
        {/* Header */}
        <div className="flex flex-col mb-4">
          <h2 className="font-heading text-lg font-semibold text-on-surface">
            Coimbatore, Tamil Nadu
          </h2>
          <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
            Today
          </span>
        </div>

        {/* Current Weather */}
        <div className="flex justify-between items-center mb-6 border-b border-outline-variant/20 pb-4">
          <div className="flex items-center gap-3">
            <CloudSun className="w-12 h-12 text-[#FDB813]" fill="currentColor" />
            <div>
              <div className="text-[40px] leading-none font-bold text-on-surface">
                32°C
              </div>
              <div className="text-sm text-on-surface-variant">Partly Cloudy</div>
            </div>
          </div>
          <div className="text-right flex flex-col gap-1">
            <span className="text-xs font-medium text-on-surface-variant">
              24°C / 33°C
            </span>
            <div className="flex items-center gap-1 text-primary">
              <Droplets className="w-4 h-4" />
              <span className="text-xs font-medium">Rain chance 20%</span>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="flex justify-between items-center px-1">
          {forecast.map((day) => {
            const Icon = day.icon;
            return (
              <div key={day.day} className="flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-on-surface-variant">
                  {day.day}
                </span>
                <Icon className={`w-5 h-5 ${day.color}`} />
                <span className="text-xs font-medium text-on-surface">
                  {day.temp}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
