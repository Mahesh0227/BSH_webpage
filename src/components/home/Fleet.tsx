import { useState } from "react";
import { Smile, UserRound, Car, Headphones, ThumbsUp, Star, ChevronLeft, ChevronRight } from "lucide-react";

// ---------- Data ----------

interface Stat {
  icon: typeof Smile;
  value: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Smile, value: "20,000+", label: "Happy Customers" },
  { icon: UserRound, value: "150+", label: "Professional Drivers" },
  { icon: Car, value: "50+", label: "Premium Vehicles" },
  { icon: Headphones, value: "24/7", label: "Customer Support" },
  { icon: ThumbsUp, value: "99%", label: "Customer Satisfaction" },
];

interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    name: "Ramesh K.",
    location: "Visakhapatnam",
    rating: 5,
    text: "Excellent service! Driver was punctual and very polite.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Sravani P.",
    location: "Vizag",
    rating: 5,
    text: "Very clean cars and professional drivers. Highly recommended!",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Vikram A.",
    location: "Hyderabad",
    rating: 5,
    text: "Affordable prices and great customer support.",
    avatar: "https://i.pravatar.cc/100?img=33",
  },
  {
    name: "Anjali M.",
    location: "Vijayawada",
    rating: 5,
    text: "Booking was so easy and the ride was super comfortable.",
    avatar: "https://i.pravatar.cc/100?img=25",
  },
  {
    name: "Suresh N.",
    location: "Rajahmundry",
    rating: 5,
    text: "Always on time. My go-to cab service for airport runs.",
    avatar: "https://i.pravatar.cc/100?img=51",
  },
];

const REVIEWS_PER_PAGE = 3;
const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

// ---------- Component ----------

export default function ReviewsStats() {
  const [page, setPage] = useState(0);

  const goTo = (index: number) => {
    setPage((index + totalPages) % totalPages);
  };

  const visibleReviews = reviews.slice(
    page * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE + REVIEWS_PER_PAGE
  );

  return (
    <section className="py-16">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-between gap-y-6 rounded-2xl border border-slate-100 bg-white px-8 py-7 shadow-sm">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3 sm:pr-6">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/30 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="text-lg font-extrabold leading-tight text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium leading-tight text-slate-500">
                    {stat.label}
                  </p>
                </div>
                {i < stats.length - 1 && (
                  <span className="ml-3 hidden h-8 w-px bg-slate-100 sm:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Section heading */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <span className="h-px w-8 bg-primary/40" />
          <h2 className="text-sm font-bold tracking-[0.15em] text-slate-900">
            CUSTOMER REVIEWS
          </h2>
          <span className="h-px w-8 bg-primary/40" />
        </div>

        {/* Reviews grid */}
        <div className="relative mt-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((review) => (
              <article
                key={review.name}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {review.text}
                </p>

                <p className="mt-4 text-sm font-bold text-slate-900">
                  {review.name}
                </p>
                <p className="text-xs text-slate-500">{review.location}</p>
              </article>
            ))}
          </div>

          {/* Arrows (optional, only show if more than one page) */}
          {totalPages > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous reviews"
                onClick={() => goTo(page - 1)}
                className="absolute left-[-1.25rem] top-1/2 hidden -translate-y-1/2 rounded-full border border-slate-100 bg-white p-2 text-slate-500 shadow-sm transition-colors hover:text-primary lg:block"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next reviews"
                onClick={() => goTo(page + 1)}
                className="absolute right-[-1.25rem] top-1/2 hidden -translate-y-1/2 rounded-full border border-slate-100 bg-white p-2 text-slate-500 shadow-sm transition-colors hover:text-primary lg:block"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Dot pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === page
                    ? "w-6 bg-primary"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}