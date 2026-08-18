import { Handshake, Cloud, PlusSquare, BarChart3 } from "lucide-react";

const quickLinks = [
  {
    icon: Handshake,
    title: "Directly connect\nwith buyers",
  },
  {
    icon: Cloud,
    title: "Get regional\nweather updates",
  },
  {
    icon: PlusSquare,
    title: "List your produce\nin minutes",
  },
  {
    icon: BarChart3,
    title: "Grow with better\nmarket insights",
  },
];

export default function QuickLinks() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-20 -mt-12 relative z-20 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link, i) => {
          const Icon = link.icon;
          return (
            <div
              key={i}
              className="bg-surface rounded-lg p-3 soft-shadow flex items-center gap-3 border border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              <div className="bg-surface-container rounded-full p-2 text-primary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-on-surface font-medium leading-tight whitespace-pre-line">
                {link.title}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
