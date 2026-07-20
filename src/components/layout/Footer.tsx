import { useState, type FormEvent } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { MessageCircle } from "lucide-react";
import { navLinks } from "../../data/nav";

const quickLinks = navLinks.filter((link) =>
  ["Home", "Services", "Our Fleet", "Destinations", "About Us", "Contact Us"].includes(
    link.label,
  ),
);

const serviceLinks = [
  "Outstation Taxi",
  "Local Taxi",
  "Airport Transfer",
  "Corporate Travel",
  "Tour Packages",
  "Wedding Cars",
];

const destinationLinks = [
  "Araku Valley",
  "Lambasingi",
  "Tirupati",
  "Puri",
  "Hyderabad",
  "And More",
];

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/918886803322" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    // Hook this up to your newsletter provider of choice.
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 2500);
  }

  return (
    <footer id="contact" className="bg-[#0B1220] text-slate-300">
      <div className="w-full px-6 py-14 sm:px-10 lg:px-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 text-lg font-bold leading-tight">
              <span className="text-white">BSH </span>
              <span className="text-primary">TAXI SERVICES</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              Safe, reliable and affordable taxi services across Visakhapatnam
              and Andhra Pradesh.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-primary hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-400 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Our Services</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {serviceLinks.map((label) => (
                <a
                  key={label}
                  href="#services"
                  className="text-slate-400 transition-colors hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Destinations</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {destinationLinks.map((label) => (
                <a
                  key={label}
                  href="#destinations"
                  className="text-slate-400 transition-colors hover:text-primary"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Newsletter</h4>
            <p className="mb-4 text-sm text-slate-400">
              Subscribe to get latest offers and updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/10 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-primary"
              />
              <button
                type="submit"
                className="w-full shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-700/60 pt-6 text-center text-xs text-slate-500 sm:flex-row">
          <p>© 2026 BSH Taxi Services. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <span className="text-slate-700">|</span>
            <a href="#" className="hover:text-primary">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}