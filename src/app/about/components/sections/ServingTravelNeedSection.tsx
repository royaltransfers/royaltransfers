import {
  AirpportTransfersImage,
  CorporateTravelImage,
  EventAndOccassionsImage,
  LocalTaxiRideImage,
} from "@/assets";
import Image from "next/image";

const TRAVEL_NEEDS = [
  {
    title: "local taxi rides",
    image: LocalTaxiRideImage,
  },
  {
    title: "Airport Transfers",
    image: AirpportTransfersImage,
  },
  {
    title: "Corporate Travel",
    image: CorporateTravelImage,
  },
  {
    title: "Event & Occasions",
    image: EventAndOccassionsImage,
  },
];
export default function ServingTravelNeedSection() {
  return (
    <section className="py-10 mb-10 poppins">
      <div className=" flex flex-col justify-between items-center gap-20 px-3 md:px-0 md:w-11/12 xl:w-10/12 mx-auto">
        <div className="flex flex-col gap-6 justify-center items-center text-center">
          <h2 className="text-4xl md:text-[44px] xl:text-[52px] 2xl:text-[64px] bebas-neue text-black uppercase leading-none">
            Serving all <span className="text-yellow">your travel needs</span>
          </h2>
          <p className="text-md md:text-lg text-gray w-full lg:w-2/5  ">
            Our taxi service offers a variety of options tailored to meet the
            needs of every passenger. Travel comfortably and conveniently with
            choices designed just for you.
          </p>
        </div>

        <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {TRAVEL_NEEDS.map((travelNeed, index) => (
            <div key={index} className="w-full">
              <div className="h-[240px] md:h-[260px] rounded-2xl bg-[#F3F3F3] flex items-start justify-center">
                <div className="flex flex-col gap-2  mt-6 w-full">
                  <div className="h-[140px] md:h-[160px] mx-4 relative mb-4">
                    <Image
                      src={travelNeed.image}
                      alt={travelNeed.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-black text-2xl lg:text-3xl font-semibold uppercase bebas-neue leading-none ml-4">
                    {travelNeed.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
