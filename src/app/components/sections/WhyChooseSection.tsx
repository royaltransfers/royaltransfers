import { ChooseImage, TickVector } from "@/assets";
import Image from "next/image";

const REASONS = [
  "Prompt Pick-Ups & On-Time Drop-Offs",
  "Clean & Comfortable Vehicles",
  "Licensed and Courteous Drivers",
  "24/7 Taxi Service – Always Available",
];
export default function WhyChooseSection() {
  return (
    <section className="my-10 bg-[#F9F9F9] py-28  poppins">
      <div className="h-9/12  flex flex-col lg:flex-row justify-center gap-10 lg:gap-0 items-center  px-3 md:px-0  md:w-11/12 xl:w-10/12 mx-auto">
        <div className="flex-1 h-full flex flex-col gap-6 xl:gap-10 ">
          <h2 className="text-4xl md:text-[44px] xl:text-[52px] 2xl:text-[64px] bebas-neue text-black uppercase leading-none">
            WHY CHOOSE <span className="text-yellow">ROYAL TRANSFERS</span>
          </h2>
          <p className="text-md md:text-lg text-gray w-full lg:w-11/12">
            Picking a taxi service involves more than simply moving from one
            place to another. Only Royal Transfers can deliver the comfort you
            need, combined with complete safety and excellent value, while
            helping you trust them immediately. Royal Transfers follows this
            value system to operate as your preferred taxi provider in your
            local neighborhood.
          </p>

          {REASONS.map((reason, index) => (
            <div key={index} className="flex gap-6 inter">
              <Image src={TickVector} alt={"tick"} width={24} height={24} />
              <p className="text-md md:text-lg text-black">{reason}</p>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-3 relative h-full ">
          <Image src={ChooseImage} alt="Choose image" />
        </div>
      </div>
    </section>
  );
}
