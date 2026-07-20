import { useState } from "react";
import { Phone, Menu, X, Car } from "lucide-react";
import { navLinks } from "../../data/nav";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex min-h-[76px] w-[92%] max-w-[1240px] items-center justify-between gap-6">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary-hover text-white shadow-md shadow-primary/25">
            <Car size={20} />
          </span>
          <span className="text-xl font-extrabold leading-none tracking-tight text-slate-900">
            BSH <span className="font-bold text-slate-500">TAXI SERVICES</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 lg:flex">
          {navLinks.map((link, index) => {
            const active = index === 0;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative rounded-lg px-3.5 py-2 transition-colors ${
                  active ? "text-primary" : "hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-primary" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Call CTA */}
        <div className="hidden lg:flex">
          <a
            href="tel:+918886803322"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30"
          >
            <Phone size={16} />
            +91 8886803322
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 bg-white px-[4%] py-4 lg:hidden">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                index === 0
                  ? "bg-primary-light text-primary"
                  : "text-slate-600 hover:bg-slate-50 hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+918886803322"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/30"
          >
            <Phone size={16} />
            +91 8886803322
          </a>
        </nav>
      )}
    </header>
  );
}