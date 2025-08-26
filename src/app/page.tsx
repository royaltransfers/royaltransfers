import FooterSection from "./components/sections/FooterSection";
import HeroSection from "./components/sections/HeroSection";
import { Suspense } from "react";
import TermsConditionSection from "./components/sections/TermsConditionSection";
import DynamicSection from "./components/sections/DynamicSections";
import CarTypesSkeleton from "./components/skeletons/CarTypeSkeleton";

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <Suspense fallback={<RidePickingSectionSkeleton />}>
        <RidePickingSection />
      </Suspense> */}

      <Suspense fallback={<CarTypesSkeleton />}>
        <DynamicSection />
      </Suspense>
      <TermsConditionSection />
      <FooterSection />
    </>
  );
}
