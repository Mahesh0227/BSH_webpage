import { Fragment } from "react";
import {
  Car,
  Plane,
  MapPinned,
  Building2,
  HeartHandshake,
  Map,
  ArrowRight,
  CalendarCheck,
  UserCheck,
  CarFront,
  MapPin,
  Users,
} from "lucide-react";

// Real fleet photos — path matches src/components/home/Services.tsx → src/assets/cars/
import dzireImg from "../../assets/cars/Dzire-taxi-services-in-visakhapatnam-bshtaxiservices.jpg";
import ertigaImg from "../../assets/cars/ertiga-taxi-services-in-visakhapatnam-bshtaxiservices.png";
import innovaImg from "../../assets/cars/innova-crysta-in-vizag-bshtaxiservices.png";
import tempoTravellerImg from "../../assets/cars/17-seater-tempo-traveller-bshtaxiservices.png";

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/*  Update these arrays to change copy, pricing, or icons — no JSX    */
/*  edits needed elsewhere.                                           */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    icon: Car,
    title: "Local Taxi",
    description: "Comfortable rides within the city",
  },
  {
    icon: Plane,
    title: "Airport Transfer",
    description: "On-time airport pickup & drop",
  },
  {
    icon: MapPinned,
    title: "Outstation Taxi",
    description: "One way / Round trip to any city",
  },
  {
    icon: Building2,
    title: "Corporate Travel",
    description: "Reliable travel for your business",
  },
  {
    icon: HeartHandshake,
    title: "Wedding Cars",
    description: "Make your special day extra special",
  },
  {
    icon: Map,
    title: "Tour Packages",
    description: "Custom packages for amazing trips",
  },
];

type VehicleType = "sedan" | "mpv" | "van";

interface FleetItem {
  name: string;
  seats: number;
  rate: number;
  vehicleType: VehicleType;
  /** Swap for a real photo path, e.g. "/fleet/swift-dzire.png" — overrides the illustration */
  image?: string;
}

const fleet: FleetItem[] = [
  {
    name: "Swift Dzire",
    seats: 4,
    rate: 13,
    vehicleType: "sedan",
    image: dzireImg,
  },
  {
    name: "Maruti Ertiga",
    seats: 6,
    rate: 16,
    vehicleType: "mpv",
    image: ertigaImg,
  },
  {
    name: "Toyota Innova",
    seats: 7,
    rate: 18,
    vehicleType: "mpv",
    image: innovaImg,
  },
  {
    name: "Tempo Traveller",
    seats: 12,
    rate: 22,
    vehicleType: "van",
    image: tempoTravellerImg,
  },
];

interface StepItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    icon: CalendarCheck,
    title: "Book Online",
    description: "Enter your trip details and book your ride",
  },
  {
    icon: UserCheck,
    title: "Driver Assigned",
    description: "We assign the best driver near you",
  },
  {
    icon: CarFront,
    title: "Ride Starts",
    description: "Enjoy a safe and comfortable ride",
  },
  {
    icon: MapPin,
    title: "Reach Destination",
    description: "We drop you safely to your destination",
  },
];

/* ------------------------------------------------------------------ */
/*  SHARED BITS                                                        */
/* ------------------------------------------------------------------ */

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="mb-10 flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-blue-600/40" />
      <h2 className="text-base font-extrabold uppercase tracking-[0.2em] text-slate-900">
        {label}
      </h2>
      <span className="h-px w-8 bg-blue-600/40" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 1 — OUR SERVICES                                          */
/* ------------------------------------------------------------------ */

function Services() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="mx-auto w-full px-6 lg:px-12">
        <Eyebrow label="Our Services" />

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="group flex flex-col items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-600/10"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[15px] font-extrabold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION 2 — FLEET (left) + HOW IT WORKS (right), side by side     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  ORIGINAL VEHICLE ILLUSTRATIONS                                    */
/*  Simple line-art per body type — no third-party photos, so there's */
/*  zero licensing risk. Swap for a real photo via `item.image`.      */
/* ------------------------------------------------------------------ */

function SedanIllustration() {
  return (
    <svg viewBox="0 0 120 56" className="h-10 w-full" fill="none">
      <path
        d="M10 40h100M16 40c0-4 2-7 5-9l8-14c2-3 5-4 9-4h20c4 0 7 1 9 4l8 14c3 2 5 5 5 9"
        stroke="#1D4ED8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 25l6-11c1-2 3-3 6-3h16c3 0 5 1 6 3l6 11"
        stroke="#93C5FD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="40" r="6.5" fill="#1E293B" />
      <circle cx="86" cy="40" r="6.5" fill="#1E293B" />
      <circle cx="34" cy="40" r="2.5" fill="#CBD5E1" />
      <circle cx="86" cy="40" r="2.5" fill="#CBD5E1" />
    </svg>
  );
}

