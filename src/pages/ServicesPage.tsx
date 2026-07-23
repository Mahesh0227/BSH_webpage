import ServicesHero from "../components/services/ServicesHero";
import ServicesGrid from "../components/services/ServicesGrid";
import HowItWorks from "../components/services/HowItWorks";
import TrustBar from "../components/Home/TrustBar";
import { CTA } from "../components/Home/CTA"; // adjust path to your CTA file

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <TrustBar />
      <HowItWorks />
      <div className="mb-6">
      <CTA />
      </div>
    </>
  );
}