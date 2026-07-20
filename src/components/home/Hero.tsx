import { useEffect, useState } from "react";
import {
  MapPin,
  Navigation2,
  X,
  Phone,
  Car,
  Clock,
  Plane,
  Map as MapIcon,
  CalendarDays,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
  UserCheck,
  Headset,
  Users,
  type LucideIcon,
} from "lucide-react";

// NOTE: placeholder photos — swap in your own hosted, branded car images.
type TabKey = "Outstation" | "Local" | "Airport" | "Tour";

const TAB_ORDER: TabKey[] = ["Outstation", "Local", "Airport", "Tour"];

type TabConfig = {
  icon: LucideIcon;
  label: string;
  tripOptions: string[];
  dropLabel: string;
  dropPlaceholder: string;
  image: string;
  imageAlt: string;
};

const TAB_CONFIG: Record<TabKey, TabConfig> = {
  Outstation: {
    icon: Car,
    label: "Outstation",
    tripOptions: ["One Way", "Round Trip"],
    dropLabel: "Drop location",
    dropPlaceholder: "Enter a location",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "Car driving on a highway between mountains for outstation trips",
  },
  Local: {
    icon: Clock,
    label: "Local",
    tripOptions: ["One Way", "Round Trip"],
    dropLabel: "Drop location",
    dropPlaceholder: "Enter a location",
    image:
      "https://images.unsplash.com/photo-1583550267251-5d138b0275bf?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "Car on a city street for local rides",
  },
  Airport: {
    icon: Plane,
    label: "Airport",
    tripOptions: ["One Way", "Round Trip"],
    dropLabel: "Drop location",
    dropPlaceholder: "Visakhapatnam Airport",
    image:
      "https://images.unsplash.com/photo-1659132203996-a9ed54db246f?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "Car with an airplane in the background for airport transfers",
  },
  Tour: {
    icon: MapIcon,
    label: "Tour",
    tripOptions: ["One Day", "Multi Day"],
    dropLabel: "Destination",
    dropPlaceholder: "Enter a destination",
    image:
      "https://images.unsplash.com/photo-1580494766979-ccfecebfbc8a?auto=format&fit=crop&w=1200&q=70",
    imageAlt: "Car on a road lined with palm trees for tour packages",
  },
};

// Matches the 4-badge row shown directly under the hero subtext in the design.
const heroBadges = [
  { icon: ShieldCheck, title: "Safe & Secure", description: "Your safety is our priority" },
  { icon: UserCheck, title: "Professional Drivers", description: "Trained & Experienced" },
  { icon: IndianRupee, title: "Best Price Guarantee", description: "No hidden charges" },
  { icon: Headset, title: "24/7 Support", description: "We're always here" },
];

const PASSENGER_OPTIONS = ["1 Passenger", "2 Passengers", "3 Passengers", "4+ Passengers"];

