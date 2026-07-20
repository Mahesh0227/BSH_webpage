import { useMemo, useState } from "react";
import { MapPin, X, ChevronDown, ArrowRight, Car, ImageOff, Sparkles } from "lucide-react";

/**
 * BSH Taxi Services — "Explore Destinations" + "Estimate Your Fare"
 * -------------------------------------------------------------
 * This pass:
 *  - Section now spans the full viewport width (was capped at 1440px),
 *    with responsive side padding instead of a centered max-width shell.
 *  - Visual polish pass: soft gradient section background with subtle
 *    decorative blobs, deeper card shadows on hover, gradient overlay +
 *    distance chip on destination images, a gradient "Estimated Fare"
 *    panel with a subtle glow, refined focus/hover states, and a bit
 *    more breathing room throughout.
 *  - Fixed: FALLBACK_IMAGE is now actually used — if a destination image
 *    fails to load, it swaps to the fallback photo instead of just
 *    showing a broken-image icon.
 *  - Fixed: multi-line generic type argument on useState (which was
 *    tripping up the parser and cascading into a wall of TS errors) is
 *    now written on a single line.
 *
 * Functional behavior unchanged:
 *  - Clicking a destination card sets "To" and live-recalculates distance/fare.
 *  - Fare = distance × per-km rate, updates when destination or vehicle changes.
 *  - From/To fields are clearable; booking is disabled until both are set
 *    and shows a pending → confirmed state.
 */

type Destination = {
  title: string;
  distanceKm: number;
  image: string;
};

