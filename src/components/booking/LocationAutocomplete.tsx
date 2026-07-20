import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Loader2, MapPin, Star } from "lucide-react";

export type PlaceSuggestion = {
  primary: string;
  secondary: string;
  fullLabel: string;
  lat: string;
  lon: string;
};

type LocationAutocompleteProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: LucideIcon;
  /** Restrict results to ~35km around Vizag (pickup). Set false for drop (anywhere in India). */
  limitToVizag?: boolean;
  /** Shown as quick picks before the user types anything, and filtered as they type. */
  popularPlaces?: PlaceSuggestion[];
};

// Photon (by Komoot) — free, keyless geocoder purpose-built for autocomplete/
// typeahead. Unlike Nominatim (a search engine with a strict 1 req/sec policy
// and weak partial-word matching), Photon does fuzzy, prefix-aware matching
// designed for exactly this "search as you type" use case.
const PHOTON_ENDPOINT = "https://photon.komoot.io/api/";

// Visakhapatnam city center — used to bias/restrict pickup results to a local radius.
const VIZAG_CENTER = { lat: 17.6868, lon: 83.2185 };
const RADIUS_KM = 35;

// Rough bounding box in degrees for a ~35km radius around Vizag.
// Photon's bbox param is minLon,minLat,maxLon,maxLat.
const DEG_LAT = RADIUS_KM / 111;
const DEG_LON = RADIUS_KM / 106;
const VIZAG_BBOX = [
  VIZAG_CENTER.lon - DEG_LON,
  VIZAG_CENTER.lat - DEG_LAT,
  VIZAG_CENTER.lon + DEG_LON,
  VIZAG_CENTER.lat + DEG_LAT,
].join(",");

// Minimum characters before we hit the live API. 1 = search starts on the
// very first keystroke (backed by the local popular-places list below so it
// still feels instant, since the API itself has a short debounce).
const MIN_CHARS_FOR_SEARCH = 1;

