import { useParams, Link, Navigate } from "react-router-dom";
import {
  MapPin,
  IndianRupee,
  ClipboardList,
  Sparkle,
  ArrowLeft,
  Clock,
  Navigation,
  Quote,
  Mountain,
  Gem,
  Waves,
  Landmark,
  Plane,
  CalendarCheck,
} from "lucide-react";
import { destinations, type Destination } from "../data/destinationsData";

// Every category gets its own accent, drawn from the thing it's actually
// known for — moss for the hills, wet stone for the caves, sea-teal for the
// coast, sandalwood-rust for the temple, and instrument-panel blue for transit.

const CATEGORY_THEME: Record<
  Destination["category"],
  {
    accent: string;
    accentSoft: string;
    accentText: string;
    ring: string;
    Icon: typeof Mountain;
    label: string;
  }
> = {
  "Hill Station": {
    accent: "bg-[#3D6B3F]",
    accentSoft: "bg-[#3D6B3F]/10",
    accentText: "text-[#3D6B3F]",
    ring: "ring-[#3D6B3F]/25",
    Icon: Mountain,
    label: "Hill Station",
  },
  "Nature & Caves": {
    accent: "bg-[#7A6A4F]",
    accentSoft: "bg-[#7A6A4F]/10",
    accentText: "text-[#7A6A4F]",
    ring: "ring-[#7A6A4F]/25",
    Icon: Gem,
    label: "Nature & Caves",
  },
  Beach: {
    accent: "bg-[#146B72]",
    accentSoft: "bg-[#146B72]/10",
    accentText: "text-[#146B72]",
    ring: "ring-[#146B72]/25",
    Icon: Waves,
    label: "Beach",
  },
  Temple: {
    accent: "bg-[#A8472B]",
    accentSoft: "bg-[#A8472B]/10",
    accentText: "text-[#A8472B]",
    ring: "ring-[#A8472B]/25",
    Icon: Landmark,
    label: "Temple",
  },
  Transit: {
    accent: "bg-[#2F5C82]",
    accentSoft: "bg-[#2F5C82]/10",
    accentText: "text-[#2F5C82]",
    ring: "ring-[#2F5C82]/25",
    Icon: Plane,
    label: "Transit",
  },
   "Heritage & Buddhist Site": {
    accent: "bg-[#8B5E3C]",
    accentSoft: "bg-[#8B5E3C]/10",
    accentText: "text-[#8B5E3C]",
    ring: "ring-[#8B5E3C]/25",
    Icon: Landmark,
    label: "Heritage & Buddhist Site",
  },
};
export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) return <Navigate to="/destinations" replace />;

  const {
    name,
    image,
    distanceFromVizag,
    distanceKm,
    driveTime,
    description,
    tagline,
    costPerDay,
    importantNotes,
    places,
    category,
    history,
    highlights,
    quickFacts,
    bestTimeToVisit,
    howToReach,
    funFact,
    sources,
  } = destination;