export default function Hero() {
  const [tripType, setTripType] = useState<TabKey>("Outstation");
  const [tripOption, setTripOption] = useState<string>(TAB_CONFIG.Outstation.tripOptions[0]);
  const [pickup, setPickup] = useState("Visakhapatnam");
  const [drop, setDrop] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState(PASSENGER_OPTIONS[0]);
  const [error, setError] = useState("");
  const [imageVisible, setImageVisible] = useState(true);

  const config = TAB_CONFIG[tripType];

  useEffect(() => {
    setImageVisible(false);
    const timeout = setTimeout(() => setImageVisible(true), 20);
    return () => clearTimeout(timeout);
  }, [tripType]);

  function handleTabChange(tab: TabKey) {
    setTripType(tab);
    setTripOption(TAB_CONFIG[tab].tripOptions[0]);
    setError("");
  }

  function handleSearch() {
    if (!pickup.trim() || !drop.trim()) {
      setError("Please enter both pickup and drop locations.");
      return;
    }
    setError("");
    // TODO: hook this up to your search/booking flow (e.g. navigate to a
    // results page or open a quote form).
  }

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-primary-light/70 via-primary-light/25 to-white"
    >
      <div className="grid flex-1 lg:grid-cols-2 lg:auto-rows-fr">
        {/* Text column */}
        <div className="mx-auto flex w-[92%] max-w-[620px] flex-col justify-center py-14 lg:mx-0 lg:w-full lg:max-w-none lg:py-24 lg:pl-[6%] lg:pr-10">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 shadow-sm shadow-slate-200/50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Trusted by 20,000+ Happy Travellers
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
            Your Journey,
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              Our Responsibility.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
            Safe, reliable and affordable taxi services across Visakhapatnam and Andhra Pradesh.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-1.5 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 active:translate-y-0"
            >
              Book Taxi
              <ArrowRight size={16} />
            </button>

            <a
              href="tel:+918886803322"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md"
            >
              <Phone size={16} />
              Call Now
            </a>
          </div>

          {/* Trust badges — 4 inline items matching the design */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
            {heroBadges.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-primary shadow-sm shadow-slate-200/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image column — fills the entire right half edge-to-edge, full height */}
        <div className="relative h-72 sm:h-96 lg:h-auto">
          <img
            key={tripType}
            src={config.image}
            alt={config.imageAlt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
              imageVisible ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Soft blend into the text column on desktop */}
          <div className="absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-primary-light/60 to-transparent lg:block" />
        </div>
      </div>

      {/* Booking widget — floats over the hero, full-width boxed fields */}
      <div className="relative z-10 mx-auto -mt-6 mb-10 w-[96%] max-w-[1440px] rounded-2xl border border-slate-100 bg-white/95 p-5 shadow-[0_25px_60px_-15px_rgba(16,24,40,0.25)] backdrop-blur-sm sm:mb-14 sm:p-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-6 border-b border-slate-100 pb-3">
          {TAB_ORDER.map((tab) => {
            const TabIcon = TAB_CONFIG[tab].icon;
            const active = tab === tripType;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabChange(tab)}
                className={`-mb-3 flex items-center gap-1.5 border-b-2 pb-3 text-sm font-semibold outline-none transition-colors focus-visible:text-primary ${
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <TabIcon size={16} />
                {TAB_CONFIG[tab].label}
              </button>
            );
          })}
        </div>

        {/* Fields */}
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-stretch">
          <div className="min-w-0 flex-1">
            <label htmlFor="pickup" className="mb-1.5 block text-xs font-medium text-slate-500">
              Pickup location
            </label>
            <div className="flex h-[46px] items-center gap-2 rounded-xl border border-slate-200 px-3.5 transition-all duration-150 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 hover:border-slate-300">
              <MapPin size={16} className="shrink-0 text-primary" />
              <input
                id="pickup"
                type="text"
                value={pickup}
                onChange={(event) => setPickup(event.target.value)}
                placeholder="Enter pickup location"
                className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              {pickup && (
                <button
                  type="button"
                  onClick={() => setPickup("")}
                  aria-label="Clear pickup location"
                  className="shrink-0 rounded-full p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <label htmlFor="drop" className="mb-1.5 block text-xs font-medium text-slate-500">
              {config.dropLabel}
            </label>
            <div className="flex h-[46px] items-center gap-2 rounded-xl border border-slate-200 px-3.5 transition-all duration-150 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 hover:border-slate-300">
              <Navigation2 size={16} className="shrink-0 text-primary" />
              <input
                id="drop"
                type="text"
                value={drop}
                onChange={(event) => setDrop(event.target.value)}
                placeholder={config.dropPlaceholder}
                className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              {drop && (
                <button
                  type="button"
                  onClick={() => setDrop("")}
                  aria-label="Clear drop location"
                  className="shrink-0 rounded-full p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-slate-500">Trip</p>
            <div className="flex h-[46px] overflow-hidden rounded-xl border border-slate-200 shadow-inner shadow-slate-100">
              {config.tripOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTripOption(option)}
                  className={`whitespace-nowrap px-4 text-sm font-semibold outline-none transition-colors duration-150 ${
                    tripOption === option
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="departure" className="mb-1.5 block text-xs font-medium text-slate-500">
              Departure
            </label>
            <div className="flex h-[46px] items-center gap-2 rounded-xl border border-slate-200 px-3.5 transition-all duration-150 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 hover:border-slate-300">
              <CalendarDays size={16} className="shrink-0 text-primary" />
              <input
                id="departure"
                type="datetime-local"
                value={departureDate}
                onChange={(event) => setDepartureDate(event.target.value)}
                className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="passengers" className="mb-1.5 block text-xs font-medium text-slate-500">
              Passengers
            </label>
            <div className="flex h-[46px] items-center gap-2 rounded-xl border border-slate-200 px-3.5 transition-all duration-150 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 hover:border-slate-300">
              <Users size={16} className="shrink-0 text-primary" />
              <select
                id="passengers"
                value={passengers}
                onChange={(event) => setPassengers(event.target.value)}
                className="w-full min-w-0 cursor-pointer appearance-none bg-transparent text-sm text-slate-800 outline-none"
              >
                {PASSENGER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <p
              aria-hidden="true"
              className="mb-1.5 hidden select-none text-xs font-medium text-transparent lg:block"
            >
              Search
            </p>
            <button
              type="button"
              onClick={handleSearch}
              className="flex h-[46px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/30 active:translate-y-0"
            >
              Search Taxi
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 ring-1 ring-inset ring-red-100">
            ⚠ {error}
          </p>
        )}
      </div>
    </section>
  );
}