import { Helmet } from "react-helmet-async";
import SEO from "../components/seo/SEO";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import TravelSections from "../components/Home/TravelSections";
import TrustBar from "../components/Home/TrustBar";
import { CTA, ContactUs } from "../components/Home/CTA";
import { BookingProvider } from "../components/booking/BookingContext";
import Review from "../components/Home/review";
import BookingWizard from "../components/booking/BookingWizard";
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "BSH Taxi Services",
  image: "https://www.bshtaxiservices.com/og-image.jpg",
  telephone: "+91-8886803322",
  email: "info.bshtaxiservices@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "36-92-242-532/1, Palanati Colony, Kancharapalem",
    addressLocality: "Visakhapatnam",
    addressRegion: "Andhra Pradesh",
    postalCode: "530008",
    addressCountry: "IN",
  },
  areaServed: { "@type": "State", name: "Andhra Pradesh" },
  openingHours: "Mo-Su 00:00-23:59",
  priceRange: "₹₹",
};

export default function HomePage() {
  return (
    <BookingProvider>
      <SEO
        title="Best Taxi Service in Visakhapatnam"
        description="BSH Taxi Services offers safe, reliable and affordable taxi booking in Visakhapatnam — local rides, outstation trips, airport transfers, corporate travel and wedding car rentals. Book now, available 24/7."
        keywords={[
          "taxi service visakhapatnam",
          "vizag taxi booking",
          "outstation taxi vizag",
          "airport taxi visakhapatnam",
          "local cab service vizag",
          "vizag to araku valley taxi",
          "vizag to hyderabad taxi",
          "corporate taxi service vizag",
          "wedding car rental visakhapatnam",
          "cab booking visakhapatnam",
          "vizag airport pickup and drop",
          "one way taxi vizag",
          "round trip taxi visakhapatnam",
          "vizag to vijayawada taxi",
          "vizag to araku package taxi",
          "vizag to lambasingi taxi",
          "vizag to annavaram taxi",
          "vizag to srikakulam taxi",
          "vizag railway station taxi",
          "innova crysta rental vizag",
          "sedan taxi service visakhapatnam",
          "self drive car rental vizag",
          "24/7 taxi service vizag",
          "best cab service in vizag",
          "affordable taxi visakhapatnam",
          "vizag city tour taxi",
          "vizag sightseeing cab",
          "monthly taxi rental visakhapatnam",
          "vizag to chennai taxi",
          "vizag to bhubaneswar taxi",
          "tempo traveller rental vizag",
        ]}
        canonicalPath="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <Hero />

    <section className="-mt-24 relative z-30 px-4 lg:px-8">
        <BookingWizard />
    </section>
       <TrustBar />
      <Features />
      <TravelSections />
        <Review />
      <CTA />
      <ContactUs />
    </BookingProvider>
  );
}