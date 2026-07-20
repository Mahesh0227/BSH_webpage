import { useState } from "react";
import {
  Locate,
  Navigation2,
  X,
  Phone,
  Car,
  Clock,
  Plane,
  Map as MapIcon,
  CalendarDays,
  Users,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { vehicles } from "../../data/vehicles";
import LocationAutocomplete, { POPULAR_DROP_PLACES } from "../booking/LocationAutocomplete";

// Backend endpoint that sends the WhatsApp message via Twilio.
// In dev, Vite proxies "/api" to your backend server (see vite.config.ts).
const SEND_WHATSAPP_ENDPOINT = "/api/send-whatsapp";

type TabKey = "Outstation" | "Local" | "Airport" | "Tour";

const TAB_ORDER: TabKey[] = ["Outstation", "Local", "Airport", "Tour"];

type TabConfig = {
  icon: LucideIcon;
  label: string;
  subTypeOptions: string[];
  dropLabel: string;
  dropPlaceholder: string;
};

const TAB_CONFIG: Record<TabKey, TabConfig> = {
  Outstation: {
    icon: Car,
    label: "Outstation",
    subTypeOptions: ["One Way", "Round Trip"],
    dropLabel: "Drop Location",
    dropPlaceholder: "Enter drop location",
  },
  Local: {
    icon: Clock,
    label: "Local",
    subTypeOptions: ["One Way", "Round Trip"],
    dropLabel: "Drop Location",
    dropPlaceholder: "Enter drop location",
  },
  Airport: {
    icon: Plane,
    label: "Airport",
    subTypeOptions: ["One Way", "Round Trip"],
    dropLabel: "Drop Location",
    dropPlaceholder: "Visakhapatnam Airport",
  },
  Tour: {
    icon: MapIcon,
    label: "Tour",
    subTypeOptions: ["One Day", "Multi Day"],
    dropLabel: "Destination",
    dropPlaceholder: "Enter destination",
  },
};

const PASSENGER_OPTIONS = [1, 2, 3, 4, 5, 6];

export default function BookingCard() {
  const [tripType, setTripType] = useState<TabKey>("Outstation");
  const [subType, setSubType] = useState<string>(TAB_CONFIG.Outstation.subTypeOptions[0]);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const config = TAB_CONFIG[tripType];
  // Vehicle isn't picked in this bar (chosen later from the Fleet section) —
  // default to the first vehicle so the WhatsApp payload still carries a value.
  const defaultVehicleLabel = vehicles[0]?.label ?? "";

  function handleTabChange(tab: TabKey) {
    setTripType(tab);
    setSubType(TAB_CONFIG[tab].subTypeOptions[0]);
    setError("");
  }

  function handleSearch() {
    if (!pickup.trim() || !drop.trim()) {
      setError("Please enter both pickup and drop locations.");
      return;
    }
    setError("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setPhoneError("");
    setSendSuccess(false);
  }

  async function handleSendWhatsApp() {
    const digitsOnly = phone.replace(/\D/g, "");

    if (digitsOnly.length < 10) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }

    setPhoneError("");
    setIsSending(true);

    try {
      const response = await fetch(SEND_WHATSAPP_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: digitsOnly,
          pickup,
          drop,
          tripType,
          subType,
          departureDate,
          passengers,
          vehicle: defaultVehicleLabel,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message.");
      }

      // Message is sent automatically by the backend — no customer action needed.
      setSendSuccess(true);
      setPhone("");
      setTimeout(() => {
        setShowModal(false);
        setSendSuccess(false);
      }, 1500);
    } catch (err) {
      setPhoneError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_30px_rgba(16,24,40,0.08)] sm:p-6">
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
              className={`-mb-3 flex items-center gap-1.5 border-b-2 pb-3 text-sm font-semibold transition-colors ${
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

      {/* Fields row */}
      <div className="mt-5 flex flex-col divide-y divide-slate-100 lg:flex-row lg:items-end lg:divide-x lg:divide-y-0">
        <div className="min-w-0 flex-1 py-4 first:pt-0 lg:py-0 lg:pr-4 lg:first:pl-0">
          <LocationAutocomplete
            id="pickup"
            label="Pickup Location"
            value={pickup}
            onChange={setPickup}
            placeholder="Enter pickup location"
            icon={Locate}
            limitToVizag
            bare
          />
        </div>

        <div className="min-w-0 flex-1 py-4 lg:px-4 lg:py-0">
          <LocationAutocomplete
            id="drop"
            label={config.dropLabel}
            value={drop}
            onChange={setDrop}
            placeholder={config.dropPlaceholder}
            icon={Navigation2}
            limitToVizag={false}
            popularPlaces={POPULAR_DROP_PLACES}
            bare
          />
        </div>

        <div className="py-4 lg:px-4 lg:py-0">
          <p className="mb-1.5 text-xs font-medium text-slate-500">Trip Type</p>
          <div className="inline-flex rounded-xl bg-slate-100 p-1">
            {config.subTypeOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSubType(option)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  subType === option
                    ? "bg-primary text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="py-4 lg:px-4 lg:py-0">
          <label htmlFor="departure" className="mb-1.5 block text-xs font-medium text-slate-500">
            Departure Date
          </label>
          <div className="flex items-center gap-2">
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

        <div className="py-4 lg:px-4 lg:py-0">
          <label htmlFor="passengers" className="mb-1.5 block text-xs font-medium text-slate-500">
            Passengers
          </label>
          <div className="flex items-center gap-2">
            <Users size={16} className="shrink-0 text-primary" />
            <select
              id="passengers"
              value={passengers}
              onChange={(event) => setPassengers(Number(event.target.value))}
              className="w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none"
            >
              {PASSENGER_OPTIONS.map((count) => (
                <option key={count} value={count}>
                  {count} Passenger{count > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 lg:pl-4 lg:pt-0">
          <button
            type="button"
            onClick={handleSearch}
            className="flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover lg:w-auto"
          >
            Search Taxi
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">⚠ {error}</p>}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-slate-900">Enter Your Number</h4>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              We&apos;ll automatically send your trip details to this number on WhatsApp.
            </p>

            <div className="mt-4">
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 transition-colors focus-within:border-primary">
                <Phone size={18} className="shrink-0 text-primary" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your WhatsApp number"
                  autoComplete="tel"
                  disabled={isSending}
                  className="w-full text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-60"
                />
              </div>
              {phoneError && <p className="mt-2 text-sm text-red-600">⚠ {phoneError}</p>}
              {sendSuccess && (
                <p className="mt-2 text-sm text-green-600">✓ Sent! Check your WhatsApp.</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              disabled={isSending || sendSuccess}
              className="mt-5 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSending ? "Sending..." : sendSuccess ? "Sent" : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}