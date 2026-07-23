import FleetHero from "../components/Fleet/FleetHero";
import FleetGrid from "../components/Fleet/FleetGrid";
import TrustBar from "../components/Home/TrustBar";
import { CTA } from "../components/Home/CTA";

export default function FleetPage() {
  return (
    <>
      <FleetHero />
      <FleetGrid />
      <TrustBar />
      <div className="mb-6">
      <CTA />
      </div>
    </>
  );
}