function MpvIllustration() {
  return (
    <svg viewBox="0 0 120 56" className="h-10 w-full" fill="none">
      <path
        d="M8 40h104M14 40c0-4 1-7 4-9l4-15c1-3 4-5 8-5h60c4 0 7 2 8 5l4 15c3 2 4 5 4 9"
        stroke="#1D4ED8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 26l3-13c1-2 2-3 4-3h56c2 0 3 1 4 3l3 13"
        stroke="#93C5FD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M50 11v15M70 11v15" stroke="#93C5FD" strokeWidth="1.6" />
      <circle cx="32" cy="40" r="6.5" fill="#1E293B" />
      <circle cx="88" cy="40" r="6.5" fill="#1E293B" />
      <circle cx="32" cy="40" r="2.5" fill="#CBD5E1" />
      <circle cx="88" cy="40" r="2.5" fill="#CBD5E1" />
    </svg>
  );
}

function VanIllustration() {
  return (
    <svg viewBox="0 0 120 56" className="h-10 w-full" fill="none">
      <path
        d="M6 40h108M12 40V15c0-2 2-4 4-4h84c4 0 6 2 6 6v23"
        stroke="#1D4ED8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 25V15c0-1 1-2 2-2h10v12H18z"
        stroke="#93C5FD"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M38 13v12M58 13v12M78 13v12M98 13v12" stroke="#93C5FD" strokeWidth="1.6" />
      <circle cx="30" cy="40" r="6.5" fill="#1E293B" />
      <circle cx="94" cy="40" r="6.5" fill="#1E293B" />
      <circle cx="30" cy="40" r="2.5" fill="#CBD5E1" />
      <circle cx="94" cy="40" r="2.5" fill="#CBD5E1" />
    </svg>
  );
}

const vehicleIllustrations: Record<VehicleType, React.ComponentType> = {
  sedan: SedanIllustration,
  mpv: MpvIllustration,
  van: VanIllustration,
};

function FleetCard({ item }: { item: FleetItem }) {
  const Illustration = vehicleIllustrations[item.vehicleType];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md hover:shadow-blue-600/10">
      <div className="grid h-24 place-items-center bg-slate-50 px-2">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain"
          />
        ) : (
          <Illustration />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="truncate text-[13px] font-extrabold text-slate-900">
          {item.name}
        </h3>
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <Users size={11} />
          <span>{item.seats} Seater</span>
        </div>
        <p className="text-sm font-extrabold text-blue-600">
          ₹{item.rate}
          <span className="text-[10px] font-medium text-slate-400"> /KM</span>
        </p>
        <button
          type="button"
          className="mt-1 inline-flex items-center justify-center gap-1 rounded-md border border-blue-100 bg-blue-50 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
        >
          Book Now
          <ArrowRight size={12} />
        </button>
      </div>
    </article>
  );
}

function StepCard({ step, index }: { step: StepItem; index: number }) {
  const Icon = step.icon;

  return (
    <div className="relative flex h-[136px] min-w-0 flex-1 flex-col items-center rounded-xl border border-slate-100 bg-white p-3 pt-5 text-center shadow-sm">
      <span className="absolute -top-3 grid h-7 w-7 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm">
        {index + 1}
      </span>
      <div className="mb-2 grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-blue-600">
        <Icon size={18} strokeWidth={2} />
      </div>
      <h3 className="text-[12px] font-extrabold leading-tight text-slate-900">
        {step.title}
      </h3>
      <p className="mt-1 text-[10px] leading-snug text-slate-500">
        {step.description}
      </p>
    </div>
  );
}

function FleetAndHowItWorks() {
  return (
    <section id="fleet" className="bg-slate-50/60 py-20">
      <div className="mx-auto w-full px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* LEFT — Our Premium Fleet */}
          <div>
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-extrabold uppercase tracking-[0.2em] text-slate-900">
                  Our Premium Fleet
                </h2>
                <span className="h-px w-8 bg-blue-600/40" />
              </div>
              <a
                href="#fleet"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View All Fleet
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {fleet.map((item) => (
                <FleetCard key={item.name} item={item} />
              ))}
            </div>
          </div>

          {/* RIGHT — How It Works */}
          <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-center text-base font-extrabold uppercase tracking-[0.2em] text-slate-900">
              How It Works
            </h2>

            <div className="flex flex-1 items-start gap-1.5 sm:gap-3">
              {steps.map((step, index) => (
                <Fragment key={step.title}>
                  <StepCard step={step} index={index} />
                  {index < steps.length - 1 && (
                    <ArrowRight
                      size={16}
                      className="mt-8 shrink-0 text-blue-300"
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPORT — single default export, drop this file in and go          */
/* ------------------------------------------------------------------ */

export default function TravelSections() {
  return (
    <>
      <Services />
      <FleetAndHowItWorks />
    </>
  );
}