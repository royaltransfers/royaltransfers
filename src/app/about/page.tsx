import FooterSection from "../components/sections/FooterSection";
import LookingForTaxiSection from "../components/sections/LookingForTaxiSection";
import WhyChooseSection from "../components/sections/WhyChooseSection";
import HeroSection from "./components/sections/HeroSection";
import ServingTravelNeedSection from "./components/sections/ServingTravelNeedSection";

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <WhyChooseSection />
      <LookingForTaxiSection />
      <ServingTravelNeedSection />
      <FooterSection />
    </>
  );
}