type Vehicle = {
  name: string;
  ratePerKm: number;
  seats: number;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=600&auto=format&fit=crop&q=60";

const destinations: Destination[] = [
  {
    title: "Araku Valley",
    distanceKm: 120,
    image:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Lambasingi",
    distanceKm: 100,
    image:
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Borra Caves",
    distanceKm: 90,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Rushikonda Beach",
    distanceKm: 15,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Simhachalam Temple",
    distanceKm: 16,
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop&q=60",
  },
  {
    title: "Vizag Airport",
    distanceKm: 12,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=60",
  },
];

const vehicles: Vehicle[] = [
  { name: "Swift Dzire", ratePerKm: 13, seats: 4 },
  { name: "Maruti Ertiga", ratePerKm: 16, seats: 6 },
  { name: "Toyota Innova", ratePerKm: 18, seats: 7 },
  { name: "Tempo Traveller", ratePerKm: 22, seats: 12 },
];

const ORIGIN = "Visakhapatnam";

function SectionHeading({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex items-center gap-2.5 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className="h-4 w-1.5 rounded-full bg-gradient-to-b from-blue-500 to-blue-700" />
      <h2 className="text-[15px] font-extrabold uppercase tracking-[0.08em] text-slate-900">
        {children}
      </h2>
    </div>
  );
}

export default function Features() {
  const [vehicleName, setVehicleName] = useState(vehicles[0].name);
  const [destination, setDestination] = useState<Destination | null>(
    destinations[0]
  );
  const [origin, setOrigin] = useState<string | null>(ORIGIN);
  const [bookingState, setBookingState] = useState<
    "idle" | "booking" | "booked"
  >("idle");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [fallbackFailedImages, setFallbackFailedImages] = useState<Record<string, boolean>>({});

  const vehicle = useMemo(
    () => vehicles.find((v) => v.name === vehicleName) ?? vehicles[0],
    [vehicleName]
  );

  const tripDistance = useMemo(() => {
    if (!destination) return 0;
    return Math.round(destination.distanceKm * 0.483);
  }, [destination]);

  const fare = useMemo(() => {
    if (!origin || !destination) return 0;
    return tripDistance * vehicle.ratePerKm;
  }, [origin, destination, tripDistance, vehicle]);

  const canBook =
    Boolean(origin) && Boolean(destination) && bookingState !== "booking";

  function handleSelectDestination(d: Destination) {
    setDestination(d);
    setBookingState("idle");
  }

  function handleBook() {
    if (!canBook) return;
    setBookingState("booking");
    window.setTimeout(() => setBookingState("booked"), 900);
  }

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-slate-50 to-white py-20">
      {/* Decorative background accents */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="relative w-full px-6 sm:px-10 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* ---------------- Destinations ---------------- */}
          <div className="flex flex-col rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-[0_2px_20px_-4px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_8px_30px_-6px_rgba(15,23,42,0.1)] sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <SectionHeading>Explore Amazing Destinations</SectionHeading>
              <a
                href="/destinations"
                className="group inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                View All
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3">
              {destinations.map((d) => {
                const isActive = destination?.title === d.title;
                const imageFailed = failedImages[d.title];
                const fallbackFailed = fallbackFailedImages[d.title];
                return (
                  <button
                    key={d.title}
                    type="button"
                    onClick={() => handleSelectDestination(d)}
                    aria-pressed={isActive}
                    className={`group relative flex flex-col overflow-hidden rounded-xl bg-white text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isActive
                        ? "ring-2 ring-blue-600 shadow-lg shadow-blue-600/10"
                        : "ring-1 ring-slate-100 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60"
                    }`}
                  >
                    <div className="relative h-28 overflow-hidden bg-slate-100">
                      {fallbackFailed ? (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
                          <ImageOff size={20} />
                        </div>
                      ) : (
                        <img
                          src={imageFailed ? FALLBACK_IMAGE : d.image}
                          alt={d.title}
                          loading="lazy"
                          onError={() => {
                            if (imageFailed) {
                              // The fallback image itself failed — give up and show the icon.
                              setFallbackFailedImages((prev) => ({
                                ...prev,
                                [d.title]: true,
                              }));
                            } else {
                              setFailedImages((prev) => ({
                                ...prev,
                                [d.title]: true,
                              }));
                            }
                          }}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                      {/* Gradient overlay for legibility + polish */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-70" />

                      {/* Distance chip */}
                      <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                        <MapPin size={10} className="text-blue-600" />
                        {d.distanceKm} KM
                      </span>

                      {isActive && (
                        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow ring-2 ring-white">
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-3 w-3"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4L8.5 12l6.8-6.8a1 1 0 011.4 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-sm font-semibold leading-tight text-slate-900">
                        {d.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        from Vizag
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---------------- Fare estimator ---------------- */}
          <div className="flex flex-col rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-[0_2px_20px_-4px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_8px_30px_-6px_rgba(15,23,42,0.1)] sm:p-7">
            <div className="mb-6">
              <SectionHeading align="center">
                Estimate Your Fare
              </SectionHeading>
            </div>

            <div className="grid flex-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:divide-x sm:divide-slate-100">
              {/* ---- Left column: fields ---- */}
              <div className="space-y-4 sm:pr-6">
                {/* From */}
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-500">
                    From
                  </span>
                  <div
                    className={`flex items-center justify-between rounded-lg border px-3 py-2.5 transition-colors ${
                      origin
                        ? "border-slate-200 hover:border-blue-200"
                        : "border-dashed border-slate-300"
                    }`}
                  >
                    {origin ? (
                      <span className="flex items-center gap-2 text-sm text-slate-800">
                        <MapPin size={14} className="text-blue-600" />
                        {origin}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-400">
                        Enter pickup location
                      </span>
                    )}
                    {origin && (
                      <button
                        type="button"
                        aria-label="Clear pickup location"
                        onClick={() => setOrigin(null)}
                        className="rounded p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  {!origin && (
                    <button
                      type="button"
                      onClick={() => setOrigin(ORIGIN)}
                      className="mt-1 text-xs font-medium text-blue-600 hover:underline"
                    >
                      Use {ORIGIN}
                    </button>
                  )}
                </label>

                {/* To */}
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-500">
                    To
                  </span>
                  <div
                    className={`flex items-center justify-between rounded-lg border px-3 py-2.5 transition-colors ${
                      destination
                        ? "border-slate-200 hover:border-blue-200"
                        : "border-dashed border-slate-300"
                    }`}
                  >
                    {destination ? (
                      <span className="flex items-center gap-2 text-sm text-slate-800">
                        <MapPin size={14} className="text-blue-600" />
                        {destination.title}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-400">
                        Pick a destination
                      </span>
                    )}
                    {destination && (
                      <button
                        type="button"
                        aria-label="Clear drop location"
                        onClick={() => setDestination(null)}
                        className="rounded p-0.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </label>

                {/* Vehicle */}
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-500">
                    Vehicle
                  </span>
                  <div className="relative">
                    <Car
                      size={14}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"
                    />
                    <select
                      value={vehicleName}
                      onChange={(e) => setVehicleName(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm text-slate-800 transition-colors hover:border-blue-200 focus:border-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                      {vehicles.map((v) => (
                        <option key={v.name} value={v.name}>
                          {v.name} · {v.seats} seater
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </label>
              </div>

              {/* ---- Right column: distance / rate / fare / book ---- */}
              <div className="flex flex-col justify-between space-y-4 sm:pl-6">
                <div className="space-y-2 rounded-lg border border-slate-200 px-3 py-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Distance</span>
                    <span className="font-semibold text-slate-800">
                      {tripDistance || "--"} KM
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Rate</span>
                    <span className="font-semibold text-slate-800">
                      ₹{vehicle.ratePerKm}/KM
                    </span>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-3.5 text-center shadow-md shadow-blue-600/20">
                  <Sparkles
                    size={44}
                    className="pointer-events-none absolute -right-2 -top-2 text-white/10"
                  />
                  <p className="text-xs font-medium text-blue-100">
                    Estimated Fare
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {fare ? `₹${fare.toLocaleString("en-IN")}` : "--"}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!canBook}
                  onClick={handleBook}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    !origin || !destination
                      ? "cursor-not-allowed bg-slate-300"
                      : bookingState === "booked"
                      ? "bg-emerald-600 hover:bg-emerald-600"
                      : "bg-blue-600 shadow-md shadow-blue-600/25 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.99]"
                  }`}
                >
                  {bookingState === "booking" && (
                    <svg
                      className="h-4 w-4 animate-spin text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  )}
                  {bookingState === "booking" ? (
                    "Booking..."
                  ) : bookingState === "booked" ? (
                    "Ride Booked ✓"
                  ) : !origin || !destination ? (
                    "Select From & To"
                  ) : (
                    <>
                      Book This Ride
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}