const theme = CATEGORY_THEME[category ?? "Hill Station"];
  const CategoryIcon = theme.Icon;
  // Fill level of the route marker's odometer bar: closer destinations read
  // "fuller" on a 0–130km scale, since nothing we serve sits further than that.

  const routeFill = Math.min(100, Math.round((distanceKm / 130) * 100));

  return (
    <>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-feature-settings: 'liga' 1; }
        .font-body { font-family: 'Public Sans', sans-serif; }
        .font-mono-route { font-family: 'IBM Plex Mono', monospace; }
        .route-dash {
          background-image: repeating-linear-gradient(to right, currentColor 0 10px, transparent 10px 18px);
        }
        .drop-cap::first-letter {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 3.5rem;
          line-height: 0.85;
          float: left;
          padding-right: 0.35rem;
          padding-top: 0.2rem;
        }
        .lift-on-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .lift-on-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px -12px rgba(0,0,0,0.18);
        }
        .book-btn {
          transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
        }
        .book-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.08);
          box-shadow: 0 10px 20px -8px rgba(0,0,0,0.35);
        }
        .book-btn:active { transform: translateY(0); }
        @media (prefers-reduced-motion: no-preference) {
          .hero-zoom { animation: heroZoom 12s ease-out forwards; }
          @keyframes heroZoom { from { transform: scale(1.08); } to { transform: scale(1); } }
        }
      `}</style>

      <div className="font-body bg-[#F6F1E4] text-[#1B1B16]">
       {/* Hero */}
{/* Hero */}
<section className="relative h-150 w-full sm:h-135">
  {/* Background image */}
  <div className="absolute inset-0 overflow-hidden">
    <img
      src={image}
      alt={name}
      className="hero-zoom h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-black/10" />
  </div>

  {/* Top Bar */}
  <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8 lg:px-16">
    <div
      className={`inline-flex items-center gap-2 rounded-full ${theme.accent} px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white shadow-sm`}
    >
      <CategoryIcon size={14} />
      {theme.label}
    </div>

    <Link
      to={`/book/${slug}`}
      className={`book-btn hidden items-center gap-2 rounded-full ${theme.accent} px-5 py-2.5 text-sm font-bold text-white shadow-lg sm:inline-flex`}
    >
      <CalendarCheck size={16} />
      Book Now
    </Link>
  </div>

  {/* Hero Title */}
  <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-16 sm:px-10 lg:px-16">
    {tagline && (
      <p className="font-display mb-2 text-lg italic text-yellow-300 sm:text-xl">
        {tagline}
      </p>
    )}

    <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
      {name}
    </h1>
  </div>

  {/* Route Marker */}
  <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2 px-6 sm:px-10 lg:px-16">
    <div className="mx-auto flex max-w-3xl items-center gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-2xl ring-1 ring-black/3 sm:gap-6 sm:px-7">

      {/* Distance */}
      <div className="flex shrink-0 items-center gap-2">
        <MapPin  size={18} className={theme.accentText} />
        <span className="font-mono-route text-sm font-semibold text-slate-900 sm:text-base">
          {distanceFromVizag}
        </span>
      </div>

      {/* Dashed Line */}
      <div className="route-dash hidden h-px flex-1 text-slate-300 sm:block" />

      {/* Progress Bar */}
      <div
        className="relative hidden h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-slate-100 sm:block"
        aria-label={`${distanceKm} kilometers from Visakhapatnam`}
      >
        <div
          className={`h-full rounded-full ${theme.accent}`}
          style={{ width: `${routeFill}%` }}
        />
      </div>

      {/* Drive Time */}
      <div className="flex shrink-0 items-center gap-1.5 border-l border-slate-200 pl-4 text-slate-600">
        <Clock size={16} />
        <span className="font-mono-route text-xs font-medium sm:text-sm">
          {driveTime}
        </span>
      </div>
    </div>
  </div>
</section>

        <section className="w-full px-6 pb-28 pt-16 sm:px-10 sm:pb-16 sm:pt-20 lg:px-16">
          {/* Intro */}
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-slate-700">
            {description}
          </p>

          {/* Quick facts readout */}
          {quickFacts && quickFacts.length > 0 && (
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className={`lift-on-hover rounded-2xl border border-black/5 bg-white px-4 py-4 text-center ring-1 ${theme.ring}`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    {fact.label}
                  </p>
                  <p className="font-mono-route mt-1.5 text-sm font-semibold text-slate-900 sm:text-base">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Highlights chips */}
          {highlights && highlights.length > 0 && (
            <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
              {highlights.map((h) => (
                <span
                  key={h}
                  className={`inline-flex items-center gap-1.5 rounded-full ${theme.accentSoft} ${theme.accentText} px-3.5 py-1.5 text-xs font-semibold sm:text-sm`}
                >
                  <Sparkle size={13} />
                  {h}
                </span>
              ))}
            </div>
          )}

          {/* History — editorial column */}
          {history && (
            <div className="mx-auto mt-16 max-w-3xl">
              <h2 className="font-display text-center text-3xl font-semibold tracking-tight text-slate-900">
                The Story of {name}
              </h2>
              <div className={`mx-auto mt-3 mb-8 h-1 w-14 rounded-full ${theme.accent}`} />
              {history.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className={`mb-5 text-[15.5px] leading-[1.85] text-slate-700 sm:text-base ${
                    i === 0 ? "drop-cap" : ""
                  }`}
                >
                  {para}
                </p>
              ))}
              {sources && sources.length > 0 && (
                <p className="mt-2 text-xs italic text-slate-400">
                  Sourced from {sources.join(", ")}.
                </p>
              )}
            </div>
          )}

          {/* Best time / How to reach */}
          {(bestTimeToVisit || howToReach) && (
            <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
              {bestTimeToVisit && (
                <div className="lift-on-hover rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
                  <p className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${theme.accentText}`}>
                    <Clock size={16} /> Best Time to Visit
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{bestTimeToVisit}</p>
                </div>
              )}
              {howToReach && (
                <div className="lift-on-hover rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">
                  <p className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${theme.accentText}`}>
                    <Navigation size={16} /> How to Reach
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{howToReach}</p>
                </div>
              )}
            </div>
          )}

          {/* Fun fact pull-quote */}
          {funFact && (
            <div className="mx-auto mt-14 max-w-3xl">
              <div className={`relative rounded-3xl ${theme.accent} px-8 py-9 text-white shadow-lg sm:px-12 sm:py-11`}>
                <Quote size={28} className="mb-3 text-white/50" />
                <p className="font-display text-xl leading-snug sm:text-2xl">{funFact}</p>
              </div>
            </div>
          )}

          {/* Cost + Important notes — only render if this destination has them */}
          {(costPerDay || (importantNotes && importantNotes.length > 0)) && (
            <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2">
              {costPerDay && (
                <div className="flex flex-col items-center justify-center rounded-3xl bg-emerald-900 px-8 py-10 text-center text-white shadow-lg ring-1 ring-black/10">
                  <p className="flex items-center gap-1 text-sm font-semibold uppercase tracking-widest text-emerald-200">
                    <IndianRupee size={16} /> Cost
                  </p>
                  <p className="mt-3 text-5xl font-black text-yellow-400">
                    ₹{costPerDay.toLocaleString("en-IN")}/-
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-emerald-200">
                    Per Day
                  </p>
                </div>
              )}

              {importantNotes && importantNotes.length > 0 && (
                <div className="rounded-3xl border border-slate-100 bg-white px-8 py-8 shadow-sm">
                  <p className="flex items-center gap-2 text-base font-bold text-slate-900">
                    <ClipboardList size={20} className="text-emerald-700" />
                    Important Notes
                  </p>
                  <ul className="mt-4 space-y-4">
                    {importantNotes.map((note, i) => (
                      <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                        <Sparkle size={16} className="mt-0.5 shrink-0 text-yellow-500" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Places — a route itinerary rather than a plain grid, since these
              are genuinely stops along one trip, in a sensible visiting order. */}
          {places && places.length > 0 && (
            <div className="mx-auto mt-16 max-w-3xl">
              <h2 className="font-display text-center text-3xl font-semibold tracking-tight text-slate-900">
                Places You'll Visit
              </h2>
              <div className={`mx-auto mt-3 mb-10 h-1 w-14 rounded-full ${theme.accent}`} />

              <ol className="relative">
                <div
                  className={`absolute left-6.75 top-2 bottom-2 hidden w-px sm:block ${theme.accentSoft}`}
                  style={{ borderLeft: "2px dashed currentColor" }}
                  aria-hidden="true"
                />
                {places.map((place, i) => (
                  <li key={place.name} className="relative mb-6 flex gap-5 last:mb-0 sm:gap-6">
                    <div
                      className={`z-10 hidden h-14 w-14 shrink-0 items-center justify-center rounded-full ${theme.accent} font-mono-route text-base font-bold text-white shadow-md sm:flex`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="lift-on-hover flex flex-1 gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="h-28 w-28 shrink-0 object-cover sm:h-32 sm:w-32"
                      />
                      <div className="flex flex-col justify-center py-3 pr-4">
                        <span
                          className={`mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${theme.accentText} sm:hidden`}
                        >
                          Stop {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm font-bold uppercase tracking-wide text-slate-900 sm:text-base">
                          {place.name}
                          {place.tag && (
                            <span className="ml-1.5 text-[11px] font-medium normal-case text-slate-400">
                              ({place.tag})
                            </span>
                          )}
                        </p>
                        {place.description && (
                          <p className="mt-1 text-[13px] leading-snug text-slate-500 sm:text-sm">
                            {place.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Book Now CTA banner */}
          <div className="mx-auto mt-16 max-w-3xl">
            <div
              className={`flex flex-col items-center justify-between gap-5 rounded-3xl ${theme.accent} px-8 py-9 text-center text-white shadow-lg sm:flex-row sm:text-left`}
            >
              <div>
                <p className="font-display text-2xl font-semibold">Ready to visit {name}?</p>
                <p className="mt-1 text-sm text-white/80">
                  Lock in your trip and we'll handle the rest.
                </p>
              </div>
              <Link
                to={`/book/${slug}`}
                className="book-btn inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-md"
              >
                <CalendarCheck size={18} />
                Book Now
              </Link>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5"
            >
              <ArrowLeft size={16} />
              Back to all destinations
            </Link>
          </div>
        </section>

        {/* Mobile sticky booking bar */}
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-black/5 bg-white/95 px-5 py-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur sm:hidden">
          <div className="flex items-center justify-between gap-4">
            <div>
              {costPerDay ? (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    From
                  </p>
                  <p className="font-mono-route text-base font-bold text-slate-900">
                    ₹{costPerDay.toLocaleString("en-IN")}/day
                  </p>
                </>
              ) : (
                <p className="font-display text-sm font-semibold text-slate-900">{name}</p>
              )}
            </div>
            <Link
              to={`/book/${slug}`}
              className={`book-btn inline-flex items-center gap-2 rounded-full ${theme.accent} px-5 py-2.5 text-sm font-bold text-white shadow-md`}
            >
              <CalendarCheck size={16} />
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}