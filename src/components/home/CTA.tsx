import type { LucideIcon } from "lucide-react";
import { Phone, MapPin, Mail } from "lucide-react";

// ── Types ────────────────────────────────────────────────
interface ContactDetail {
  id: string;
  icon: LucideIcon;
  label: string;
  primary: string;
  secondary: string;
  href?: string;
}

// ── Data ─────────────────────────────────────────────────
const contactDetails: ContactDetail[] = [
  { id: "location", icon: MapPin, label: "Our Location", primary: "36-92-242-532/1, Palanati Colony", secondary: "Kancharapalem, Visakhapatnam, Andhra Pradesh - 530008" },
  { id: "phone", icon: Phone, label: "Call Us", primary: "+91 8886803322", secondary: "Mon - Sun : 24/7 Available", href: "tel:+918886803322" },
  { id: "email", icon: Mail, label: "Email Us", primary: "info.bshtaxiservices@gmail.com", secondary: "We reply within 30 minutes", href: "mailto:info.bshtaxiservices@gmail.com" },
];

const businessLocation = {
  name: "BSH Taxi Services",
  mapEmbedUrl: "https://www.google.com/maps?q=BSH+Taxi+Services+Kancharapalem+Visakhapatnam&output=embed",
  mapLinkUrl: "https://www.google.com/maps?q=BSH+Taxi+Services+Kancharapalem+Visakhapatnam",
};

// ── CTA subcomponents ────────────────────────────────────
function CTAIconBadge() {
  return (
    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-blue-600">
      <Phone size={26} />
    </span>
  );
}

// ── Contact subcomponents ────────────────────────────────
function ContactInfoCard({ detail }: { detail: ContactDetail }) {
  const { icon: Icon, label, primary, secondary, href } = detail;

  const content = (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md transition-transform duration-200 group-hover:scale-105">
        <Icon size={20} aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{label}</p>
        <p className="mt-1 text-sm font-semibold text-gray-900">{primary}</p>
        <p className="text-sm text-gray-500">{secondary}</p>
      </div>
    </>
  );

  const cardClass = "group flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500";

  if (href) {
    return (
      <button type="button" onClick={() => { window.location.href = href; }} className={`${cardClass} w-full text-left`} aria-label={`${label}: ${primary}`}>
        {content}
      </button>
    );
  }

  return <div className={cardClass}>{content}</div>;
}

function MapEmbed({ title, embedUrl, linkUrl }: { title: string; embedUrl: string; linkUrl: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-100 shadow-md">
      <iframe title={title} src={embedUrl} className="h-[320px] w-full border-0 grayscale-[15%] lg:h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <button type="button" onClick={() => { window.open(linkUrl, "_blank", "noopener,noreferrer"); }} className="absolute left-4 top-4 flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-blue-600 shadow-md transition-colors hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
        Open in Maps
      </button>
    </div>
  );
}

// ── CTA section ───────────────────────────────────────────
export function CTA() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-[90em] overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6">
      <div className="relative mx-auto flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex items-center gap-4">
          <CTAIconBadge />
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Need a Taxi?</h2>
            <p className="mt-1 max-w-md text-sm text-white/85 sm:text-base">Call us now for the best taxi services in Visakhapatnam and beyond.</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button type="button" onClick={() => { window.location.href = "tel:+918886803322"; }} className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-md transition-transform hover:-translate-y-0.5 sm:text-base">
            <Phone size={18} />
            +91 8886803322
          </button>
          <button type="button" onClick={() => { const el = document.getElementById("book"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="rounded-lg border-2 border-white px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-blue-600 sm:text-base">
            Book Now
          </button>
        </div>

        <div className="hidden shrink-0 lg:block">
          <img src="/src/assets/cars/Dzire-taxi-services-in-visakhapatnam-bshtaxiservices.jpg" alt="BSH Taxi Services car" className="h-auto w-64 object-contain" />
        </div>
      </div>
    </section>
  );
}

// ── Contact section ───────────────────────────────────────
export function ContactUs() {
  return (
    <section id="contact" className="mx-auto w-full max-w-[1240px] px-4 py-16" aria-labelledby="contact-heading">
      <header className="mb-12 text-center">
        <span className="inline-block rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-600">Get In Touch</span>
        <div className="mt-3 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-blue-600" />
          <h2 id="contact-heading" className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Contact Us</h2>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-blue-600" />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        <div className="flex flex-col gap-5">
          {contactDetails.map((detail) => (
            <ContactInfoCard key={detail.id} detail={detail} />
          ))}
        </div>

        <MapEmbed title={`${businessLocation.name} Location`} embedUrl={businessLocation.mapEmbedUrl} linkUrl={businessLocation.mapLinkUrl} />
      </div>
    </section>
  );
}

// ── Combined export ────────────────────────────────────────
export default function CTAContactSection() {
  return (
    <>
      <CTA />
      <ContactUs />
    </>
  );
}