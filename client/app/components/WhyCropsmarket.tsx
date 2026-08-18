import { ShieldCheck, MessageCircle } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Safe & Trusted",
    description:
      "All users are verified by our team to ensure a secure experience for farmers and buyers.",
  },
  {
    icon: MessageCircle,
    title: "Direct Connections",
    description:
      "No middlemen. Connect directly with farmers through WhatsApp for quick deals.",
  },
];

export default function WhyCropsmarket() {
  return (
    <section className="px-4 md:px-20 mb-6 md:hidden pb-6 border-b border-outline-variant/30">
      <h3 className="font-heading text-lg font-semibold text-on-surface mb-4 text-center">
        Why Cropsmarket?
      </h3>
      <div className="flex flex-col gap-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className="bg-surface-container-low p-4 rounded-lg flex gap-4 items-start"
            >
              <div className="p-2 bg-secondary-container rounded-full text-on-secondary-container shrink-0 mt-1">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-on-surface mb-1">
                  {benefit.title}
                </h4>
                <p className="text-sm text-on-surface-variant">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