// Common Vizag pickup localities — since most pickups happen inside the
// city, this gives instant, zero-latency matches while the user is still
// typing their first letter or two, before/alongside the live API call.
export const POPULAR_PICKUP_PLACES: PlaceSuggestion[] = [
  { primary: "RTC Complex", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "RTC Complex, Visakhapatnam, Andhra Pradesh, India", lat: "17.7274", lon: "83.3061" },
  { primary: "Vizag Railway Station", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Visakhapatnam Railway Station, Visakhapatnam, Andhra Pradesh, India", lat: "17.7128", lon: "83.2971" },
  { primary: "Visakhapatnam Airport", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Visakhapatnam Airport, Visakhapatnam, Andhra Pradesh, India", lat: "17.7212", lon: "83.2245" },
  { primary: "MVP Colony", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "MVP Colony, Visakhapatnam, Andhra Pradesh, India", lat: "17.7326", lon: "83.3255" },
  { primary: "Madhurawada", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Madhurawada, Visakhapatnam, Andhra Pradesh, India", lat: "17.8065", lon: "83.3789" },
  { primary: "Gajuwaka", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Gajuwaka, Visakhapatnam, Andhra Pradesh, India", lat: "17.6868", lon: "83.2065" },
  { primary: "Dwaraka Nagar", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Dwaraka Nagar, Visakhapatnam, Andhra Pradesh, India", lat: "17.7266", lon: "83.3038" },
  { primary: "Rushikonda", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Rushikonda, Visakhapatnam, Andhra Pradesh, India", lat: "17.7810", lon: "83.3811" },
  { primary: "Pendurthi", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Pendurthi, Visakhapatnam, Andhra Pradesh, India", lat: "17.8228", lon: "83.2415" },
  { primary: "Simhachalam", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Simhachalam, Visakhapatnam, Andhra Pradesh, India", lat: "17.7642", lon: "83.2569" },
  { primary: "Beach Road", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Beach Road, Visakhapatnam, Andhra Pradesh, India", lat: "17.7112", lon: "83.3247" },
  { primary: "Steel Plant", secondary: "Visakhapatnam, Andhra Pradesh, India", fullLabel: "Visakhapatnam Steel Plant, Visakhapatnam, Andhra Pradesh, India", lat: "17.6300", lon: "83.1930" },
];

// A handful of common long-distance drop destinations from Vizag.
// Coordinates are city-center approximations; fine for a quick-pick list.
export const POPULAR_DROP_PLACES: PlaceSuggestion[] = [
  { primary: "Hyderabad", secondary: "Telangana, India", fullLabel: "Hyderabad, Telangana, India", lat: "17.3850", lon: "78.4867" },
  { primary: "Vijayawada", secondary: "Andhra Pradesh, India", fullLabel: "Vijayawada, Andhra Pradesh, India", lat: "16.5062", lon: "80.6480" },
  { primary: "Bengaluru", secondary: "Karnataka, India", fullLabel: "Bengaluru, Karnataka, India", lat: "12.9716", lon: "77.5946" },
  { primary: "Chennai", secondary: "Tamil Nadu, India", fullLabel: "Chennai, Tamil Nadu, India", lat: "13.0827", lon: "80.2707" },
  { primary: "Araku Valley", secondary: "Andhra Pradesh, India", fullLabel: "Araku Valley, Andhra Pradesh, India", lat: "18.3273", lon: "82.8770" },
  { primary: "Srikakulam", secondary: "Andhra Pradesh, India", fullLabel: "Srikakulam, Andhra Pradesh, India", lat: "18.2949", lon: "83.8938" },
  { primary: "Rajahmundry", secondary: "Andhra Pradesh, India", fullLabel: "Rajahmundry, Andhra Pradesh, India", lat: "17.0005", lon: "81.8040" },
  { primary: "Bhubaneswar", secondary: "Odisha, India", fullLabel: "Bhubaneswar, Odisha, India", lat: "20.2961", lon: "85.8245" },
];

// Photon returns GeoJSON-style features. Build display strings from
// whatever address parts are present (name/street/city/state/country),
// since not every result has every field.
type PhotonFeature = {
  geometry: { coordinates: [number, number] }; // [lon, lat]
  properties: {
    name?: string;
    street?: string;
    housenumber?: string;
    district?: string;
    city?: string;
    county?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
};

function photonFeatureToSuggestion(feature: PhotonFeature): PlaceSuggestion {
  const p = feature.properties;
  const [lon, lat] = feature.geometry.coordinates;

  const primary =
    p.name ||
    [p.housenumber, p.street].filter(Boolean).join(" ") ||
    p.street ||
    p.city ||
    "Unnamed location";

  const secondaryParts = [
    // Avoid repeating the primary value in the secondary line.
    p.street && p.name && p.street !== primary ? p.street : null,
    p.district,
    p.city,
    p.state,
    p.country,
  ].filter(Boolean);

  // De-dupe consecutive identical parts (e.g. district === city).
  const secondary = Array.from(new Set(secondaryParts)).join(", ");

  const fullLabel = [primary, secondary].filter(Boolean).join(", ");

  return { primary, secondary, fullLabel, lat: String(lat), lon: String(lon) };
}

// Case-insensitive "starts with" or "word starts with" match, so typing "m"
// matches both "MVP Colony" and "Madhurawada".
function matchesQuery(place: PlaceSuggestion, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = `${place.primary} ${place.secondary}`.toLowerCase();
  return haystack.split(/[\s,]+/).some((word) => word.startsWith(q)) || haystack.startsWith(q);
}

export default function LocationAutocomplete({
  id,
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  limitToVizag = false,
  popularPlaces,
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const skipNextFetchRef = useRef(false);
  const requestIdRef = useRef(0); // guards against out-of-order responses

  const trimmedValue = value.trim();

  // Local, zero-latency matches from the popular-places list — shown
  // instantly on every keystroke (including the very first letter) while
  // the debounced API call is still in flight.
  const localMatches = popularPlaces?.length
    ? popularPlaces.filter((place) => matchesQuery(place, trimmedValue)).slice(0, 6)
    : [];

  const showingLocalOnly = trimmedValue.length < MIN_CHARS_FOR_SEARCH && localMatches.length > 0;

  // Merge local matches with live API results once both are available,
  // de-duping by fullLabel so a place doesn't show up twice.
  const mergedSuggestions = (() => {
    if (showingLocalOnly) return localMatches;
    const seen = new Set(localMatches.map((p) => p.fullLabel));
    const apiOnly = suggestions.filter((p) => !seen.has(p.fullLabel));
    return [...localMatches, ...apiOnly];
  })();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Skip the fetch that would otherwise fire right after the user picks a
    // suggestion (since selecting one also updates `value`).
    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false;
      return;
    }

    if (trimmedValue.length < MIN_CHARS_FOR_SEARCH) {
      setSuggestions([]);
      setHasSearched(false);
      setIsOpen(!!popularPlaces?.length);
      return;
    }

    setIsOpen(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const thisRequestId = ++requestIdRef.current;
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          q: value,
          lang: "en", // English-only labels, no Telugu/regional script
          limit: "8",
          // Bias results toward Vizag for both pickup and drop — pickup gets
          // a hard bbox restriction below, drop just gets a gentle nudge so
          // "M" still surfaces Mumbai/Manali etc. alongside local matches.
          lat: String(VIZAG_CENTER.lat),
          lon: String(VIZAG_CENTER.lon),
        });

        // Hard-restrict pickup to the ~35km Vizag box; drop searches all of India.
        if (limitToVizag) {
          params.set("bbox", VIZAG_BBOX);
        }

        const response = await fetch(`${PHOTON_ENDPOINT}?${params.toString()}`);
        if (!response.ok) throw new Error("Search failed");
        const data: { features: PhotonFeature[] } = await response.json();

        // Ignore stale responses if a newer keystroke has already fired a request.
        if (thisRequestId !== requestIdRef.current) return;

        const results = data.features
          .map(photonFeatureToSuggestion)
          // Photon's bbox is a soft filter for some queries; belt-and-braces
          // re-check for pickup so results genuinely stay within India/Vizag.
          .filter((s) => {
            if (!limitToVizag) return true;
            const lat = parseFloat(s.lat);
            const lon = parseFloat(s.lon);
            return (
              lat >= VIZAG_CENTER.lat - DEG_LAT &&
              lat <= VIZAG_CENTER.lat + DEG_LAT &&
              lon >= VIZAG_CENTER.lon - DEG_LON &&
              lon <= VIZAG_CENTER.lon + DEG_LON
            );
          });

        setSuggestions(results);
        setIsOpen(true);
        setHasSearched(true);
        setHighlightIndex(-1);
      } catch {
        if (thisRequestId === requestIdRef.current) {
          setSuggestions([]);
          setHasSearched(true);
        }
      } finally {
        if (thisRequestId === requestIdRef.current) setIsLoading(false);
      }
    }, 200); // Photon is fast enough for a shorter debounce than Nominatim

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, trimmedValue, limitToVizag, popularPlaces]);

  function selectSuggestion(suggestion: PlaceSuggestion) {
    skipNextFetchRef.current = true;
    onChange(suggestion.fullLabel);
    setSuggestions([]);
    setIsOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || mergedSuggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % mergedSuggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + mergedSuggestions.length) % mergedSuggestions.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (highlightIndex >= 0) selectSuggestion(mergedSuggestions[highlightIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  const showEmptyState =
    isOpen &&
    !isLoading &&
    hasSearched &&
    !showingLocalOnly &&
    mergedSuggestions.length === 0;

  return (
    <div className="relative" ref={wrapperRef}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 transition-colors focus-within:border-primary">
        <Icon size={18} className="shrink-0 text-primary" />
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => (mergedSuggestions.length > 0 || popularPlaces?.length) && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
        {isLoading && <Loader2 size={16} className="shrink-0 animate-spin text-slate-400" />}
      </div>

      {isOpen && (mergedSuggestions.length > 0 || showEmptyState) && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg">
          {(showingLocalOnly || (localMatches.length > 0 && trimmedValue.length >= MIN_CHARS_FOR_SEARCH)) && (
            <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3.5 py-1.5 text-[11px] font-medium text-slate-500">
              <Star size={12} className="text-primary" />
              {limitToVizag ? "Popular Vizag pickup points" : "Popular destinations"}
            </div>
          )}

          {mergedSuggestions.length > 0 ? (
            <ul className="max-h-72 overflow-y-auto py-1">
              {mergedSuggestions.map((suggestion, index) => (
                <li key={`${suggestion.lat}-${suggestion.lon}-${suggestion.primary}`}>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()} // keep input focus
                    onClick={() => selectSuggestion(suggestion)}
                    onMouseEnter={() => setHighlightIndex(index)}
                    className={`flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left transition-colors ${
                      index === highlightIndex ? "bg-primary/5" : "hover:bg-slate-50"
                    }`}
                  >
                    <MapPin
                      size={16}
                      className={`mt-0.5 shrink-0 ${
                        index === highlightIndex ? "text-primary" : "text-slate-400"
                      }`}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-800">
                        {suggestion.primary}
                      </span>
                      {suggestion.secondary && (
                        <span className="block truncate text-xs text-slate-500">
                          {suggestion.secondary}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3.5 py-3 text-sm text-slate-500">
              {limitToVizag
                ? `No locations found within ${RADIUS_KM} km. Try a nearby landmark or area name.`
                : "No locations found. Try a different city or landmark name."}
            </p>
          )}

          <div className="border-t border-slate-100 bg-slate-50 px-3.5 py-1.5 text-right text-[11px] text-slate-400">
            Powered by Photon (OpenStreetMap)
          </div>
        </div>
      )}
    </div>
  );
}