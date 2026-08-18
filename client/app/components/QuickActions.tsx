import { PlusCircle, Store, CloudSun, User } from "lucide-react";

const actions = [
  { icon: PlusCircle, label: "List\nProduce", primary: true },
  { icon: Store, label: "View\nListings", primary: false },
  { icon: CloudSun, label: "Weather\nForecast", primary: false },
  { icon: User, label: "My\nProfile", primary: false },
];

export default function QuickActions() {
  return (
    <section className="px-4 md:px-20 mb-6 md:hidden">
      <h3 className="font-heading text-lg font-semibold text-on-surface mb-3">
        Quick Actions
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={i}
              className="flex flex-col items-center justify-center p-3 bg-surface-container-lowest rounded-lg border border-outline-variant shadow-sm active:scale-95 transition-all group"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  action.primary
                    ? "bg-primary/10"
                    : "bg-surface-variant"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    action.primary ? "text-primary" : "text-on-surface-variant"
                  }`}
                />
              </div>
              <span className="text-xs font-medium text-on-surface text-center leading-tight whitespace-pre-line">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
