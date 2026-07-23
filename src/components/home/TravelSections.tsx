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

import dzireImg from "../../assets/cars/Dzire-taxi-services-in-visakhapatnam-bshtaxiservices.jpg";
import ertigaImg from "../../assets/cars/ertiga-taxi-services-in-visakhapatnam-bshtaxiservices.png";
import innovaImg from "../../assets/cars/innova-crysta-in-vizag-bshtaxiservices.png";
import tempoTravellerImg from "../../assets/cars/17-seater-tempo-traveller-bshtaxiservices.png";

import { useBooking } from "../booking/BookingContext";

/* DATA — unchanged from before */
interface ServiceItem { icon: React.ElementType; title: string; description: string; }
const services: ServiceItem[] = [
  { icon: Car, title: "Local Taxi", description: "Comfortable rides within the city" },
  { icon: Plane, title: "Airport Transfer", description: "On-time airport pickup & drop" },
  { icon: MapPinned, title: "Outstation Taxi", description: "One way / Round trip to any city" },
  { icon: Building2, title: "Corporate Travel", description: "Reliable travel for your business" },
  { icon: HeartHandshake, title: "Wedding Cars", description: "Make your special day extra special" },
  { icon: Map, title: "Tour Packages", description: "Custom packages for amazing trips" },
];

type VehicleType = "sedan" | "mpv" | "van";
interface FleetItem { name: string; seats: number; rate: number; vehicleType: VehicleType; image?: string; }
const fleet: FleetItem[] = [
  { name: "Swift Dzire", seats: 4, rate: 13, vehicleType: "sedan", image: dzireImg },
  { name: "Maruti Ertiga", seats: 6, rate: 16, vehicleType: "mpv", image: ertigaImg },
  { name: "Toyota Innova", seats: 7, rate: 18, vehicleType: "mpv", image: innovaImg },
  { name: "Tempo Traveller", seats: 12, rate: 22, vehicleType: "van", image: tempoTravellerImg },
];

interface StepItem { icon: React.ElementType; title: string; description: string; }
const steps: StepItem[] = [
  { icon: CalendarCheck, title: "Book Online", description: "Enter your trip details and book your ride" },
  { icon: UserCheck, title: "Driver Assigned", description: "We assign the best driver." },
  { icon: CarFront, title: "Ride Starts", description: "Enjoy a safe and comfortable ride" },
  { icon: MapPin, title: "Reach Destination", description: "We drop you safely to your destination" },
];

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-linear-to-r from-transparent to-blue-600/40" />
      <h2 className="text-base font-extrabold uppercase tracking-[0.2em] text-slate-900">{label}</h2>
      <span className="h-px w-8 bg-linear-to-l from-transparent to-blue-600/40" />
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="bg-white py-10">
      <div className="mx-auto w-full max-w-[80em] px-6 lg:px-12">
        <Eyebrow label="Our Services" />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="group flex h-full flex-col items-start gap-4 rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-slate-100 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(16,24,40,0.10)] hover:ring-primary/15"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-primary/10 to-blue-50 text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/25">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[15px] font-extrabold leading-tight text-slate-900">{service.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{service.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SedanIllustration() {
  return (
    <svg viewBox="0 0 120 56" className="h-10 w-full" fill="none">
      <path d="M10 40h100M16 40c0-4 2-7 5-9l8-14c2-3 5-4 9-4h20c4 0 7 1 9 4l8 14c3 2 5 5 5 9" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31 25l6-11c1-2 3-3 6-3h16c3 0 5 1 6 3l6 11" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      <path d="M8 40h104M14 40c0-4 1-7 4-9l4-15c1-3 4-5 8-5h60c4 0 7 2 8 5l4 15c3 2 4 5 4 9" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 26l3-13c1-2 2-3 4-3h56c2 0 3 1 4 3l3 13" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
      <path d="M6 40h108M12 40V15c0-2 2-4 4-4h84c4 0 6 2 6 6v23" stroke="#1D4ED8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 25V15c0-1 1-2 2-2h10v12H18z" stroke="#93C5FD" strokeWidth="2" strokeLinejoin="round" />
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

function FleetCard({ item, onBookNow }: { item: FleetItem; onBookNow: (name: string) => void }) {
  const Illustration = vehicleIllustrations[item.vehicleType];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(16,24,40,0.12)] hover:ring-primary/15">
      <div className="relative h-56 w-full overflow-hidden bg-slate-50 sm:h-64">
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-110" />
        ) : (
          <div className="grid h-full place-items-center px-4"><Illustration /></div>
        )}
        <span className="absolute right-3 top-3 rounded-lg bg-white px-2.5 py-1.5 text-xs font-extrabold text-primary shadow-md ring-1 ring-slate-100">
          ₹{item.rate}<span className="font-medium text-slate-400"> /km</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base font-extrabold leading-tight text-slate-900">{item.name}</h3>
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Users size={13} className="text-primary" />
          <span>{item.seats} Seater</span>
        </div>
        <button
          type="button"
          onClick={() => onBookNow(item.name)}
          className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          Book Now
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}

function StepCard({ step, index }: { step: StepItem; index: number }) {
  const Icon = step.icon;
  return (
    <div className="relative flex flex-1 flex-col items-center rounded-2xl bg-white px-5 py-7 text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-slate-100 transition-all duration-200 hover:-translate-y-1 hover:ring-primary/15">
      <span className="absolute -top-3.5 grid h-8 w-8 place-items-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/25 ring-4 ring-white">{index + 1}</span>
      <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-primary/10 to-blue-50 text-primary"><Icon size={22} strokeWidth={2} /></div>
      <h3 className="text-sm font-bold leading-tight text-slate-900">{step.title}</h3>
      <p className="mt-1.5 max-w-36 text-xs leading-relaxed text-slate-500">{step.description}</p>
    </div>
  );
}

function FleetAndHowItWorks({ onBookNow }: { onBookNow: (name: string) => void }) {
  return (
    <section id="fleet" className="bg-slate-50/60 py-6">
      <div className="mx-auto w-full max-w-[80em] px-6 lg:px-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-extrabold uppercase tracking-[0.2em] text-slate-900">Our Premium Fleet</h2>
            <span className="h-px w-8 bg-linear-to-r from-primary/40 to-transparent" />
          </div>
          <a href="#fleet" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5">
            View All Fleet
            <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {fleet.map((item) => (
            <FleetCard key={item.name} item={item} onBookNow={onBookNow} />
          ))}
        </div>

        <div className="mt-10">
          <h2 className="mb-6 text-center text-base font-extrabold uppercase tracking-[0.2em] text-slate-900">How It Works</h2>
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            {steps.map((step, index) => (
              <Fragment key={step.title}>
                <StepCard step={step} index={index} />
                {index < steps.length - 1 && (
                  <ArrowRight size={20} className="mx-auto hidden shrink-0 text-primary/30 sm:block" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TravelSections() {
  const { openBooking } = useBooking();

  function handleBookNow(name: string) {
    openBooking({ vehicleName: name, resetTrip: true });
  }

  return (
    <>
      <Services />
      <FleetAndHowItWorks onBookNow={handleBookNow} />
    </>
  );
}