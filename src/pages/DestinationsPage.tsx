import DestinationsHero from "../components/Destinations/DestinationsHero";
import DestinationsGrid from "../components/Destinations/DestinationsGrid";
import WhyTravelWithUs from "../components/Destinations/WhyTravelWithUs";
import OutstationRoutesTable from "../components/Destinations/OutstationRoutesTable";
import { CTA } from "../components/Home/CTA";

export default function DestinationsPage() {
  return (
    <>
      <DestinationsHero />
      <DestinationsGrid />
      
      <OutstationRoutesTable />
      <WhyTravelWithUs />
      <div className="mb-6">
      <CTA />
      </div>
    </>
  );
}