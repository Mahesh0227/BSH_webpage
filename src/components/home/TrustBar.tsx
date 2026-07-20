import { ShieldCheck, UserCheck, Tag, Headset, type LucideIcon } from "lucide-react";
import SectionHeading from "../ui/SectionHeading"; // ← adjust path to match Features.tsx's import

type TrustItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

// Matches the 4 cards under "— WHY CHOOSE BSH TAXI SERVICES —" in the design.
// If you'd rather keep this data-driven, move this array back into
// ../../data/trustItems and update the copy there to match.
const trustItems: TrustItem[] = [
  { icon: ShieldCheck, title: "Safe & Secure", description: "Your safety is our top priority" },
  { icon: UserCheck, title: "Professional Drivers", description: "Trained, verified & experienced" },
  { icon: Tag, title: "Best Price Guarantee", description: "No hidden charges, best fares" },
  { icon: Headset, title: "24/7 Support", description: "We're always here for you" },
];

export default function TrustBar() {
  return (
    <section className="relative z-10 pb-16">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <SectionHeading eyebrow="Why Choose BSH Taxi Services" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group flex min-h-[128px] items-center gap-4 rounded-2xl border border-slate-100 bg-white px-6 py-6 shadow-[0_10px_30px_rgba(16,24,40,0.06)] transition-all duration-200 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_20px_45px_rgba(16,24,40,0.12)]"
            >
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary-light to-blue-50 text-primary ring-1 ring-primary/10 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3">
                <Icon size={24} strokeWidth={2} />
              </div>
              <div>
                <p className="text-base font-semibold leading-tight text-slate-900">{title}</p>
                <p className="mt-1.5 text-sm leading-snug text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}