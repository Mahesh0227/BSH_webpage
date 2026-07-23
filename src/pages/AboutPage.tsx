
import AboutHero from "../components/About/AboutHero";
import WhoWeAre from "../components/About/WhoWeAre";
import MissionVisionValues from "../components/About/MissionVisionValues";
import AboutStatsBar from "../components/About/AboutStatsBar";
import WeServeYouBetter from "../components/About/WeServeYouBetter";
// import Testimonials from "../components/about/Testimonials";
import { CTA } from "../components/Home/CTA";
import Review from "../components/Home/review";

export default function AboutPage() {
  return (
    <>
 
      <main>
        <AboutHero />
        <WhoWeAre />
        <MissionVisionValues />
        <AboutStatsBar />
        <WeServeYouBetter />
        <Review />
        <div className="mb-6">
        <CTA />
        </div>
      </main>

    </>
  );
}