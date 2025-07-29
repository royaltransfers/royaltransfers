"use client";

import { useSearchParams } from "next/navigation";
import CarTypesSection from "./CarTypesSection";
import MultipleLocationSection from "./MultipleLocationSection";

export default function DynamicSection() {
  const searchParams = useSearchParams();
  const pickup = searchParams.get("pickup");
  const arrival = searchParams.get("arrival");

  const showRideSection = pickup && arrival;

  return (
    <>
      {showRideSection ? (
        <>
          <MultipleLocationSection />
          <CarTypesSection />
        </>
      ) : (
        <>
          <CarTypesSection />
          <MultipleLocationSection />
        </>
      )}
    </>
  );
}
